# 📷 Guia Completo de QR Codes — Mini Mercado EJC

## 🎯 O que é um QR Code?

Um **QR Code** (Quick Response Code) é um código de barras bidimensional que:
- Pode ser lido com qualquer câmera/celular
- Armazena uma URL ou texto
- Redireciona para a comanda do participante

---

## 🔗 Como Funciona o QR Code no Sistema

```
[QR Code Impresso] 
         ↓
[Participante Escaneia]
         ↓
[Abre a URL no navegador]
         ↓
[Vê sua comanda com itens]
         ↓
[Copia PIX e paga]
```

**URL armazenada no QR Code**:
```
http://seu-ip-local:3000/comanda/001
http://seu-ip-local:3000/comanda/002
http://seu-ip-local:3000/comanda/003
... e assim por diante
```

---

## 🖨️ Gerando QR Codes no Painel Admin

### Passo a Passo

1. **Acesse o Painel**
   ```
   http://localhost:3000/admin
   ```

2. **Encontre o Participante**
   - Use a busca (🔍) para encontrar
   - Ou role até encontrar

3. **Clique no Botão 📷 (Câmera)**
   ```
   [Ana Lima] [#001] [2 itens] [📷]
              ↑ clique aqui
   ```

4. **Veja a Tela do QR Code**
   ```
   ┌─────────────────────────┐
   │     Ana Lima            │
   │    Comanda #001         │
   │   ┌──────────────────┐  │
   │   │   [QR CODE]      │  │
   │   │   (imagem)       │  │
   │   └──────────────────┘  │
   │  URL: http://...        │
   │  [🖨️ Imprimir]          │
   └─────────────────────────┘
   ```

5. **Imprima o QR Code**
   - Clique em **🖨️ Imprimir**
   - Selecione a impressora
   - Papel recomendado: A4 ou etiqueta

---

## 🖥️ Gerando QR Code via API

Se quiser integrar com outro sistema:

### Request
```bash
GET /api/qr/001
```

### Response
```json
{
  "url": "http://localhost:3000/comanda/001",
  "qr": "data:image/png;base64,iVBORw0KG..."
}
```

### Usar o Base64 em HTML
```html
<img src="data:image/png;base64,iVBORw0KG..." alt="QR Code" />
```

---

## 📱 Escaneando o QR Code

### Com iPhone (iOS)
1. Abra o **Câmera** padrão
2. Aponte para o QR Code
3. Toque na notificação que aparece
4. Abre a URL automaticamente

### Com Android
1. Abra o **Google Lens** ou câmera
2. Aponte para o QR Code
3. Toque no link que aparece
4. Abre no navegador

### Com Apps de QR Code
- **Android**: "QR Code Reader" (Play Store)
- **iPhone**: "QR Reader" (App Store)
- **Online**: [qrcode-decoder.com](https://qrcode-decoder.com)

---

## 🎨 Personalizando QR Codes

O sistema gera QR Codes com cores padrão:
- **Cor escura**: #1a1a2e (azul-escuro)
- **Cor clara**: #ffffff (branco)

Para customizar, edite `server.js`:

```javascript
const qr = await QRCode.toDataURL(url, {
  width: 300,
  margin: 2,
  color: { 
    dark: '#1a1a2e',    // ← mude a cor escura
    light: '#ffffff'     // ← mude a cor clara
  },
});
```

### Cores Recomendadas
- Verde escuro: `#009955`
- Azul: `#1a1a2e`
- Preto: `#000000`
- Vermelho: `#ef4444`

---

## 📋 Salvando QR Codes como Imagem

### Opção 1: Screenshot (Fácil)

1. Abra o QR Code no navegador
2. Pressione `Print Screen` (ou `PrtSc`)
3. Abra Paint ou GIMP
4. Cole (`Ctrl+V`)
5. Salve como PNG

### Opção 2: Clicar com Botão Direito

1. Abra o QR Code
2. Clique com botão direito na imagem
3. "Salvar imagem como..."
4. Escolha a pasta

### Opção 3: Download via API

```bash
# Baixar QR Code como PNG
curl -s http://localhost:3000/api/qr/001 | \
  jq -r '.qr' > qr_001.png
```

---

## 🖨️ Dicas de Impressão

### Tamanho Ideal
- **Mínimo**: 5cm x 5cm (2" x 2")
- **Recomendado**: 10cm x 10cm (4" x 4")
- **Máximo**: 20cm x 20cm (8" x 8")

### Configurações de Impressão
- **Qualidade**: Alta (300+ dpi)
- **Cores**: Preto e Branco
- **Papel**: Branco fosco ou brilhante
- **Margens**: 1-2cm ao redor

### Tipos de Impressão
1. **Papel A4** — Popular, fácil de encontrar
2. **Etiquetas** — Colar em camisetas/ingressos
3. **Adesivos** — Para produtos
4. **Bandeiras** — Pendurável no local

---

## 🔒 Teste do QR Code

### Verificar se Funciona

1. **Escaneie com seu celular**
   - Deve abrir a URL da comanda
   - Se não abrir, verificar:
     - WiFi está conectada?
     - IP local correto?
     - Servidor rodando?

2. **Teste de Leitura**
   ```
   ✅ Escaneia rápido (< 1s)
   ✅ Abre a página certa
   ✅ Mostra a comanda correta
   ✅ Total está correto
   ```

3. **Se não funcionar**
   - Regenere o QR Code
   - Limpe o cache do navegador
   - Teste em outro celular

---

## 📊 Exemplo: Imprimir Todos os QR Codes

### Script para Gerar Todos os QR Codes (Bash)

```bash
#!/bin/bash

# Criar pasta
mkdir -p qr_codes

# Gerar QR Code para cada comanda
for i in {001..020}; do
  curl -s http://localhost:3000/api/qr/$i | \
    jq -r '.qr' | \
    sed 's/data:image\/png;base64,//' | \
    base64 -d > qr_codes/comanda_$i.png
  echo "✅ QR Code $i gerado"
done

echo "🎉 Todos os QR Codes salvos em qr_codes/"
```

### Ou Gerar via Python

```python
import requests
import base64
import os

os.makedirs('qr_codes', exist_ok=True)

for i in range(1, 21):
    comanda_id = str(i).zfill(3)
    response = requests.get(f'http://localhost:3000/api/qr/{comanda_id}')
    data = response.json()
    
    # Extrair base64
    b64_string = data['qr'].replace('data:image/png;base64,', '')
    
    # Salvar arquivo
    with open(f'qr_codes/comanda_{comanda_id}.png', 'wb') as f:
        f.write(base64.b64decode(b64_string))
    
    print(f'✅ QR Code {comanda_id} gerado')

print('🎉 Todos os QR Codes salvos em qr_codes/')
```

---

## 🎪 Usando QR Codes no Evento

### Coloca os QR Codes Onde?

1. **Parede do Caixa** — Onde as pessoas vão pagar
   - QR Codes em ordem numérica
   - Identificação clara (nome + número)

2. **Cartão de Ingresso** — Dado ao participante
   - QR Code no verso
   - Pode escanear a qualquer momento

3. **Mural** — Na entrada do evento
   - QR Codes grandes (20x20cm)
   - Pessoas veem sua comanda

4. **Camiseta** — Imprimir em adesivo
   - QR Code no peito
   - Fácil de escanear pelos vendedores

---

## 🔐 Segurança & Privacidade

### URLs são Públicas?
⚠️ **Sim, as URLs são públicas!**

Qualquer pessoa com o link pode acessar a comanda. 

Para adicionar segurança:
1. Use HTTPS em produção
2. Adicione senha opcional
3. Autenticação por PIN
4. Validade de tempo (ex: URL expira em 2 horas)

### Exemplo: URL com Token
```
http://localhost:3000/comanda/001?token=abc123xyz
```

---

## 📱 Links de Teste

Teste esses links diretamente no navegador:

```
Comanda #001: http://localhost:3000/comanda/001
Comanda #002: http://localhost:3000/comanda/002
...
Comanda #020: http://localhost:3000/comanda/020

QR Code #001: http://localhost:3000/api/qr/001
```

---

## 🎨 Exemplos de QR Codes Personalizados

Se quiser QR Codes mais bonitos, use ferramentas online:

1. **QR Code Generator** — https://www.qr-code-generator.com
2. **QRServer** — https://api.qrserver.com
3. **GoQR** — https://goqr.me

### Exemplo com Logo
```html
<!-- QR Code com logo no centro -->
<img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://localhost:3000/comanda/001" />
```

---

## ✅ Checklist: QR Codes Prontos?

- [ ] Servidor rodando (`npm start`)
- [ ] Acesso ao painel admin (`/admin`)
- [ ] QR Codes gerados para todas as 20 comandas
- [ ] QR Codes testados com celular
- [ ] QR Codes impressos
- [ ] Links funcionando
- [ ] Redirecionamento correto

---

## 🎉 Pronto!

Seus QR Codes estão prontos para o evento! 🚀

**Dicas Finais:**
- ✅ Imprima em alta qualidade
- ✅ Coloque em local visível
- ✅ Teste antes do evento
- ✅ Tenha um backup digital

Boa sorte! 🎊
