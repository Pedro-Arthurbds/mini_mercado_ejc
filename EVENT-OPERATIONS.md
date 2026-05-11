# 🎪 Guia de Operação no Evento — Mini Mercado EJC

Instruções passo a passo para rodar o sistema durante o evento.

---

## 📋 Pré-Evento (Dia Anterior)

### Checklist de Preparação

- [ ] **Hardware Verificado**
  - [ ] Computador/Notebook com Node.js instalado
  - [ ] WiFi testado (cobertura em todo o local)
  - [ ] Carregador do computador
  - [ ] Extensão para as tomadas

- [ ] **Software Verificado**
  - [ ] `npm install` executado
  - [ ] `npm start` funcionando
  - [ ] Servidor rodando sem erros
  - [ ] Painel admin acessível

- [ ] **QR Codes**
  - [ ] Todos os 20 QR Codes impressos
  - [ ] Qualidade de impressão OK
  - [ ] Testados com celular (escanear)
  - [ ] Organizados/numerados

- [ ] **Dados**
  - [ ] PIX correto em `server.js`
  - [ ] WhatsApp correto em `server.js`
  - [ ] Backup de `db.json` feito
  - [ ] Lista de participantes confirmada

- [ ] **Testes Finais**
  - [ ] Registrar uma venda completa
  - [ ] Verificar total
  - [ ] Testar QR Code (escanear)
  - [ ] Testar relatório

---

## 🎪 Dia do Evento

### 1️⃣ Preparação Inicial (30 min antes)

```bash
# Terminal do Computador
cd comanda-system
npm start
```

**Saída esperada:**
```
✅ Servidor rodando em http://localhost:3000
📋 Painel Admin: http://localhost:3000/admin
📦 Comandas criadas: 20
```

✅ **Sistema está pronto!**

---

### 2️⃣ Posicionamento no Local

**Vendedor (Caixa/Balcão):**
```
┌─────────────────────────────┐
│  COMPUTADOR                 │
│  ┌─────────────────────┐    │
│  │ http://localhost... │    │
│  │ PAINEL ADMIN        │    │
│  └─────────────────────┘    │
│                             │
│  CELUARES DOS VENDEDORES    │
│  📱 📱 📱 (acessando /admin) │
└─────────────────────────────┘
```

**QR Codes (Parede/Mural):**
```
[Ana Lima #001]  [Bruno #002]  [Carla #003]
[QR Code]        [QR Code]      [QR Code]

[Daniel #004]    [Eduarda #005] [Felipe #006]
[QR Code]        [QR Code]      [QR Code]

... e assim por diante ...
```

---

### 3️⃣ Instruir os Vendedores

**Script para treinar vendedores (5 min):**

```
"Olá! Quando alguém quiser comprar:

1. Peça o NÚMERO da comanda (ex: 001, 002, etc)
   OU peça que ele escaneie o QR Code

2. Busque a comanda no seu celular:
   - Acesse http://seu-ip:3000/admin
   - Busque o nome ou número
   - Clique no nome

3. Clique em '+ Registrar Venda'

4. Preencha:
   - Produto (ex: Refrigerante Lata)
   - Quantidade (1, 2, 3...)
   - Valor R$ (5.00, 10.00...)
   - Seu Nome (de vendedor)

5. Clique 'Salvar Item'

6. PRONTO! O cliente verá na comanda dele!"
```

---

### 4️⃣ Instruir os Participantes

**Script para instruir participantes (3 min):**

```
"Olá! Para ver sua comanda e quanto deve:

1. Escaneie o QR Code que foi dado a você
   (ou acesse manualmente: /comanda/seu-numero)

2. Você verá:
   ✓ Tudo que comprou
   ✓ Preço de cada item
   ✓ Quem vendeu
   ✓ TOTAL a pagar

3. Para pagar:
   - Copie a chave PIX (toque nela)
   - Vá no seu banco
   - Cole a chave PIX
   - Digite o valor TOTAL
   - Pague!

4. Tire print/foto do comprovante

5. Envie pelo WhatsApp:
   - Clique no botão 'WhatsApp'
   - Envie o comprovante
   
6. PRONTO! Você pagou!"
```

---

## 👨‍💼 Operação de Vendedor

### Cenário 1: Cliente Mostra QR Code

```
[Cliente chega com QR Code]
         ↓
[Vendedor Escaneia com Celular]
         ↓
[URL abre automaticamente]
         ↓
[Vê a comanda do cliente]
         ↓
[Clica "+ Registrar Venda"]
         ↓
[Preenche o formulário]
         ↓
[Clica "Salvar"]
         ↓
[Item aparece na comanda]
         ↓
[Cliente vê atualizado no celular dele]
```

---

### Cenário 2: Cliente Diz o Número

```
[Cliente: "Tenho comanda 007"]
         ↓
[Vendedor acessa /admin]
         ↓
[Busca por #007 (ou nome)]
         ↓
[Clica no resultado]
         ↓
[Abre a comanda]
         ↓
[+ Registrar Venda]
         ↓
[Preenche e salva]
```

---

## 📱 Operação de Participante

### Ver Comanda

```
[Recebeu um QR Code]
         ↓
[Abre câmera → escaneia]
         ↓
[Abre a comanda]
         ↓
[Vê a lista de compras]
         ↓
[Vê o total]
```

### Pagar

```
[Vê a comanda]
         ↓
[Clique na chave PIX]
         ↓
[Copiar automático ✅]
         ↓
[Abra seu banco]
         ↓
[PIX → Cole a chave]
         ↓
[Digite o TOTAL]
         ↓
[Confirme e pague]
         ↓
[Tire print do comprovante]
         ↓
[Clique no WhatsApp button]
         ↓
[Envie o comprovante]
```

---

## 🆘 Problemas Comuns no Evento

### Problema 1: Alguém Não Consegue Acessar

**Causa:** Não conectou no WiFi  
**Solução:**
1. Verifique se celular está conectado no WiFi
2. Teste abrindo qualquer outra página
3. Se continuar, reinicie o WiFi

**Alternativa:** Use IP direto
```
http://192.168.1.100:3000  (trocar pelo seu IP)
```

---

### Problema 2: QR Code Não Funciona

**Causa:** Câmera com problema ou QR Code ruim  
**Solução:**
1. Tente com outra câmera
2. Teste com app "QR Reader" (Play Store/App Store)
3. Acesse manualmente: `/comanda/001`

---

### Problema 3: Item Não Aparece na Comanda do Cliente

**Causa:** Página não recarregou  
**Solução:**
1. Peça para cliente recarregar (F5)
2. Ou feche e reabra a página
3. Se persistir, reinicie o servidor

---

### Problema 4: Servidor Parou de Funcionar

**Causa:** Servidor crashou  
**Solução:**
```bash
# No terminal:
Ctrl+C  (parar)
npm start  (reiniciar)
```

**Se não funcionar:**
```bash
rm db.json  (apagar banco)
npm start   (criar novo)
```

⚠️ **Aviso:** Vai perder dados de vendas!

---

### Problema 5: WiFi Caiu

**Causa:** Roteador problemático  
**Solução:**
1. Reinicie o roteador (30 segundos)
2. Ou use hotspot do celular (última opção)
3. Computador continua rodando mesmo sem WiFi
4. Espera reconectar automaticamente

---

### Problema 6: Alguém Quer Remover um Item

**Solução:** No celular do vendedor
1. Acesse a comanda do cliente
2. Clique no item
3. Clique no 🗑️ (lixo) para remover
4. Confirme a deleção

---

### Problema 7: Total Não Bate

**Causa:** Item com valor errado ou qtd errada  
**Solução:**
1. Verifique cada item
2. Remova o item errado (🗑️)
3. Adicione novamente com valores corretos

---

## 📊 Monitoramento Durante o Evento

### A Cada 30 Minutos

- [ ] Verificar se servidor está rodando
- [ ] Contar quantas vendas foram feitas
- [ ] Verificar se total está crescendo
- [ ] Testar um QR Code (escanear)

### A Cada Hora

- [ ] Ver relatório geral (`/admin` → 📊)
- [ ] Verificar produtos mais vendidos
- [ ] Verificar total arrecadado
- [ ] Fazer backup de `db.json`

---

## 💾 Backup Durante o Evento

### Backup Manual (A cada 2 horas)

```bash
# No terminal, com servidor rodando:
cp db.json db.json.backup.$(date +%H-%M)
```

**Isso cria:**
- `db.json.backup.10-00`
- `db.json.backup.12-00`
- `db.json.backup.14-00`

Se algo der errado, você pode restaurar!

---

## 📈 Relatório em Tempo Real

### Acessar Relatório

```
1. Celular/Computador qualquer
2. Acesse: http://localhost:3000/admin
3. Clique no botão 📊 (canto superior)
4. Veja:
   - Total Arrecadado
   - Número de Comandas
   - Produtos Mais Vendidos
```

### Exportar Dados (Avançado)

```bash
# Copia para backup
cp db.json db.json.final

# Ou acesse a API
curl http://localhost:3000/api/relatorio > relatorio.json
```

---

## 🎯 Fim do Evento

### Encerramento (15 min antes do fim)

```bash
# 1. Avise aos vendedores que está terminando
"Últimas 15 minutos! Registrem as últimas vendas!"

# 2. Aguarde últimas transações

# 3. Ver relatório final
/admin → 📊

# 4. Fazer backup final
cp db.json db.json.final
```

### Desligar o Sistema

```bash
# No terminal:
Ctrl+C

# Depois você pode fechar tudo
```

---

## 📋 Relatório Pós-Evento

### Dados Salvos em `db.json`

Contém:
- Todos os participantes
- Todos os itens vendidos
- Horários de cada venda
- Vendedor de cada item

### Análise Posterior

```bash
# Ver total arrecadado
curl http://localhost:3000/api/relatorio | jq .totalGeral

# Ver produtos mais vendidos
curl http://localhost:3000/api/relatorio | jq .produtosMaisVendidos
```

---

## 🖥️ Rodar em Outro Computador

Se precisar mudar para outro computador:

```bash
# 1. Copie toda a pasta comanda-system
# 2. No novo computador:
cd comanda-system
npm install
npm start

# 3. Pode restaurar db.json antigo:
cp db.json.backup db.json
npm start
```

---

## 📞 Contatos de Emergência

Tenha à mão:

```
Seu telefone: _________________
WiFi password: _________________
Admin email: _________________
Node.js version: _________________
IP do Computador: _________________
```

---

## 🎓 Dicas Importantes

✅ **Não feche o terminal** onde o servidor está rodando  
✅ **Não desligue o computador** durante o evento  
✅ **Faça backup** a cada 2 horas  
✅ **Anote o IP local** no começo  
✅ **Tester tudo antes** de começar vendas reais  
✅ **Mantenha carregador perto**  

---

## 🎉 Exemplos de Operação

### Exemplo 1: Venda Simples

```
Cliente: "Quero um refrigerante"
Vendedor: "Qual é seu número de comanda?"
Cliente: "001"
Vendedor: [Busca #001 no /admin]
Vendedor: [Clica "+ Registrar Venda"]
Vendedor: Produto: "Refrigerante Lata"
Vendedor: Quantidade: 1
Vendedor: Valor: 5.00
Vendedor: Seu Nome: João
Vendedor: [Clica "Salvar"]
✅ Item aparece na comanda
```

### Exemplo 2: Cliente com QR Code

```
Cliente: [Escaneia QR]
QR abre: /comanda/005
Cliente vê: Comanda de Eduarda Ferreira
Cliente chama vendedor
Vendedor: [Já tem a comanda aberta]
Vendedor: [Clica "+ Registrar Venda"]
Vendedor: [Preenche dados]
✅ Item salvo
Cliente vê atualizado no celular dele
```

### Exemplo 3: Pagamento PIX

```
Cliente: [Entra na comanda]
Cliente vê: Total R$ 23,50
Cliente: [Toca na chave PIX]
✅ Chave PIX copiada automático
Cliente: [Abre o banco]
Cliente: [PIX → Cola a chave]
Cliente: [Digita R$ 23,50]
Cliente: [Confirma e paga]
Cliente: [Tira print do comprovante]
Cliente: [Clica no botão WhatsApp]
Cliente: [Envia o print]
✅ Comprovante recebido
```

---

## 📱 Checklist Operacional Diário

### Antes de Abrir (08:00 - Exemplo)
- [ ] Servidor rodando (`npm start`)
- [ ] WiFi testado (velocidade OK)
- [ ] Todos os vendedores com acesso
- [ ] Relatório anterior salvo
- [ ] Testes de vendas finalizados

### Durante o Evento (Contínuo)
- [ ] Monitorar servidor (não fechar terminal)
- [ ] Novas vendas aparecem em tempo real
- [ ] Totais atualizando corretamente
- [ ] Participantes conseguem acessar comanda

### A Cada 2 Horas
- [ ] Fazer backup (`cp db.json db.json.backup`)
- [ ] Ver relatório (`/admin` → 📊)
- [ ] Verificar se há erros no terminal

### Ao Fechar (Exemplo: 18:00)
- [ ] Últimas vendas registradas
- [ ] Backup final feito
- [ ] Relatório gerado
- [ ] Servidor desligado (`Ctrl+C`)

---

## 🎊 Sucesso!

Com esse guia você está **100% preparado** para operar o sistema no evento!

**Bom evento! 🚀**
