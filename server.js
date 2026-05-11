const express = require('express');
const path = require('path');
const fs = require('fs');
const QRCode = require('qrcode');

const app = express();
const PORT = 3000;

// ========================
// CONFIGURAÇÕES FIXAS
// ========================
const CONFIG = {
  pixKey: '27999370750',
  whatsapp: '27999370750',
  eventName: 'Mini Mercado EJC',
};

// ========================
// BANCO DE DADOS (JSON em memória + arquivo)
// ========================
const DB_FILE = path.join(__dirname, 'db.json');

function loadDB() {
  if (fs.existsSync(DB_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    } catch {
      return { comandas: {} };
    }
  }
  return { comandas: {} };
}

function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

let db = loadDB();

// Se não tiver comandas, cria 20 de exemplo
if (Object.keys(db.comandas).length === 0) {
  const nomesExemplo = [
    'Ana Lima', 'Bruno Souza', 'Carla Menezes', 'Daniel Costa',
    'Eduarda Ferreira', 'Felipe Martins', 'Gabriela Rocha', 'Henrique Alves',
    'Isabela Nunes', 'João Pedro', 'Karina Santos', 'Lucas Oliveira',
    'Mariana Dias', 'Nicolas Carvalho', 'Olivia Ramos', 'Pedro Henrique',
    'Quezia Teixeira', 'Rafael Lima', 'Sara Fernandes', 'Thiago Barbosa',
  ];

  nomesExemplo.forEach((nome, i) => {
    const id = String(i + 1).padStart(3, '0');
    db.comandas[id] = {
      id,
      participante: nome,
      criadaEm: new Date().toISOString(),
      itens: [],
    };
  });

  saveDB(db);
}

// ========================
// MIDDLEWARES
// ========================
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========================
// ROTAS DA API
// ========================

// GET /api/config — Retorna configurações fixas
app.get('/api/config', (req, res) => {
  res.json(CONFIG);
});

// GET /api/comandas — Lista todas as comandas (resumo)
app.get('/api/comandas', (req, res) => {
  const lista = Object.values(db.comandas).map((c) => ({
    id: c.id,
    participante: c.participante,
    totalItens: c.itens.length,
    total: c.itens.reduce((acc, item) => acc + item.valor * item.quantidade, 0),
  }));
  res.json(lista);
});

// GET /api/comanda/:id — Retorna uma comanda completa
app.get('/api/comanda/:id', (req, res) => {
  const comanda = db.comandas[req.params.id];
  if (!comanda) return res.status(404).json({ erro: 'Comanda não encontrada.' });
  res.json(comanda);
});

// POST /api/comanda/:id/item — Adiciona item à comanda
app.post('/api/comanda/:id/item', (req, res) => {
  const comanda = db.comandas[req.params.id];
  if (!comanda) return res.status(404).json({ erro: 'Comanda não encontrada.' });

  const { produto, quantidade, valor, vendedor } = req.body;

  if (!produto || !quantidade || !valor || !vendedor) {
    return res.status(400).json({ erro: 'Campos obrigatórios: produto, quantidade, valor, vendedor.' });
  }

  const item = {
    id: Date.now().toString(),
    produto: produto.trim(),
    quantidade: Number(quantidade),
    valor: Number(valor),
    vendedor: vendedor.trim(),
    horario: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
  };

  comanda.itens.push(item);
  saveDB(db);

  res.status(201).json(item);
});

// DELETE /api/comanda/:id/item/:itemId — Remove item da comanda
app.delete('/api/comanda/:id/item/:itemId', (req, res) => {
  const comanda = db.comandas[req.params.id];
  if (!comanda) return res.status(404).json({ erro: 'Comanda não encontrada.' });

  const antes = comanda.itens.length;
  comanda.itens = comanda.itens.filter((i) => i.id !== req.params.itemId);

  if (comanda.itens.length === antes) {
    return res.status(404).json({ erro: 'Item não encontrado.' });
  }

  saveDB(db);
  res.json({ ok: true });
});

// POST /api/comanda — Cria nova comanda
app.post('/api/comanda', (req, res) => {
  const { participante } = req.body;
  if (!participante) return res.status(400).json({ erro: 'Nome do participante obrigatório.' });

  const ids = Object.keys(db.comandas).map(Number).filter(Boolean);
  const proximoId = String((ids.length > 0 ? Math.max(...ids) : 0) + 1).padStart(3, '0');

  db.comandas[proximoId] = {
    id: proximoId,
    participante: participante.trim(),
    criadaEm: new Date().toISOString(),
    itens: [],
  };

  saveDB(db);
  res.status(201).json(db.comandas[proximoId]);
});

// GET /api/qr/:id — Gera QR Code como imagem PNG (base64)
app.get('/api/qr/:id', async (req, res) => {
  const comanda = db.comandas[req.params.id];
  if (!comanda) return res.status(404).json({ erro: 'Comanda não encontrada.' });

  const host = req.headers.host || `localhost:${PORT}`;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const url = `${protocol}://${host}/comanda/${req.params.id}`;

  try {
    const qr = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: { dark: '#1a1a2e', light: '#ffffff' },
    });
    res.json({ url, qr });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao gerar QR Code.' });
  }
});

// GET /api/relatorio — Relatório geral de todas as comandas
app.get('/api/relatorio', (req, res) => {
  const comandas = Object.values(db.comandas);
  const totalGeral = comandas.reduce((acc, c) => {
    return acc + c.itens.reduce((s, i) => s + i.valor * i.quantidade, 0);
  }, 0);

  const produtosMais = {};
  comandas.forEach((c) => {
    c.itens.forEach((i) => {
      if (!produtosMais[i.produto]) produtosMais[i.produto] = 0;
      produtosMais[i.produto] += i.quantidade;
    });
  });

  res.json({
    totalComandas: comandas.length,
    comandasComItens: comandas.filter((c) => c.itens.length > 0).length,
    totalGeral,
    produtosMaisVendidos: Object.entries(produtosMais)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([produto, qtd]) => ({ produto, qtd })),
  });
});



// ========================
// ROTAS DE PÁGINAS (SPA)
// ========================
app.get('/comanda/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ========================
// INICIAR SERVIDOR
// ========================
app.listen(PORT, () => {
  console.log(`\n✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 Painel Admin: http://localhost:${PORT}/admin`);
  console.log(`📦 Comandas criadas: ${Object.keys(db.comandas).length}`);
  console.log(`\nQR Codes disponíveis em: http://localhost:${PORT}/api/qr/{id}\n`);
});
