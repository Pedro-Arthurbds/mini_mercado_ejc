# 🚀 COMECE AQUI — Mini Mercado EJC

Bem-vindo ao sistema de comandas com QR Code!  
Este arquivo o guiará pelos primeiros passos.

---

## 📍 Você Está Aqui

```
Você descarregou: comanda-system.zip
Descompactou em: uma pasta
Agora precisa: Começar!
```

---

## ⚡ 3 Passos para Começar (5 minutos)

### 1️⃣ Instalar Node.js

**Baixar em:** https://nodejs.org (versão **LTS**)

Escolha seu sistema:
- 🪟 [Windows](INSTALLATION.md#-windows-1011)
- 🍎 [macOS](INSTALLATION.md#-macos)
- 🐧 [Linux](INSTALLATION.md#-linux-ubuntudebian)

**Verificar instalação:**
```bash
node --version
npm --version
```

---

### 2️⃣ Instalar Dependências

Abra o **Terminal/Command Prompt** na pasta do projeto:

```bash
npm install
```

(Vai levar ~30 segundos)

---

### 3️⃣ Rodar o Servidor

```bash
npm start
```

**Você verá:**
```
✅ Servidor rodando em http://localhost:3000
📋 Painel Admin: http://localhost:3000/admin
📦 Comandas criadas: 20
```

✅ **PRONTO!** Abra no navegador: http://localhost:3000

---

## 📚 Documentação Rápida

Escolha por sua necessidade:

### 🟢 Preciso começar RÁPIDO
→ Leia: **[QUICKSTART.md](QUICKSTART.md)** (3 min)

### 🟡 Preciso instalar em meu computador
→ Leia: **[INSTALLATION.md](INSTALLATION.md)** (15 min)

### 🟠 Preciso usar no evento
→ Leia: **[EVENT-OPERATIONS.md](EVENT-OPERATIONS.md)** (20 min)

### 🔴 Preciso de tudo detalhado
→ Leia: **[README.md](README.md)** (30 min)

---

## 🎯 Guias por Tópico

| Assunto | Arquivo | Tempo |
|---------|---------|-------|
| **Começar rápido** | QUICKSTART.md | 3 min |
| **Instalar** | INSTALLATION.md | 15 min |
| **Configurar rede/WiFi** | NETWORK-CONFIG.md | 10 min |
| **Gerar QR Codes** | QR-CODES.md | 15 min |
| **No dia do evento** | EVENT-OPERATIONS.md | 20 min |
| **Customizar cores/dados** | CUSTOMIZATION.md | 15 min |
| **Referência rápida** | QUICK-REFERENCE.txt | 2 min |
| **Resumo técnico** | SUMMARY.md | 10 min |
| **Tudo detalhado** | README.md | 30 min |

---

## 🎮 Teste Rápido

Após rodar `npm start`, teste cada parte:

### 1. Página Home
```
http://localhost:3000
```
Deve mostrar dois botões (Vendedor e Participante)

### 2. Painel Admin
```
http://localhost:3000/admin
```
Deve listar 20 participantes

### 3. Comanda de Teste
```
http://localhost:3000/comanda/001
```
Deve mostrar a comanda de Ana Lima

### 4. QR Code
```
http://localhost:3000/qr/001
```
Deve gerar um QR Code

---

## 🎯 Casos de Uso

### "Só Quero Rodar Agora"
1. Instale Node.js
2. `npm install`
3. `npm start`
4. Abra http://localhost:3000
5. Clique em "Sou Vendedor" ou "Ver Minha Comanda"

**Tempo:** 5 minutos

---

### "Vou Usar Amanhã no Evento"
1. Instale (veja INSTALLATION.md)
2. Configure IP local (veja NETWORK-CONFIG.md)
3. Gere QR Codes (veja QR-CODES.md)
4. Leia EVENT-OPERATIONS.md
5. Teste tudo completamente

**Tempo:** 1 hora

---

### "Quero Customizar Cores/Dados"
1. Instale e rode normalmente
2. Leia CUSTOMIZATION.md
3. Edite `server.js` ou `public/style.css`
4. Reinicie: `Ctrl+C` → `npm start`
5. Veja as mudanças no navegador

**Tempo:** 30 minutos

---

## 🔧 Estrutura do Projeto

```
comanda-system/
│
├── 📄 START-HERE.md          ← VOCÊ ESTÁ AQUI
├── 📄 README.md              ← Documentação completa
├── 📄 QUICKSTART.md          ← 3 passos rápido
├── 📄 INSTALLATION.md        ← Por SO
├── 📄 NETWORK-CONFIG.md      ← WiFi/IP
├── 📄 QR-CODES.md            ← Gerar QR
├── 📄 EVENT-OPERATIONS.md    ← No evento
├── 📄 CUSTOMIZATION.md       ← Alterar
├── 📄 SUMMARY.md             ← Resumo técnico
├── 📄 QUICK-REFERENCE.txt    ← Cartão bolso
│
├── 🔨 server.js              ← Backend (Express)
├── 📦 package.json           ← Dependências
│
└── 📁 public/                ← Frontend
    ├── index.html            ← App (SPA)
    ├── style.css             ← Estilos
    └── script.js             ← Lógica JavaScript
```

---

## ⚙️ Configurações Importantes

### PIX e WhatsApp

Eles estão em `server.js` (linhas 10-17):

```javascript
const CONFIG = {
  pixKey: '27999370750',      // ← ALTERE AQUI
  whatsapp: '27999370750',    // ← ALTERE AQUI
  eventName: 'Mini Mercado EJC',
};
```

**Para alterar:**
1. Abra `server.js` em editor de texto
2. Procure essas linhas
3. Altere as valores
4. Salve
5. Reinicie: `Ctrl+C` → `npm start`

---

## 📱 Acessar de Outro Dispositivo

Se quer usar no celular (WiFi):

1. **Encontre o IP local** do computador
   - Windows: abra `cmd` → `ipconfig`
   - macOS/Linux: abra terminal → `ifconfig`
   - Procure: `192.168.X.X` ou `10.0.X.X`

2. **No celular, acesse:**
   ```
   http://192.168.1.100:3000
   (trocar 192.168.1.100 pelo seu IP)
   ```

[Leia mais →](NETWORK-CONFIG.md)

---

## 🎓 Exemplo de Uso

### Como Vendedor:
```
1. Acesso /admin
2. Busco o participante
3. Clico no nome
4. "+ Registrar Venda"
5. Preencho: Produto, Qtd, Valor, Meu Nome
6. Clico "Salvar"
7. ✅ Item aparece na comanda!
```

### Como Participante:
```
1. Escaneio QR Code
2. Vejo lista de compras
3. Vejo total a pagar
4. Toco na chave PIX (copia)
5. Vou no banco, colo PIX, pago
6. Tiro print
7. Clico WhatsApp
8. Envio comprovante
✅ PRONTO!
```

---

## 🆘 Primeiros Problemas?

### "npm não é reconhecido"
- Reinicie o Command Prompt/Terminal
- Ou reinicie o computador
- Verifique se Node.js foi instalado corretamente

### "Não consigo acessar"
- Verifique se `npm start` está rodando
- Tente abrir http://localhost:3000 no navegador
- Se não abre, há um erro no terminal

### "Porta 3000 em uso"
```bash
PORT=4000 npm start
# Depois acesse: http://localhost:4000
```

### "Mais dúvidas?"
- Veja [README.md](README.md) → seção Troubleshooting
- Leia [EVENT-OPERATIONS.md](EVENT-OPERATIONS.md) → Problemas Comuns

---

## 📋 Checklist Inicial

- [ ] Node.js instalado
- [ ] `npm install` executado
- [ ] `npm start` rodando sem erros
- [ ] http://localhost:3000 abre
- [ ] Consegue ver a página home
- [ ] Consegue acessar /admin
- [ ] Consegue acessar /comanda/001

---

## 🎉 Próximas Etapas

### Se vai usar no evento:
1. Configure o PIX/WhatsApp ([veja como](CUSTOMIZATION.md))
2. Aprenda sobre rede WiFi ([NETWORK-CONFIG.md](NETWORK-CONFIG.md))
3. Gere os QR Codes ([QR-CODES.md](QR-CODES.md))
4. Leia o manual do evento ([EVENT-OPERATIONS.md](EVENT-OPERATIONS.md))
5. Teste tudo completamente

### Se quer só explorar:
1. Clique em "Sou Vendedor"
2. Adicione um item
3. Veja na comanda
4. Teste todas as funcionalidades

---

## 💡 Dicas Importantes

✅ **Não feche o terminal** enquanto está usando o sistema  
✅ **Para parar:** `Ctrl+C` (depois `npm start` para rodar novamente)  
✅ **Para resetar:** Delete `db.json` e rode `npm start` novamente  
✅ **Para backup:** Copie `db.json` para local seguro  

---

## 📞 Precisando de Ajuda?

1. **Leia a documentação** (links acima)
2. **Veja o console** do navegador (F12)
3. **Verifique o terminal** onde rodou `npm start`
4. **Procure por "erro"** em vermelho

---

## 🎯 Prossiga Para:

- ⚡ [QUICKSTART.md](QUICKSTART.md) — Se quer começar rápido
- 🔨 [INSTALLATION.md](INSTALLATION.md) — Se precisa instalar
- 📚 [README.md](README.md) — Se quer tudo detalhado

---

## 🎊 Bem-vindo ao Mini Mercado EJC!

Seu sistema está 100% **pronto para usar**! 🚀

**Começar agora:**
```bash
npm install
npm start
```

**Depois abra:** http://localhost:3000

---

*Desenvolvido com ❤️ para eventos*

Última atualização: **Maio 2024**  
Sistema: **v1.0 — Completo e Funcional**
