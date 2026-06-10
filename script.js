// ===== PRODUTOS =====
const products = [
  // CREMOSOS
  {
    id: 1,
    category: "cremoso",
    name: "Licor Amendoim",
    desc: "O queridinho das festas! A combinação perfeita entre o sabor marcante do amendoim torrado e uma cremosidade irresistível. Um verdadeiro clássico junino em cada gole.",
    price: 35.00,
    img: "./assets/amendoim-cremoso.png"
  },
  {
    id: 2,
    category: "cremoso",
    name: "Licor de Cacau",
    desc: "OSofisticação artesanal. Feito com a essência do cacau, este licor traz notas profundas e delicadas. Uma experiência refinada para quem aprecia o sabor autêntico do fruto.",
    price: 35.00,
    img: "./assets/cacau-cremoso.png"
  },
  {
    id: 3,
    category: "cremoso",
    name: "Licor de Chocolate",
    desc: "Intensidade e doçura. Um licor encorpado com o sabor puro do cacau, equilibrado para oferecer uma textura aveludada e um final de boca absolutamente delicioso.",
    price: 35.00,
    img: "./assets/chocolate-cremoso.png"
  },
  {
    id: 4,
    category: "cremoso",
    name: "Licor de Coco",
    desc: "Sabor tropical e suave. A doçura natural do coco combinada com uma textura cremosa que derrete na boca. Leve, refrescante e impossível de tomar apenas um.",
    price: 35.00,
    img: "./assets/coco-cremoso.png"
  },
  {
    id: 5,
    category: "cremoso",
    name: "Licor de Maracujá",
    desc: "O equilíbrio do azedinho. A fruta tropical encontra a cremosidade, criando um licor vibrante que surpreende pelo equilíbrio entre o doce e o cítrico. Perfeito para paladares que buscam frescor.",
    price: 35.00,
    img: "./assets/maracuja-cremoso.png"
  },
  {
    id: 6,
    category: "cremoso",
    name: "Licor de Tamarindo",
    desc: "Um toque exótico e especial. O sabor único e inconfundível do tamarindo traz uma personalidade marcante a este licor, com um toque agridoce que conquista quem prova.",
    price: 35.00,
    img: "./assets/tamarindo-cremoso.png"
  },

  // TRADICIONAIS
  {
    id: 7,
    category: "tradicional",
    name: "Licor de cacau",
    desc: "A essência do fruto. Um licor de sabor profundo e marcante, que ressalta a complexidade do cacau puro. Uma escolha clássica para quem aprecia o equilíbrio entre a força do fruto e um final de boca aveludado.",
    price: 25.00,
    img: "./assets/cacau-tra.png"
  },
  {
    id: 8,
    category: "tradicional",
    name: "Licor de Jenipapo",
    desc: "O sabor do interior. Uma das pérolas da nossa doçaria artesanal. O jenipapo confere a este licor uma cor e um aroma inconfundíveis, com um sabor autêntico e persistente que celebra a nossa cultura.",
    price: 25.00,
    img: "./assets/jenipapo-tra.png"
  },
  {
    id: 9,
    category: "tradicional",
    name: "Licor de limão",
    desc: "Refrescância e vivacidade. Com um aroma cítrico e vibrante, este licor é a definição de equilíbrio. Limpo, leve e extremamente refrescante, é a dose perfeita para limpar o paladar e encerrar uma refeição com elegância.",
    price: 25.00,
    img: "./assets/limao-tra.png"
  },
  {
    id: 10,
    category: "tradicional",
    name: "Licor de Rola",
    desc: "O calor das especiarias. Uma receita que abraça o paladar. A união aromática do cravo e da canela cria um licor quente, perfumado e reconfortante. É a escolha ideal para noites frias ou para quem busca um sabor mais intenso e especiado.",
    price: 25.00,
    img: "./assets/rola.png"
  },
  {
    id: 11,
    category: "tradicional",
    name: "Licor de Tamarindo",
    desc: "Personalidade agridoce. Um licor exótico e inesquecível. O tamarindo traz uma acidez característica que harmoniza perfeitamente com a doçura do licor, resultando em uma bebida de sabor único, complexo e extremamente viciante.",
    price: 25.00,
    img: "./assets/tamarindo-tra.png"
  },
];

// ===== CARRINHO =====
// CORREÇÃO: Agora ele tenta buscar o que estava salvo. Se não achar nada, começa vazio [].
let cart = JSON.parse(localStorage.getItem("meuCarrinho")) || [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(i => i.id === productId);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
  showToast(`🍊 ${product.name} adicionado!`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  renderCart();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function getTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function renderCart() {
  // ADICIONADO: Sempre que o carrinho for renderizado, ele salva a versão mais atualizada na memória
  localStorage.setItem("meuCarrinho", JSON.stringify(cart));

  const container = document.getElementById("cart-items");
  const footer = document.getElementById("cart-footer");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");

  // Garante que o contador de itens e a estrutura funcionem mesmo se os elementos não existirem nessa aba específica
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  if (countEl) countEl.textContent = totalItems;

  if (cart.length === 0) {
    if (container) container.innerHTML = `<p class="cart-empty">Seu carrinho está vazio.</p>`;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";
  if (totalEl) totalEl.textContent = `R$ ${getTotal().toFixed(2).replace(".", ",")}`;

  if (container) {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace(".", ",")}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
        </div>
      </div>
    `).join("");
  }
}

// ADICIONADO: Executa a renderização assim que o arquivo carrega para mostrar os itens salvos nas outras abas
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

// ===== CARRINHO TOGGLE =====
function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  const isOpen = drawer.classList.contains("open");

  if (isOpen) {
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  } else {
    drawer.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

// ===== WHATSAPP =====
function sendWhatsApp() {
  if (cart.length === 0) return;

  const paymentMethod =
    document.getElementById("payment-method")?.value || "Não informado";

  let msg = "*Pedido — Licor da Santa*\n";
    msg += `*Retirada:* Rua Nélio Gomes, Nº 96, Santa Inês - Ba \n\n`;
 
  cart.forEach(item => {
    msg += `• ${item.qty}x ${item.name} — R$ ${(item.price * item.qty)
      .toFixed(2)
      .replace(".", ",")}\n`;
  });

  msg += `\n*Total: R$ ${getTotal()
    .toFixed(2)
    .replace(".", ",")}*`;


  msg += `\n*Forma de pagamento:* ${paymentMethod}`;

  if (paymentMethod === "PIX") {
    msg +=
      "\n\nOlá! Gostaria de realizar este pedido e receber a chave PIX para efetuar o pagamento.";
  } else if (paymentMethod === "Dinheiro") {
    msg +=
      "\n\nOlá! Gostaria de realizar este pedido e farei o pagamento em dinheiro.";
  } else {
    msg +=
      "\n\nOlá! Gostaria de realizar este pedido e farei o pagamento no cartão.";
  }

 

  const whatsappNumber = "5573988920953";

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");
}
// ===== FILTRO DE CATEGORIA =====
function filterCategory(category, btn) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");

  const grid = document.getElementById("products-grid");
  const filtered = category === "todos" ? products : products.filter(p => p.category === category);
  renderProducts(filtered, grid);
}

// ===== RENDERIZAR PRODUTOS =====
function renderProducts(list, container) {
  container.innerHTML = list.map(p => {
    const isCremoso = p.category === "cremoso";
    const badgeClass = isCremoso ? "badge-cremoso" : "badge-tradicional";
    const badgeLabel = isCremoso ? "🍦 Cremoso" : "🍶 Tradicional";

    return `
      <div class="product-card">
        <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="product-info">
          <span class="product-badge ${badgeClass}">${badgeLabel}</span>
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-footer">
            <div class="product-price">
              R$ ${p.price.toFixed(2).replace(".", ",")}
              <span>/Litro</span>
            </div>
            <button class="btn-add" onclick="addToCart(${p.id})">
              + Adicionar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// ===== TOAST =====
function showToast(msg) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===== NAVBAR SCROLL =====
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  nav.style.background = window.scrollY > 50
    ? "rgba(26,8,0,0.97)"
    : "rgba(26,8,0,0.85)";
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // 1. Buscamos o elemento primeiro
  const grid = document.getElementById("products-grid");
  
  // 2. Só chamamos a função se o elemento existir na página
  if (grid) {
    renderProducts(products, grid);
  }

  // 3. Renderiza o carrinho
  renderCart();
});