# 💻 Instalação por Sistema Operacional

Guia passo a passo para instalar e rodar o sistema em cada SO.

---

## 🪟 Windows 10/11

### Passo 1: Instalar Node.js

1. **Acesse:** https://nodejs.org
2. **Baixe a versão LTS** (recomendado)
3. **Execute o instalador**
4. **Clique "Next" até o final**
5. **Confirme instalação do npm** (deixar marcado)

**Verificar instalação:**
```bash
# Abra Command Prompt (Win + R → cmd)
node --version
npm --version
```

Deve mostrar números de versão.

---

### Passo 2: Preparar a Pasta do Projeto

1. **Crie uma pasta**
   - Desktop → Click direito → Nova Pasta
   - Nomeie: `comanda-ejc`

2. **Ou via Command Prompt:**
   ```bash
   mkdir C:\Users\SeuNome\Desktop\comanda-ejc
   cd C:\Users\SeuNome\Desktop\comanda-ejc
   ```

---

### Passo 3: Copiar os Arquivos

1. **Copie todos os arquivos** do projeto para a pasta
2. Estrutura esperada:
   ```
   comanda-ejc/
   ├── server.js
   ├── package.json
   ├── public/
   │   ├── index.html
   │   ├── style.css
   │   └── script.js
   └── ...
   ```

---

### Passo 4: Instalar Dependências

1. **Abra Command Prompt**
2. **Navegue até a pasta:**
   ```bash
   cd C:\Users\SeuNome\Desktop\comanda-ejc
   ```
3. **Digite:**
   ```bash
   npm install
   ```

Vai levar ~30 segundos. Aguarde terminar.

---

### Passo 5: Rodar o Servidor

```bash
npm start
```

**Saída esperada:**
```
✅ Servidor rodando em http://localhost:3000
📋 Painel Admin: http://localhost:3000/admin
📦 Comandas criadas: 20
```

✅ **PRONTO!** Abra o navegador em `http://localhost:3000`

---

### ⚠️ Problemas no Windows

**"npm não é reconhecido como comando"**
- Reinicie o Command Prompt após instalar Node.js
- Ou reinicie o computador

**"Porta 3000 em uso"**
```bash
PORT=4000 npm start
```

**Firewall pedindo permissão**
- Clique "Permitir"

---

## 🍎 macOS

### Passo 1: Instalar Node.js

**Opção A: Instalador (Mais Fácil)**
1. Acesse: https://nodejs.org
2. Baixe versão LTS para macOS
3. Execute o `.pkg`
4. Clique "Continue" até o final

**Opção B: Homebrew (Mais Rápido)**
1. Abra Terminal
2. Digite:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Depois:
   ```bash
   brew install node
   ```

**Verificar:**
```bash
node --version
npm --version
```

---

### Passo 2: Clonar ou Descarregar Projeto

**Via Terminal:**
```bash
# Ir para Desktop
cd ~/Desktop

# Criar pasta
mkdir comanda-ejc
cd comanda-ejc

# Ou clonar (se tiver Git)
git clone <url-do-repositorio> .
```

---

### Passo 3: Instalar Dependências

```bash
npm install
```

---

### Passo 4: Rodar

```bash
npm start
```

**Abra em:** http://localhost:3000

---

### ⚠️ Problemas no macOS

**"Permissão negada ao npm install"**
```bash
sudo npm install
# Digite sua senha do Mac
```

**"Porta 3000 em uso"**
```bash
PORT=4000 npm start
```

---

## 🐧 Linux (Ubuntu/Debian)

### Passo 1: Instalar Node.js

```bash
# Atualizar pacotes
sudo apt update

# Instalar Node.js
sudo apt install nodejs npm

# Verificar
node --version
npm --version
```

---

### Passo 2: Preparar Projeto

```bash
# Ir para home
cd ~

# Criar pasta
mkdir comanda-ejc
cd comanda-ejc

# Copiar/descarregar arquivos
# ou clonar:
git clone <url> .
```

---

### Passo 3: Instalar Dependências

```bash
npm install
```

---

### Passo 4: Rodar

```bash
npm start
```

**Acessar:** http://localhost:3000

---

### Rodando em Background (Opcional)

Para que continue rodando mesmo fechando o terminal:

```bash
# Instalar PM2
npm install -g pm2

# Rodar com PM2
pm2 start server.js --name "comanda-ejc"

# Ver status
pm2 status

# Parar
pm2 stop comanda-ejc

# Ver logs
pm2 logs comanda-ejc
```

---

## 📱 Docker (Avançado)

Se tiver Docker instalado:

**Crie arquivo `Dockerfile`:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

**Depois rode:**
```bash
docker build -t comanda-ejc .
docker run -p 3000:3000 comanda-ejc
```

---

## 🚀 Resumo de Comandos

| O que fazer | Windows | macOS | Linux |
|-----------|---------|-------|-------|
| **Abrir Terminal** | Win+R → `cmd` | Cmd+Space → Terminal | Ctrl+Alt+T |
| **Ir para pasta** | `cd caminho` | `cd caminho` | `cd caminho` |
| **Instalar Node** | nodejs.org | nodejs.org ou brew | apt install |
| **Instalar deps** | `npm install` | `npm install` | `npm install` |
| **Rodar servidor** | `npm start` | `npm start` | `npm start` |
| **Parar servidor** | Ctrl+C | Ctrl+C | Ctrl+C |

---

## ✅ Verificação Final

Após instalar, abra o navegador e teste:

```
http://localhost:3000
```

Você deve ver:
```
┌─────────────────────────────┐
│    MINI MERCADO EJC         │
│                             │
│  🏪 Sou Vendedor            │
│  🙋 Ver Minha Comanda       │
└─────────────────────────────┘
```

Se ver isso: **✅ SUCESSO!**

---

## 🆘 Problemas Gerais

### "npm: comando não encontrado"
- Node.js não foi instalado corretamente
- Reinstale
- Reinicie o terminal/computador

### "Porta 3000 já está em uso"
- Outra aplicação usando a porta
- Use outra porta: `PORT=4000 npm start`

### "Permissão negada"
- No macOS/Linux: use `sudo npm install`
- Cuidado com permissões de pasta

### "Cannot find module 'express'"
- Esqueceu de rodar `npm install`
- Rode novamente: `npm install`

### "Servidor crasha logo depois de abrir"
- Verifique o erro no terminal
- Procure por "Error" em vermelho
- Copie e pesquise o erro

---

## 🎯 Próximas Etapas

1. ✅ Instalação concluída
2. Teste o servidor (`npm start`)
3. Acesse http://localhost:3000
4. Leia [QUICKSTART.md](QUICKSTART.md)
5. Configure IP para rede (veja [NETWORK-CONFIG.md](NETWORK-CONFIG.md))
6. Gere QR Codes (veja [QR-CODES.md](QR-CODES.md))

---

## 💡 Dicas

✅ **Sempre use versão LTS do Node.js**  
✅ **npm install deve funcionar sem erros**  
✅ **Reinicie terminal após instalar Node.js**  
✅ **Use mesma versão em todos os computadores**  

---

**Está tudo instalado? Vamos começar! 🚀**
