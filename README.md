# 🛒 Mini Mercado EJC — Sistema de Comandas com QR Code

Sistema web completo para gerenciar comandas de evento com QR Code, desenvolvido especificamente para o **Mini Mercado EJC**.

---

## 📋 Funcionalidades

✅ **Criar comandas automaticamente** — 20 participantes pré-cadastrados  
✅ **QR Code único por participante** — URL exclusiva gerada automaticamente  
✅ **Registrar vendas** — Produto, quantidade, valor, vendedor  
✅ **Consultar comanda** — Participante vê sua lista de compras em tempo real  
✅ **Cálculo automático** — Total atualizado imediatamente  
✅ **Pagamento PIX** — Chave fixa (27999370750) com WhatsApp para comprovante  
✅ **Painel do vendedor** — Buscar participantes e registrar vendas  
✅ **Relatório geral** — Produtos mais vendidos e total arrecadado  
✅ **Interface responsiva** — Otimizada para celular  
✅ **Dados persistentes** — Banco em JSON (db.json)

---

## 🛠️ Tecnologias Utilizadas

| Componente | Tecnologia |
|-----------|-----------|
| **Backend** | Node.js + Express.js |
| **Frontend** | HTML5 + CSS3 + JavaScript (Vanilla) |
| **Banco de Dados** | JSON (arquivo db.json) |
| **QR Code** | Biblioteca `qrcode` (npm) |
| **Tipografia** | Google Fonts (Syne, DM Sans) |
| **Deploy** | Qualquer servidor Node.js |

---

## 📦 Estrutura do Projeto

```
comanda-system/
├── server.js              # Backend Express (main)
├── package.json           # Dependências Node.js
├── .gitignore
├── db.json                # Banco de dados (criado automaticamente)
└── public/
    ├── index.html         # Aplicação SPA (Single Page App)
    ├── style.css          # Estilos CSS (design completo)
    └── script.js          # Lógica JavaScript (roteador SPA)
```

---

## 🚀 Como Instalar e Rodar

### Pré-requisitos
- **Node.js 14+** instalado ([baixar aqui](https://nodejs.org))
- Terminal/Prompt de Comando

### Passo 1: Clonar ou Descarregar o Projeto

```bash
# Se tiver Git:
git clone <seu-repositorio>
cd comanda-system

# Ou descompacte o arquivo ZIP
```

### Passo 2: Instalar Dependências

```bash
npm install
```

Isso instalará:
- `express` — Framework web
- `qrcode` — Gerador de QR Codes

### Passo 3: Iniciar o Servidor

```bash
npm start
```

Você verá:
```
✅ Servidor rodando em http://localhost:3000
📋 Painel Admin: http://localhost:3000/admin
📦 Comandas criadas: 20
```

### Passo 4: Acessar no Navegador

Abra em seu celular ou computador:
- **URL**: `http://localhost:3000`
- **Painel do Vendedor**: `http://localhost:3000/admin`
- **Relatório**: `http://localhost:3000/admin` → botão 📊

---

## 🎯 Como Usar

### Para o Vendedor

1. Acesse `http://localhost:3000`
2. Clique em **"Sou Vendedor"**
3. Busque o participante pelo **nome ou ID**
4. Clique no participante para abrir sua comanda
5. Clique em **"+ Registrar Venda"**
6. Preencha:
   - Produto (ex: "Refrigerante Lata")
   - Quantidade (ex: 1, 2, 3...)
   - Valor Unitário em R$ (ex: 5.00)
   - Seu Nome (vendedor)
7. Clique **"Salvar Item"**
8. Repita para mais itens

**Dica**: Seu nome de vendedor fica salvo na sessão!

### Para o Participante

1. Receba o **QR Code** do evento
2. Escaneie com o celular
3. Veja sua lista de compras completa
4. Total atualizado automaticamente
5. **Chave PIX** para pagar (toque para copiar)
6. **WhatsApp** para enviar comprovante

### Para o Gerenciador (Admin)

1. Acesse `/admin`
2. Clique em **📊** (Relatório) para ver:
   - Total arrecadado
   - Número de comandas com itens
   - Produtos mais vendidos
3. **Criar nova comanda**: Botão "+ Nova Comanda"
4. **Deletar itens**: Clique no 🗑️ na comanda

---

## 📱 Gerando QR Codes

### No Painel Admin

1. Acesse `/admin`
2. Clique no botão **📷** ao lado do participante
3. O QR Code aparece na tela
4. Clique em **🖨️ Imprimir** para imprimir

### Via API Direta

```
GET /api/qr/{id}
```

Exemplo:
```
http://localhost:3000/api/qr/001
```

Retorna:
```json
{
  "url": "http://localhost:3000/comanda/001",
  "qr": "data:image/png;base64,iVBORw0KG..."
}
```

---

## ⚙️ Dados Fixos do Sistema

Estes dados estão hardcoded no `server.js`:

```javascript
const CONFIG = {
  pixKey: '27999370750',      // Chave PIX para pagamento
  whatsapp: '27999370750',    // Número para comprovante
  eventName: 'Mini Mercado EJC',
};
```

Para alterar, edite `server.js` e procure pela seção **CONFIGURAÇÕES FIXAS**.

---

## 📊 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/config` | Configurações fixas |
| `GET` | `/api/comandas` | Lista de todas as comandas |
| `GET` | `/api/comanda/:id` | Detalhes de uma comanda |
| `POST` | `/api/comanda/:id/item` | Adicionar item à comanda |
| `DELETE` | `/api/comanda/:id/item/:itemId` | Remover item |
| `POST` | `/api/comanda` | Criar nova comanda |
| `GET` | `/api/qr/:id` | Gerar QR Code (base64) |
| `GET` | `/api/relatorio` | Relatório geral |

---

## 💾 Banco de Dados (db.json)

Arquivo criado automaticamente na primeira execução. Formato:

```json
{
  "comandas": {
    "001": {
      "id": "001",
      "participante": "Ana Lima",
      "criadaEm": "2024-01-15T10:30:00Z",
      "itens": [
        {
          "id": "1705316400000",
          "produto": "Refrigerante Lata",
          "quantidade": 2,
          "valor": 5.00,
          "vendedor": "João",
          "horario": "15/01/2024 10:35:22"
        }
      ]
    }
  }
}
```

---

## 🎨 Design & Responsividade

- ✅ **Mobile-first** — Otimizado para celular (480px)
- ✅ **Desktop-ready** — Responsivo para telas maiores
- ✅ **Dark mode** — Cores dinâmicas com CSS variables
- ✅ **Animações** — Transições suaves e intuitivas
- ✅ **Tipografia** — Fontes Google (Syne, DM Sans)
- ✅ **Cores**:
  - Verde: #00c16e (principal)
  - Azul: #1a1a2e (secundário)
  - Amarelo: #fbbf24 (destaque)

---

## 🔒 Segurança

⚠️ **Este sistema é para uso interno em eventos.**

Melhorias para produção:
- Adicionar autenticação (vendedores)
- Validar tokens JWT
- HTTPS obrigatório
- Rate limiting
- Backup automático de db.json

---

## 🐛 Troubleshooting

### Porta 3000 já está em uso

```bash
# Use outra porta
PORT=4000 npm start
```

### Banco de dados corrompido

```bash
# Delete e recrie
rm db.json
npm start
```

### Comandas não aparecem

1. Verifique se `db.json` existe
2. Resete com: `rm db.json && npm start`
3. Recarregue a página (F5)

### QR Code não funciona

1. Certifique-se que o servidor está rodando
2. Teste a URL manualmente (ex: `/comanda/001`)
3. Verifique se o ID está correto

---

## 📝 Exemplos de Uso

### Criar Comanda via API

```bash
curl -X POST http://localhost:3000/api/comanda \
  -H "Content-Type: application/json" \
  -d '{"participante":"Maria Silva"}'
```

### Adicionar Item via API

```bash
curl -X POST http://localhost:3000/api/comanda/001/item \
  -H "Content-Type: application/json" \
  -d '{
    "produto":"Cerveja",
    "quantidade":1,
    "valor":8.50,
    "vendedor":"Carlos"
  }'
```

### Obter QR Code (Base64)

```bash
curl http://localhost:3000/api/qr/001
```

---

## 📱 Dados Pré-Cadastrados (20 Participantes)

O sistema cria automaticamente 20 comandas na primeira execução:

1. Ana Lima (#001)
2. Bruno Souza (#002)
3. Carla Menezes (#003)
4. Daniel Costa (#004)
5. Eduarda Ferreira (#005)
6. Felipe Martins (#006)
7. Gabriela Rocha (#007)
8. Henrique Alves (#008)
9. Isabela Nunes (#009)
10. João Pedro (#010)
11. Karina Santos (#011)
12. Lucas Oliveira (#012)
13. Mariana Dias (#013)
14. Nicolas Carvalho (#014)
15. Olivia Ramos (#015)
16. Pedro Henrique (#016)
17. Quezia Teixeira (#017)
18. Rafael Lima (#018)
19. Sara Fernandes (#019)
20. Thiago Barbosa (#020)

---

## 🚀 Deploy em Produção

### Opção 1: Heroku

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar aplicação
heroku create seu-app-name

# Deploy
git push heroku main
```

### Opção 2: Railway.app

1. Acesse [railway.app](https://railway.app)
2. Clique "New Project"
3. Selecione este repositório
4. Deploy automático!

### Opção 3: VPS/Servidor Próprio

```bash
# No servidor
npm install
npm start

# Usar PM2 para manter rodando
npm install -g pm2
pm2 start server.js --name "comanda-ejc"
pm2 startup
pm2 save
```

---

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique o console do navegador (F12)
2. Verifique o terminal onde rodou `npm start`
3. Teste as rotas da API com curl ou Postman
4. Verifique se `db.json` existe e está válido

---

## 📄 Licença

MIT — Livre para usar, modificar e distribuir.

---

## 🎉 Pronto!

Seu sistema de comandas está 100% funcional!

**URL para participantes**: `http://localhost:3000/comanda/001`  
**URL para vendedores**: `http://localhost:3000/admin`  
**Relatório**: `http://localhost:3000/api/relatorio`

Boa sorte no evento! 🚀
