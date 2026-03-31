/* ===========================
   DERWIN — app.js
   =========================== */

/* ---- WHATSAPP NUMBER ----
   Mude o número abaixo para o seu número real do WhatsApp
   Formato: código do país + número (sem + ou espaços)
   Exemplo Moçambique: 258841234567  */
const WA_NUMBER = "258841234567";

/* =============================
   PRODUTOS DE EXEMPLO
   Substitua/adicione os seus produtos aqui.
   Para adicionar facilmente use o painel ⚙ no canto inferior direito.
   ============================= */
const defaultProducts = [
  {
    id: 1,
    name: "Air Classic Low",
    category: "unissex",
    price: 4500,
    desc: "Sapatilha clássica com sola de borracha de alta durabilidade. Cabedal em couro sintético macio, palmilha acolchoada para máximo conforto durante todo o dia. Disponível em várias cores.",
    sizes: ["37","38","39","40","41","42","43","44"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    badge: "novo"
  },
  {
    id: 2,
    name: "Urban Runner Pro",
    category: "masculino",
    price: 5800,
    desc: "Sapatilha de corrida urbana com tecnologia de amortecimento avançado. Mesh respirável no cabedal, sola com ranhuras para aderência em qualquer superfície. Ideal para corrida e uso diário.",
    sizes: ["39","40","41","42","43","44","45"],
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    badge: ""
  },
  {
    id: 3,
    name: "Glam Step",
    category: "feminino",
    price: 3900,
    desc: "Sapatilha feminina elegante com detalhes dourados. Perfeita para combinar com looks casuais ou semi-formais. Conforto e estilo para qualquer ocasião.",
    sizes: ["35","36","37","38","39","40"],
    img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    badge: "promo"
  },
  {
    id: 4,
    name: "Street Legends HI",
    category: "masculino",
    price: 6200,
    desc: "Bota/sapatilha cano alto estilo streetwear. Construção robusta em couro genuíno, atacadores resistentes e sola vulcanizada. O favorito dos amantes de cultura urbana.",
    sizes: ["40","41","42","43","44"],
    img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80",
    badge: "novo"
  },
  {
    id: 5,
    name: "Soft Steps",
    category: "feminino",
    price: 3200,
    desc: "Sapatilha leve e respirável ideal para o calor moçambicano. Interior super macio, biqueira arredondada e design minimalista. Entra e sai com facilidade.",
    sizes: ["35","36","37","38","39"],
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    badge: ""
  },
  {
    id: 6,
    name: "Retro Court",
    category: "unissex",
    price: 4100,
    desc: "Inspirada nas sapatilhas de ténis dos anos 80. Silhueta clássica, cores vibrantes e materiais de alta qualidade. Um ícone atemporal que combina com tudo.",
    sizes: ["36","37","38","39","40","41","42","43"],
    img: "https://images.unsplash.com/photo-1603787081207-362bcef7c144?w=600&q=80",
    badge: ""
  }
];

/* ===========================
   STATE
   =========================== */
let products = [];
const STORAGE_KEY = "derwin_products";

function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      products = JSON.parse(saved);
    } else {
      products = [...defaultProducts];
      saveProducts();
    }
  } catch (e) {
    products = [...defaultProducts];
  }
}

function saveProducts() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(products)); } catch(e){}
}

/* ===========================
   RENDER
   =========================== */
let currentFilter = "all";

function formatPrice(p) {
  return "MT " + Number(p).toLocaleString("pt-MZ");
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const filtered = currentFilter === "all"
    ? products
    : products.filter(p => p.category === currentFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state">
      <div class="big">👟</div>
      <p>Nenhuma sapatilha nesta categoria ainda.<br/>Use o painel ⚙ para adicionar produtos.</p>
    </div>`;
    return;
  }

  filtered.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${i * 0.06}s`;
    card.dataset.id = p.id;

    let badgeHTML = "";
    if (p.badge === "novo")     badgeHTML = `<span class="card-badge badge-novo">Novo</span>`;
    if (p.badge === "promo")    badgeHTML = `<span class="card-badge badge-promo">Promoção</span>`;
    if (p.badge === "esgotado") badgeHTML = `<span class="card-badge badge-esgotado">Esgotado</span>`;

    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${p.img || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'}"
             alt="${p.name}"
             loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'"/>
        ${badgeHTML}
      </div>
      <div class="card-body">
        <p class="card-cat">${catLabel(p.category)}</p>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-footer">
          <span class="card-price">${formatPrice(p.price)}</span>
          <span class="card-cta">Ver mais →</span>
        </div>
      </div>`;

    card.addEventListener("click", () => openModal(p));
    grid.appendChild(card);
  });
}

function catLabel(c) {
  return { masculino: "Masculino", feminino: "Feminino", unissex: "Unissex" }[c] || c;
}

/* ===========================
   FILTER
   =========================== */
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderProducts();
  });
});

/* ===========================
   MODAL
   =========================== */
function openModal(p) {
  document.getElementById("modalImg").src = p.img || "";
  document.getElementById("modalImg").alt = p.name;
  document.getElementById("modalCat").textContent = catLabel(p.category);
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalPrice").textContent = formatPrice(p.price);
  document.getElementById("modalDesc").textContent = p.desc;

  const sizesEl = document.getElementById("modalSizes");
  sizesEl.innerHTML = (p.sizes || []).map(s =>
    `<span class="size-chip">${s}</span>`
  ).join("");

  const badgeEl = document.getElementById("modalBadge");
  badgeEl.className = "modal-badge";
  badgeEl.textContent = "";
  if (p.badge === "novo")     { badgeEl.classList.add("badge-novo"); badgeEl.textContent = "Novo"; }
  if (p.badge === "promo")    { badgeEl.classList.add("badge-promo"); badgeEl.textContent = "Promoção"; }
  if (p.badge === "esgotado") { badgeEl.classList.add("badge-esgotado"); badgeEl.textContent = "Esgotado"; }

  const msg = `Olá DERWIN! Tenho interesse nas sapatilhas *${p.name}* (${formatPrice(p.price)}). Podem informar sobre disponibilidade?`;
  document.getElementById("modalWA").href =
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", e => {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ===========================
   ADMIN PANEL
   =========================== */
const adminPanel = document.getElementById("adminPanel");

document.getElementById("adminToggle").addEventListener("click", () => {
  adminPanel.classList.toggle("open");
  renderAdminList();
});
document.getElementById("adminClose").addEventListener("click", () => {
  adminPanel.classList.remove("open");
});

document.getElementById("addProductBtn").addEventListener("click", () => {
  const name  = document.getElementById("aName").value.trim();
  const cat   = document.getElementById("aCat").value;
  const price = document.getElementById("aPrice").value;
  const desc  = document.getElementById("aDesc").value.trim();
  const sizes = document.getElementById("aSizes").value.split(",").map(s => s.trim()).filter(Boolean);
  const img   = document.getElementById("aImg").value.trim();
  const badge = document.getElementById("aStatus").value;

  if (!name || !price) {
    alert("Por favor preencha pelo menos o Nome e o Preço.");
    return;
  }

  const newProduct = {
    id: Date.now(),
    name, category: cat, price: Number(price),
    desc, sizes, img, badge
  };

  products.unshift(newProduct);
  saveProducts();
  renderProducts();
  renderAdminList();

  // clear form
  ["aName","aPrice","aDesc","aSizes","aImg"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("aStatus").value = "";

  const ok = document.getElementById("adminSuccess");
  ok.style.display = "block";
  setTimeout(() => ok.style.display = "none", 3000);
});

function renderAdminList() {
  const list = document.getElementById("adminList");
  if (products.length === 0) { list.innerHTML = ""; return; }
  list.innerHTML = `<p style="font-family:var(--font-mono);font-size:.62rem;letter-spacing:.14em;color:var(--gray);text-transform:uppercase;margin-bottom:.5rem;">Produtos (${products.length})</p>`;
  products.forEach(p => {
    const item = document.createElement("div");
    item.className = "admin-item";
    item.innerHTML = `
      <img class="admin-item-img" src="${p.img || ''}"
           alt="${p.name}"
           onerror="this.style.background='#2a2a2a'"/>
      <span class="admin-item-name">${p.name} — ${formatPrice(p.price)}</span>
      <button class="admin-item-del" data-id="${p.id}" title="Remover">🗑</button>`;
    item.querySelector(".admin-item-del").addEventListener("click", e => {
      e.stopPropagation();
      if (confirm(`Remover "${p.name}"?`)) {
        products = products.filter(x => x.id !== p.id);
        saveProducts();
        renderProducts();
        renderAdminList();
      }
    });
    list.appendChild(item);
  });
}

/* ===========================
   NAV SCROLL
   =========================== */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

/* ===========================
   MOBILE MENU
   =========================== */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
function closeMobile() { mobileMenu.classList.remove("open"); }

/* ===========================
   CONTACT FORM
   =========================== */
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const success = document.getElementById("formSuccess");
  success.style.display = "block";
  e.target.reset();
  setTimeout(() => success.style.display = "none", 5000);
});

/* ===========================
   INIT
   =========================== */
loadProducts();
renderProducts();
