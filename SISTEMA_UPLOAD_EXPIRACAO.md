# 📸 Sistema de Upload e Expiração de Imagens

## ✨ Novas Funcionalidades Implementadas

### 1. **Upload de Imagens com Captura de Foto**

#### 📤 Opções de Upload:
- **Escolher Arquivos**: Selecione múltiplas imagens do seu dispositivo
- **Tirar Foto**: Use a câmera do dispositivo diretamente (especialmente útil em smartphones)

#### 🔒 Validações:
- Apenas arquivos de imagem (JPG, PNG, WebP, GIF)
- Tamanho máximo: 2MB por imagem
- Preview instantâneo das imagens
- Possibilidade de remover imagens antes de salvar

#### 💾 Armazenamento:
- Imagens convertidas para Base64
- Armazenadas no localStorage do navegador
- Funciona 100% offline após carregar
- Compatível com GitHub Pages (sem necessidade de backend)

---

### 2. **Sistema de Expiração Automática**

#### ⏰ Como Funciona:
Ao criar um novo anúncio, você pode escolher a validade:
- **6 meses**: Para anúncios temporários
- **12 meses**: Recomendado (padrão)
- **24 meses**: Para anúncios de longo prazo

#### 🔔 Avisos Automáticos:
- **30 dias antes**: Sistema avisa sobre anúncios próximos do vencimento
- **No vencimento**: Anúncios expirados são removidos automaticamente

#### 📊 Painel de Administração:
- Mostra status de validade de cada anúncio
- Alerta visual para anúncios próximos da expiração
- Data de expiração formatada em português

#### 🎯 Benefícios:
- **Economiza espaço**: Remove automaticamente anúncios antigos
- **Mantém dados atualizados**: Evita acúmulo de informações desatualizadas
- **Gerenciamento fácil**: Controle visual da validade dos anúncios

---

## 🚀 Como Usar

### Adicionar Novo Terreno:
1. Acesse o **Painel de Administração** (link no rodapé)
2. Clique em **"Adicionar Novo Terreno"**
3. Preencha os dados do terreno
4. Na seção **"Imagens do Terreno"**:
   - Clique em **"Escolher Arquivos"** para selecionar imagens do seu dispositivo
   - OU clique em **"Tirar Foto"** para usar a câmera (mobile)
5. Veja o preview das imagens
6. Remova imagens indesejadas clicando no **"×"**
7. Escolha a **validade do anúncio** (6, 12 ou 24 meses)
8. Clique em **"Salvar"**

### Monitorar Validade:
1. Acesse o **Painel de Administração**
2. Anúncios próximos do vencimento aparecem com **ícone de alerta amarelo**
3. A data de expiração é exibida abaixo do título

---

## ⚠️ Limitações e Considerações

### Armazenamento:
- **localStorage**: Limite de ~5-10MB (varia por navegador)
- **Recomendação**: 20-30 terrenos com 2-3 imagens cada
- **Dados locais**: Armazenados no navegador do usuário

### Alternativas para Projetos Maiores:
Se precisar de mais espaço ou compartilhamento entre dispositivos:
1. **GitHub Issues + Images**: Hospedar imagens nos issues do GitHub
2. **Imgur API**: Serviço gratuito de hospedagem de imagens
3. **Cloudinary**: Plano gratuito com CDN
4. **AWS S3**: Para projetos profissionais

---

## 🔧 Detalhes Técnicos

### Arquivos Criados/Modificados:
- `utils/imageExpiration.ts`: Utilitários para gerenciar expiração
- `types.ts`: Adicionados campos `createdAt` e `expiresAt`
- `pages/LandForm.tsx`: Interface de upload com câmera
- `pages/AdminPage.tsx`: Exibição de status de expiração
- `App.tsx`: Lógica de remoção automática

### Funções Principais:
- `addExpirationDates()`: Adiciona datas ao criar anúncio
- `isExpired()`: Verifica se anúncio expirou
- `isExpiringSoon()`: Verifica se expira em 30 dias
- `removeExpiredListings()`: Remove anúncios expirados
- `extendExpiration()`: Estende validade (implementação futura)

---

## 📱 Compatibilidade

### Captura de Foto:
- ✅ Android (Chrome, Firefox, Edge)
- ✅ iOS (Safari 11+)
- ✅ Desktop (webcam quando disponível)

### Armazenamento Base64:
- ✅ Todos os navegadores modernos
- ✅ GitHub Pages
- ✅ Netlify, Vercel, etc.

---

## 🎉 Pronto para Usar!

O sistema está totalmente funcional e pronto para produção no GitHub Pages!
