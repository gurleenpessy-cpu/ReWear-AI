// ═══════════════════════════════════════════════
// MITHAI MANDIR - Sweet Shop Management System
// ═══════════════════════════════════════════════

// ─── PRODUCT DATA ───
const products = [
  { id:1, name:"Kaju Katli", desc:"Premium cashew fudge made with pure desi ghee", price:800, unit:"500g", category:"mithai", emoji:"🔶", bestseller:true },
  { id:2, name:"Gulab Jamun", desc:"Soft milk-solid balls soaked in rose-flavored sugar syrup", price:400, unit:"1kg", category:"mithai", emoji:"🟤", bestseller:true },
  { id:3, name:"Rasgulla", desc:"Spongy cottage cheese balls in light sugar syrup", price:350, unit:"1kg", category:"mithai", emoji:"⚪", bestseller:false },
  { id:4, name:"Soan Papdi", desc:"Flaky, melt-in-mouth sweet with cardamom flavor", price:300, unit:"500g", category:"mithai", emoji:"🟨", bestseller:false },
  { id:5, name:"Motichoor Ladoo", desc:"Tiny boondi balls shaped into perfect round ladoos", price:500, unit:"1kg", category:"mithai", emoji:"🟠", bestseller:true },
  { id:6, name:"Barfi Collection", desc:"Assorted barfi - Pista, Badam, Coconut, Chocolate", price:600, unit:"500g", category:"mithai", emoji:"🟫", bestseller:false },
  { id:7, name:"Jalebi", desc:"Crispy golden spirals soaked in saffron sugar syrup", price:250, unit:"500g", category:"mithai", emoji:"🌀", bestseller:true },
  { id:8, name:"Peda", desc:"Traditional milk sweet flavored with saffron & cardamom", price:450, unit:"500g", category:"mithai", emoji:"🟡", bestseller:false },
  { id:9, name:"Aloo Bhujia", desc:"Crispy thin potato noodles with authentic spices", price:200, unit:"500g", category:"namkeen", emoji:"🥨", bestseller:true },
  { id:10, name:"Moong Dal", desc:"Crunchy split moong dal seasoned with salt & spices", price:220, unit:"500g", category:"namkeen", emoji:"🫘", bestseller:false },
  { id:11, name:"Mixture", desc:"Classic mix of sev, peanuts, chivda and boondi", price:180, unit:"500g", category:"namkeen", emoji:"🥜", bestseller:false },
  { id:12, name:"Samosa (6 Pcs)", desc:"Crispy pastry filled with spiced potato & peas", price:150, unit:"6 pcs", category:"namkeen", emoji:"📐", bestseller:true },
  { id:13, name:"Kachori", desc:"Flaky fried bread stuffed with spiced moong dal", price:120, unit:"6 pcs", category:"namkeen", emoji:"🫓", bestseller:false },
  { id:14, name:"Chocolate Truffle Cake", desc:"Rich dark chocolate layered cake with ganache", price:900, unit:"1kg", category:"cake", emoji:"🎂", bestseller:true },
  { id:15, name:"Butterscotch Cake", desc:"Soft sponge cake with butterscotch cream & nuts", price:750, unit:"1kg", category:"cake", emoji:"🍰", bestseller:false },
  { id:16, name:"Pineapple Pastry (4 Pcs)", desc:"Fresh pineapple cream pastries with cherry topping", price:280, unit:"4 pcs", category:"cake", emoji:"🧁", bestseller:false },
  { id:17, name:"Premium Cashew", desc:"W240 grade whole cashews, lightly salted", price:1200, unit:"500g", category:"dryfruits", emoji:"🥜", bestseller:true },
  { id:18, name:"Badam (Almonds)", desc:"California almonds, premium quality", price:800, unit:"500g", category:"dryfruits", emoji:"🌰", bestseller:false },
  { id:19, name:"Pista (Pistachios)", desc:"Iranian pistachios, naturally opened, salted", price:1400, unit:"500g", category:"dryfruits", emoji:"🟢", bestseller:false },
  { id:20, name:"Mixed Dry Fruits Box", desc:"Gift box with cashew, almond, pista, raisin, fig", price:1800, unit:"1kg", category:"dryfruits", emoji:"🎁", bestseller:true },
];

// ─── CART STATE ───
let cart = JSON.parse(localStorage.getItem('mm_cart')) || [];

// ─── ORDERS STATE ───
let orders = JSON.parse(localStorage.getItem('mm_orders')) || [];

// ═══ INITIALIZATION ═══
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  updateCartUI();
  initNavbar();
});

// ─── NAVBAR SCROLL ───
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('active'));
  });
}

// ─── SMOOTH SCROLL ───
function scrollTo(sel) {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
}

// ═══ PRODUCTS ═══
function renderProducts(category) {
  const grid = document.getElementById('productsGrid');
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-category="${p.category}">
      <div class="product-img-wrap">
        <div class="product-img">${p.emoji}</div>
        ${p.bestseller ? '<span class="product-badge">⭐ Bestseller</span>' : ''}
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="desc">${p.desc}</p>
        <div class="product-meta">
          <div class="product-price">₹${p.price} <small>/ ${p.unit}</small></div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">Add +</button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProducts(category, el) {
  document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderProducts(category);
}

// ═══ CART ═══
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...product, qty: 1 }); }
  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart! 🛒`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('mm_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  countEl.textContent = totalItems;

  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    footerEl.style.display = 'none';
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'block';
  totalEl.textContent = `₹${getCartTotal().toLocaleString('en-IN')}`;

  itemsEl.innerHTML = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-img">${c.emoji}</div>
      <div class="cart-item-info">
        <h4>${c.name}</h4>
        <span class="ci-price">₹${c.price} × ${c.qty} = ₹${c.price * c.qty}</span>
      </div>
      <div class="cart-qty">
        <button onclick="updateQty(${c.id}, -1)">−</button>
        <span>${c.qty}</span>
        <button onclick="updateQty(${c.id}, 1)">+</button>
      </div>
      <button class="cart-remove" onclick="removeFromCart(${c.id})"><i class="fas fa-trash-alt"></i></button>
    </div>
  `).join('');
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

document.getElementById('cartToggle').addEventListener('click', toggleCart);

// ═══ CHECKOUT ═══
function openCheckout() {
  if (cart.length === 0) return;
  toggleCart();
  document.getElementById('orderModal').classList.add('show');
  document.getElementById('orderForm').style.display = 'block';
  document.getElementById('orderSuccess').style.display = 'none';
}

function closeModal() {
  document.getElementById('orderModal').classList.remove('show');
}

function placeOrder() {
  const name = document.getElementById('oName').value.trim();
  const phone = document.getElementById('oPhone').value.trim();
  const address = document.getElementById('oAddress').value.trim();

  if (!name || !phone || !address) {
    showToast('Please fill all required fields! ⚠️');
    return;
  }

  const order = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    customer: { name, phone, address },
    items: [...cart],
    total: getCartTotal(),
    payment: document.getElementById('oPayment').value,
    notes: document.getElementById('oNotes').value,
    status: 'Pending',
    date: new Date().toISOString()
  };

  orders.push(order);
  localStorage.setItem('mm_orders', JSON.stringify(orders));

  cart = [];
  saveCart();
  updateCartUI();

  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('orderSuccess').style.display = 'block';
  showToast(`Order ${order.id} placed successfully! 🎉`);
}

// ═══ CONTACT FORM ═══
function handleContact(e) {
  e.preventDefault();
  showToast('Message sent successfully! We will get back to you soon. ✅');
  e.target.reset();
}

// ═══ TOAST ═══
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Close modal on overlay click
document.getElementById('orderModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
