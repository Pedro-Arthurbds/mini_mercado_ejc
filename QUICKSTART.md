# 🚀 Guia Rápido — Mini Mercado EJC

## ⚡ Instalação em 3 Passos

### 1️⃣ Instalar Node.js
- Acesse: https://nodejs.org
- Baixe a versão **LTS**
- Execute o instalador
- Confirme: `node --version`

### 2️⃣ Instalar Dependências
```bash
npm install
```

### 3️⃣ Rodar o Servidor
```bash
npm start
```

Pronto! ✅

---

## 📱 Acessar o Sistema

### Via Navegador
- **Celular**: `http://192.168.1.XXX:3000` (seu IP local)
- **PC**: `http://localhost:3000`

### Telas Principais

```
┌─────────────────────────────┐
│    MINI MERCADO EJC         │
│                             │
│  🏪 Sou Vendedor            │
│  🙋 Ver Minha Comanda       │
└─────────────────────────────┘
```

---

## 👨‍💼 Fluxo do Vendedor

```
[Inicio] 
  ↓
[Clique em "Sou Vendedor"]
  ↓
[Busque o participante]
  ↓
[Clique no nome dele]
  ↓
[Clique "+ Registrar Venda"]
  ↓
[Preencha o formulário]:
  • Produto: "Refrigerante Lata"
  • Quantidade: "1"
  • Valor: "5.00"
  • Seu Nome: "João"
  ↓
[Clique "Salvar Item"]
  ↓
[Veja o item na lista]
```

---

## 🙋 Fluxo do Participante

```
[Recebe QR Code]
  ↓
[Escaneia com celular]
  ↓
[Abre a página]
  ↓
[Vê sua lista de compras]
  ↓
[Vê o total a pagar]
  ↓
[Copia chave PIX (toque)]
  ↓
[Envia comprovante no WhatsApp]
```

---

## 📊 Relatório

Para ver:
- Total arrecadado
- Número de vendas
- Produtos mais vendidos

### Acesse:
1. Clique em "Sou Vendedor"
2. Clique em **📊** (no canto superior direito)
3. Veja o relatório completo

---

## 🔧 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| **Porta em uso** | `PORT=4000 npm start` |
| **Sem internet** | Use IP local: `192.168.1.XXX:3000` |
| **Banco corrompido** | `rm db.json` e `npm start` |
| **QR Code não funciona** | Recarregue a página (F5) |
| **Servidor cai** | Reinicie com `npm start` |

---

## 💡 Dicas

✅ **Salvar vendedor**: Seu nome fica salvo na sessão  
✅ **Toque para copiar PIX**: Clique na chave PIX para copiar  
✅ **Enter no formulário**: Pressione ENTER para salvar item  
✅ **Modo offline**: Funciona com conexão interna (LAN)

---

## 🎯 Links Importantes

```
🏠 Início:          http://localhost:3000
🏪 Vendedor:        http://localhost:3000/admin
🙋 Buscar Comanda:  http://localhost:3000/buscar
📊 Relatório:       http://localhost:3000/admin (📊 botão)
📷 QR Code:         http://localhost:3000/qr/{id}
```

---

## 📋 Checklist do Evento

- [ ] Node.js instalado
- [ ] `npm install` executado
- [ ] `npm start` rodando
- [ ] QR Codes impressos
- [ ] Celular conectado à rede
- [ ] Testar uma venda completa
- [ ] Revisar relatório

---

## 🆘 Quando der Erro

### Passo 1: Verifique o terminal
```
Procure por mensagens em vermelho
Se houver, tire uma foto e pesquise
```

### Passo 2: Reinicie tudo
```bash
Ctrl+C (parar o servidor)
npm start (iniciar novamente)
```

### Passo 3: Limpe o banco
```bash
Ctrl+C
rm db.json
npm start
```

---

## 🎉 Pronto para o Evento!

**Tudo funcionando?** Parabéns! 🚀

Qualquer dúvida durante o evento:
1. Reinicie o servidor (`Ctrl+C` → `npm start`)
2. Limpe o cache do navegador (`Ctrl+Shift+Delete`)
3. Teste em outro navegador se possível

---

**Bom evento! 🎊**
