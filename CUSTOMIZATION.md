# ⚙️ Customização — Mini Mercado EJC

Este guia mostra como customizar o sistema sem precisar ser desenvolvedor.

---

## 🔧 Mudanças Simples

### 1️⃣ Alterar Chave PIX

**Arquivo:** `server.js`  
**Linha:** ~15

Encontre:
```javascript
pixKey: '27999370750',
```

Altere para sua chave:
```javascript
pixKey: 'seu-pix-aqui@banco',  // ou seu CPF/Telefone
```

**Salve e reinicie:**
```bash
Ctrl+C
npm start
```

---

### 2️⃣ Alterar WhatsApp para Comprovante

**Arquivo:** `server.js`  
**Linha:** ~16

Encontre:
```javascript
whatsapp: '27999370750',
```

Altere para seu número:
```javascript
whatsapp: '85987654321',  // Sem espaços, apenas números
```

---

### 3️⃣ Alterar Nome do Evento

**Arquivo:** `server.js`  
**Linha:** ~17

Encontre:
```javascript
eventName: 'Mini Mercado EJC',
```

Altere para:
```javascript
eventName: 'Meu Evento Incrível',
```

---

### 4️⃣ Alterar Cores Principais

**Arquivo:** `public/style.css`  
**Linhas:** 5-24

```css
:root {
  --verde: #00c16e;          /* Cor principal */
  --verde-dark: #009955;     /* Verde escuro */
  --verde-light: #e6fff3;    /* Verde claro */
  --azul: #1a1a2e;           /* Cor secundária */
  --roxo: #7c3aed;           /* Destaque */
  --amarelo: #fbbf24;        /* Atenção */
  ...
}
```

**Cores Web Recomendadas:**
```
Verde:      #00c16e, #00e68a, #10b981
Azul:       #1a1a2e, #0066cc, #003366
Roxo:       #7c3aed, #a855f7, #9333ea
Vermelho:   #ef4444, #dc2626, #991b1b
Amarelo:    #fbbf24, #fcd34d, #fef3c7
```

---

### 5️⃣ Alterar Fonte

**Arquivo:** `public/index.html`  
**Linhas:** 8-9

Encontre:
```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

Escolha novas fontes em: https://fonts.google.com

Exemplo com "Inter" e "Roboto":
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
```

Depois altere no CSS:
```css
:root {
  --font-head: 'Roboto', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## 👥 Customizar Participantes

### Adicionar/Remover Nomes

**Arquivo:** `server.js`  
**Linhas:** ~40-55

Encontre:
```javascript
const nomesExemplo = [
  'Ana Lima', 'Bruno Souza', 'Carla Menezes', ...
];
```

**Para ADICIONAR:**
```javascript
const nomesExemplo = [
  'Ana Lima', 
  'Bruno Souza', 
  'Carla Menezes',
  'Novo Participante',  // ← adicione aqui
  'Daniel Costa',
  ...
];
```

**Para REMOVER:**
```javascript
const nomesExemplo = [
  'Ana Lima',
  // 'Bruno Souza',    ← comentar ou deletar
  'Carla Menezes',
  ...
];
```

**Depois, reinicie:**
```bash
rm db.json
npm start
```

---

## 📱 Customizar Interface

### Mudar Logo/Emoji da Página Home

**Arquivo:** `public/index.html`  
**Linha:** ~130

Encontre:
```html
<div class="home-logo">🛒</div>
```

Altere para qualquer emoji:
```html
<div class="home-logo">🎪</div>  <!-- Circo -->
<div class="home-logo">🎉</div>  <!-- Festa -->
<div class="home-logo">🎭</div>  <!-- Evento -->
<div class="home-logo">🍔</div>  <!-- Food truck -->
<div class="home-logo">🍕</div>  <!-- Pizzaria -->
```

---

### Mudar Título da Página

**Arquivo:** `public/index.html`  
**Linhas:** ~133-135

Encontre:
```html
<h1 class="home-title">Mini Mercado<br/><span>EJC</span></h1>
<p class="home-sub">Sistema de Comandas</p>
```

Altere para:
```html
<h1 class="home-title">Meu Evento<br/><span>2024</span></h1>
<p class="home-sub">Sistema de Pagamento</p>
```

---

## 🎨 Customizar CSS Avançado

### Mudar Tamanho das Fontes

**Arquivo:** `public/style.css`

Procure por `font-size:` e altere. Exemplos:

```css
/* Títulos maiores */
.home-title { font-size: 48px; }  /* era 40px */

/* Texto menor */
.item-details { font-size: 12px; }  /* era 13px */
```

---

### Mudar Cantos Arredondados

Procure por `border-radius:` e altere:

```css
--radius: 20px;      /* era 16px - mais redondo */
--radius-sm: 12px;   /* era 10px */
```

---

### Mudar Sombras

Procure por `--sombra:` e altere:

```css
/* Mais proeminente */
--sombra: 0 4px 20px rgba(0,0,0,0.15);

/* Mais sutil */
--sombra: 0 1px 3px rgba(0,0,0,0.05);
```

---

## 💾 Customizar Banco de Dados

### Adicionar Itens de Exemplo

**Arquivo:** `db.json`

Após rodar o servidor uma vez, abra `db.json`:

```json
{
  "comandas": {
    "001": {
      "id": "001",
      "participante": "Ana Lima",
      "itens": [
        {
          "id": "1",
          "produto": "Refrigerante",
          "quantidade": 2,
          "valor": 5.00,
          "vendedor": "João",
          "horario": "15/01/2024 10:35"
        }
      ]
    }
  }
}
```

**Adicione itens manualmente se quiser testar.**

---

## 🔔 Customizar Mensagens

### Toast (Notificações)

**Arquivo:** `public/script.js`

Procure por `this.toast(` e você verá mensagens como:

```javascript
this.toast('✅ Comanda criada!');
this.toast('❌ Erro ao salvar');
this.toast('⚠️ Preencha todos os campos!');
```

Altere os emojis e textos conforme quiser.

---

## 📧 Customizar Email/Contato

Se quiser adicionar email além do WhatsApp:

**Arquivo:** `server.js`  
**Adicione:**

```javascript
const CONFIG = {
  pixKey: '27999370750',
  whatsapp: '27999370750',
  email: 'seu-email@example.com',  // ← novo
  eventName: 'Mini Mercado EJC',
};
```

**Depois em `public/index.html`, na seção de rodapé da comanda, altere:**

```html
<div class="comprovante-section">
  <p>📲 Após pagar, envie o comprovante para:</p>
  <a class="whatsapp-btn" href="mailto:" id="email-link">
    Email → <span id="email-addr"></span>
  </a>
</div>
```

---

## 🌐 Customizar Domínio

Quando colocar em produção com um domínio próprio:

A URL dos QR Codes muda automaticamente! Exemplo:

```
Local:       http://localhost:3000/comanda/001
Domínio:     https://seudominio.com/comanda/001
```

O sistema detecta automaticamente o domínio do servidor.

---

## 🎨 Temas Pré-Configurados

### Tema Verde (Padrão)
Já está ativado. Cores verde/azul.

### Tema Roxo

**Arquivo:** `public/style.css`

```css
:root {
  --verde: #7c3aed;
  --verde-dark: #6d28d9;
  --verde-light: #ede9fe;
  --azul: #5b21b6;
  ...
}
```

### Tema Laranja

```css
:root {
  --verde: #f97316;
  --verde-dark: #ea580c;
  --verde-light: #fed7aa;
  --azul: #92400e;
  ...
}
```

### Tema Vermelho

```css
:root {
  --verde: #ef4444;
  --verde-dark: #dc2626;
  --verde-light: #fee2e2;
  --azul: #7f1d1d;
  ...
}
```

---

## 🔒 Segurança: Mudar Porta

Se quiser rodar em outra porta além de 3000:

**Método 1: Variável de Ambiente**
```bash
PORT=8080 npm start
```

**Método 2: Editar `server.js`**
```javascript
const PORT = 8080;  // era 3000
```

---

## 📱 Customizar Layout Mobile

O sistema é mobile-first. Para desabilitar responsividade:

**Arquivo:** `public/style.css`

**Remova ou comente:**
```css
@media (min-width: 500px) {
  /* ... */
}
```

---

## 🎯 Checklist de Customização

- [ ] PIX alterado
- [ ] WhatsApp alterado  
- [ ] Nome do evento alterado
- [ ] Cores personalizadas
- [ ] Fonte alterada (opcional)
- [ ] Participantes customizados
- [ ] Logo/Emoji alterado
- [ ] Testado tudo no navegador
- [ ] Reiniciado servidor (`npm start`)

---

## 🆘 Erro Após Customização?

Se der erro depois de alterar:

1. **Verifique a sintaxe**
   - Procure por aspas não fechadas
   - Procure por vírgulas extras

2. **Veja o console**
   - Abra F12 no navegador
   - Veja se há erros em vermelho

3. **Reverta a mudança**
   - Desfaça a última alteração
   - Salve e reinicie

4. **Use Git (opcional)**
   ```bash
   git diff  # Ver o que mudou
   git checkout -- arquivo.js  # Reverter
   ```

---

## 💡 Dicas Finais

✅ **Sempre faça backup** antes de customizar  
✅ **Teste no navegador** (F12) após cada mudança  
✅ **Reinicie o servidor** com `npm start`  
✅ **Limpe cache** do navegador (Ctrl+Shift+Delete)  
✅ **Documenta** suas mudanças com comentários  

Boa sorte com a customização! 🚀
