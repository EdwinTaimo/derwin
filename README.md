# 🥿 DERWIN — Site de Sapatilhas

Site de vendas de sapatilhas para Beira, Sofala e Moçambique.

---

## 🚀 Como publicar no GitHub Pages (passo a passo)

### 1. Criar conta no GitHub
- Acesse [github.com](https://github.com) e crie uma conta gratuita se ainda não tiver.

### 2. Criar um repositório
1. Clique em **"New repository"** (botão verde)
2. Nome do repositório: `derwin` (ou `derwin-shoes`)
3. Marque como **Public**
4. Clique em **"Create repository"**

### 3. Fazer upload dos ficheiros
1. Na página do repositório, clique em **"uploading an existing file"**
2. Arraste os 3 ficheiros para a área de upload:
   - `index.html`
   - `style.css`
   - `app.js`
3. Clique em **"Commit changes"**

### 4. Activar GitHub Pages
1. Vá em **Settings** (no repositório)
2. No menu lateral, clique em **Pages**
3. Em "Source", seleccione **"Deploy from a branch"**
4. Branch: **main** → Folder: **/ (root)**
5. Clique em **Save**

### 5. Aceder ao site
Após 1-2 minutos, o seu site estará disponível em:
```
https://SEU_USUARIO.github.io/derwin/
```

---

## ✏️ Personalizar o site

### Mudar o número do WhatsApp
Abra o ficheiro `app.js` e mude a linha:
```js
const WA_NUMBER = "258841234567";
```
Para o seu número real (sem + ou espaços).

### Adicionar produtos facilmente
1. Abra o site no browser
2. Clique no botão **⚙** no canto inferior direito
3. Preencha o formulário com:
   - Nome do modelo
   - Categoria (Masculino/Feminino/Unissex)
   - Preço em MZN
   - Descrição detalhada
   - Tamanhos disponíveis
   - URL da foto (pode usar links do Google Fotos, Dropbox, etc.)
   - Estado (Novo, Promoção, Esgotado)
4. Clique em **"Adicionar ao Catálogo"**

Os produtos são guardados automaticamente no browser.

### Adicionar produtos permanentemente (recomendado)
Para que os produtos apareçam para todos os visitantes, edite o ficheiro `app.js`
e adicione os seus produtos no array `defaultProducts`:

```js
{
  id: 7,  // número único
  name: "Nome do Modelo",
  category: "masculino",  // masculino | feminino | unissex
  price: 5000,  // preço em MZN
  desc: "Descrição detalhada do produto...",
  sizes: ["39","40","41","42","43"],
  img: "URL_DA_FOTO",
  badge: "novo"  // novo | promo | esgotado | "" (vazio = nenhum)
},
```

### Mudar fotos dos produtos
Use URLs de imagens de:
- As suas próprias fotos partilhadas no Google Fotos (link público)
- [Unsplash](https://unsplash.com) — fotos gratuitas
- Dropbox, OneDrive (link de partilha directo)
- Qualquer servidor de imagens

---

## 📁 Estrutura dos ficheiros

```
derwin/
├── index.html   — Estrutura da página
├── style.css    — Estilo visual (cores, fontes, layout)
├── app.js       — Lógica, produtos, filtros, admin
└── README.md    — Este guia
```

---

## 🎨 Personalizar cores e estilo
Abra `style.css` e procure a secção `:root` no início:
```css
:root {
  --accent: #c8a96e;   /* cor dourada principal */
  --accent2: #e05c2a;  /* laranja para destaque */
  ...
}
```

---

*Feito com ❤️ para DERWIN — Beira, Sofala, Moçambique*
