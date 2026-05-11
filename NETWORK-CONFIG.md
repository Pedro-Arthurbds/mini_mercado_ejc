# 🌐 Configuração de Rede — IP Local e WiFi

Guia para acessar o sistema em múltiplos dispositivos através da rede WiFi do evento.

---

## 🔍 Encontrar o IP Local do Computador

O servidor Node.js roda em `http://localhost:3000` **apenas no computador local**.

Para acessar de **celulares e outros dispositivos**, você precisa do **IP Local** do computador.

---

## 💻 No Windows

### Método 1: Command Prompt (Mais Fácil)

1. **Abra o Command Prompt**
   - Pressione `Windows + R`
   - Digite: `cmd`
   - Pressione Enter

2. **Digite este comando:**
   ```
   ipconfig
   ```

3. **Procure por:**
   ```
   IPv4 Address . . . . . . . . . . . . : 192.168.X.X
                                          ↑ este é seu IP
   ```

### Método 2: PowerShell

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -like "*WiFi*" -or $_.InterfaceAlias -like "*Ethernet*"}
```

### Método 3: Configurações do Windows

1. Configurações → Rede e Internet
2. WiFi (ou Ethernet)
3. Propriedades
4. Procure por "IPv4 Address"

---

## 🍎 No macOS

### Método 1: Terminal (Mais Fácil)

1. **Abra o Terminal**
   - `Cmd + Space`
   - Digite: `Terminal`
   - Pressione Enter

2. **Digite:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

3. **Resultado:**
   ```
   inet 192.168.1.100 netmask 0xffffff00
         ↑ este é seu IP
   ```

### Método 2: Preferências de Sistema

1. System Preferences
2. Network
3. WiFi (ou Ethernet)
4. Advanced
5. TCP/IP
6. Procure por "IPv4 Address"

---

## 🐧 No Linux

### Terminal

```bash
hostname -I
```

ou

```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**Resultado exemplo:**
```
192.168.1.100 172.17.0.1
↑ este é seu IP
```

---

## 📱 Formatos de IP Local Comuns

Dependendo do seu roteador, você verá:

```
192.168.1.X      ← Mais comum
192.168.0.X      ← Alternativo
10.0.0.X         ← Menos comum
172.16.X.X       ← Redes corporativas
```

**Todos são válidos!** Escolha o que terminar em **não-127**.

---

## 🔌 Acessando de Outro Dispositivo

### No Celular

Depois de encontrar o IP (ex: `192.168.1.100`):

1. **Conecte o celular no mesmo WiFi**

2. **Abra o navegador**

3. **Digite na barra de endereço:**
   ```
   http://192.168.1.100:3000
   ```

4. **Pressione Enter**

5. **Você verá a página home do sistema!**

### Exemplo:
```
IP do Computador: 192.168.1.100
URL para Celular: http://192.168.1.100:3000
```

---

## 🖥️ Acessando de Outro Computador

**Mesmo processo:**

1. Conecte no mesmo WiFi
2. Abra navegador
3. Digite: `http://192.168.1.100:3000`
4. Enter

---

## 🧪 Testando a Conexão

### No Celular/Outro PC

1. **Verifique a conectividade:**
   ```
   Abra qualquer site (Google, etc)
   Se funciona = WiFi OK
   ```

2. **Verifique o servidor:**
   ```
   Tente: http://192.168.1.100:3000
   Se abre = Servidor OK
   ```

### Se Não Funcionar

```
Checklist:
☐ WiFi conectado no dispositivo?
☐ Mesmo WiFi que o computador?
☐ IP correto digitado?
☐ Porta :3000 no final?
☐ Servidor rodando (npm start)?
☐ Computador não está em sleep?
☐ Firewall bloqueando?
```

---

## 🔒 Segurança da Rede WiFi

### Proteger o WiFi

**Antes do evento:**

1. **Mude a senha padrão do roteador**
   - Admin de roteadores é fácil de descobrir
   - Senha fraca = acesso fácil

2. **Use WiFi protegida (WPA2/WPA3)**
   - Não use WiFi aberta ("Open")

3. **Mude o nome do WiFi (SSID)**
   - Não deixe "TP-Link-123" padrão

### Durante o Evento

**Você pode:**
- ✅ Dar a senha para todos acessarem
- ✅ Criar "rede de convidados" separada
- ❌ Não deixar WiFi aberta (inseguro)

---

## 🌍 Acessando de Fora da Rede

❌ **Não funciona por padrão!**

IP local (`192.168.1.100`) **só funciona dentro da rede WiFi**.

### Se Precisar Acessar de Fora

Opção 1: **VPN ou Port Forwarding** (avançado)
Opção 2: **Deploy em servidor na nuvem** (Railway, Heroku)

---

## 📝 Documentação de IP para o Evento

**Imprima ou salve isso:**

```
╔════════════════════════════════════════╗
║   INFORMAÇÕES DE ACESSO DO EVENTO     ║
╠════════════════════════════════════════╣
║ IP LOCAL DO COMPUTADOR:               ║
║ __ . __ . __ . __  ou  192.168.1.100 ║
║                                        ║
║ PORTA: 3000                            ║
║                                        ║
║ URL PARA VENDEDORES:                  ║
║ http://192.168.1.100:3000/admin       ║
║                                        ║
║ URL PARA PARTICIPANTES:                ║
║ http://192.168.1.100:3000/comanda/### ║
║                                        ║
║ REDE WiFi: ___________________         ║
║ SENHA WiFi: __________________        ║
║                                        ║
║ CHAVE PIX: 27999370750                ║
║ WHATSAPP: 27999370750                 ║
╚════════════════════════════════════════╝
```

---

## 🚨 Problemas de Conectividade

### Problema 1: "Não Consigo Acessar o Servidor"

```
Tentei http://192.168.1.100:3000 e não abre
```

**Checklist:**
1. Servidor está rodando? (terminal aberto?)
2. WiFi conectado no celular?
3. IP correto?
4. Digitou `:3000` no final?

**Solução:**
```bash
# No terminal do computador, confirme:
npm start

# Deve mostrar:
# ✅ Servidor rodando em http://localhost:3000
```

---

### Problema 2: "Conecta no WiFi Mas Não Abre Página"

```
Celular conectado no WiFi, mas http://192.168.1.100:3000 não abre
```

**Causa provável:** Firewall do Windows bloqueando

**Solução:**
1. Windows Defender Firewall
2. "Permitir app através de firewall"
3. Procure por "Node.js"
4. Marque a caixa
5. Tente novamente

---

### Problema 3: "Acessa Mas Carrega Muito Lento"

```
Página demora para abrir
```

**Causa:** WiFi congestionado

**Soluções:**
1. Conecte menos dispositivos
2. Mude para 5GHz (se disponível)
3. Aproxime do roteador
4. Reinicie o roteador

---

### Problema 4: "Aleatoricamente Desconecta"

```
Às vezes abre, às vezes não abre
```

**Causa:** WiFi instável

**Solução:**
1. Reinicie o roteador
2. Coloque mais próximo
3. Reduz número de dispositivos
4. Use Ethernet (com cabo se possível)

---

## 🎯 Dicas de Rede para o Evento

✅ **Faça um teste 24h antes**
```
Conecte todos os dispositivos dos vendedores
Teste cada um acessando o painel
Veja velocidade e estabilidade
```

✅ **Tenha um roteador backup**
```
Se WiFi principal cair
Pode ativar um backup
```

✅ **Documente tudo**
```
IP local
Senha WiFi
Nome da rede
Horários de pico
```

✅ **Posicione bem o roteador**
```
Centro do local
Altura elevada
Longe de obstáculos
```

---

## 📱 Links Rápidos

**Para copiar e compartilhar (troque o IP):**

### Admin (Vendedores)
```
http://192.168.1.100:3000/admin
```

### Home (Qualquer um)
```
http://192.168.1.100:3000
```

### Buscar Comanda (Participantes)
```
http://192.168.1.100:3000/buscar
```

### QR Code Específico
```
http://192.168.1.100:3000/qr/001
http://192.168.1.100:3000/qr/002
```

### Comanda Específica
```
http://192.168.1.100:3000/comanda/001
http://192.168.1.100:3000/comanda/002
```

---

## 🎓 Resumo Rápido

1. **Encontre o IP local** do computador (`ipconfig`, `ifconfig`, etc)
2. **Digite em outro dispositivo** conectado no WiFi
3. **Sistema funciona em rede local**
4. **Não funciona fora do WiFi** (sem configuração avançada)
5. **Teste tudo antes do evento**

---

## ✅ Checklist de Rede

Antes do evento:

- [ ] IP local identificado
- [ ] Celulares conseguem acessar
- [ ] WiFi cobre todo o local
- [ ] Velocidade adequada (>5 Mbps)
- [ ] Roteador não está fogo
- [ ] Backup de roteador pronto
- [ ] Documento com IP impresso
- [ ] Senhas anotadas
- [ ] Firewall configurado

---

## 🎉 Pronto!

Seu sistema está **acessível em rede local**! 🚀

**Bom evento!**
