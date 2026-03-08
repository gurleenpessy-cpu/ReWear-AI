// ═══════════════════════════════════════════
// ADMIN DASHBOARD - मिठाई मंदिर
// ═══════════════════════════════════════════

// ─── DATA ───
let orders = JSON.parse(localStorage.getItem('mm_orders')) || [];
let inventory = JSON.parse(localStorage.getItem('mm_inventory')) || {};
let editingProductId = null;

const products = [
    { id: 1, name: "Kaju Katli", price: 800, unit: "500g", category: "mithai", emoji: "🔶", bestseller: true },
    { id: 2, name: "Gulab Jamun", price: 400, unit: "1kg", category: "mithai", emoji: "🟤", bestseller: true },
    { id: 3, name: "Rasgulla", price: 350, unit: "1kg", category: "mithai", emoji: "⚪" },
    { id: 4, name: "Soan Papdi", price: 300, unit: "500g", category: "mithai", emoji: "🟨" },
    { id: 5, name: "Motichoor Ladoo", price: 500, unit: "1kg", category: "mithai", emoji: "🟠", bestseller: true },
    { id: 6, name: "Barfi Collection", price: 600, unit: "500g", category: "mithai", emoji: "🟫" },
    { id: 7, name: "Jalebi", price: 250, unit: "500g", category: "mithai", emoji: "🌀", bestseller: true },
    { id: 8, name: "Peda", price: 450, unit: "500g", category: "mithai", emoji: "🟡" },
    { id: 9, name: "Aloo Bhujia", price: 200, unit: "500g", category: "namkeen", emoji: "🥨", bestseller: true },
    { id: 10, name: "Moong Dal", price: 220, unit: "500g", category: "namkeen", emoji: "🫘" },
    { id: 11, name: "Mixture", price: 180, unit: "500g", category: "namkeen", emoji: "🥜" },
    { id: 12, name: "Samosa (6 Pcs)", price: 150, unit: "6 pcs", category: "namkeen", emoji: "📐", bestseller: true },
    { id: 13, name: "Kachori", price: 120, unit: "6 pcs", category: "namkeen", emoji: "🫓" },
    { id: 14, name: "Chocolate Truffle Cake", price: 900, unit: "1kg", category: "cake", emoji: "🎂", bestseller: true },
    { id: 15, name: "Butterscotch Cake", price: 750, unit: "1kg", category: "cake", emoji: "🍰" },
    { id: 16, name: "Pineapple Pastry (4 Pcs)", price: 280, unit: "4 pcs", category: "cake", emoji: "🧁" },
    { id: 17, name: "Premium Cashew", price: 1200, unit: "500g", category: "dryfruits", emoji: "🥜", bestseller: true },
    { id: 18, name: "Badam (Almonds)", price: 800, unit: "500g", category: "dryfruits", emoji: "🌰" },
    { id: 19, name: "Pista (Pistachios)", price: 1400, unit: "500g", category: "dryfruits", emoji: "🟢" },
    { id: 20, name: "Mixed Dry Fruits Box", price: 1800, unit: "1kg", category: "dryfruits", emoji: "🎁", bestseller: true },
];

// Initialize inventory
products.forEach(p => {
    if (!inventory[p.id]) inventory[p.id] = { stock: Math.floor(Math.random() * 150) + 50, sold: Math.floor(Math.random() * 200) };
});
localStorage.setItem('mm_inventory', JSON.stringify(inventory));

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('adminDate').textContent = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    refreshAll();
});

function refreshAll() {
    orders = JSON.parse(localStorage.getItem('mm_orders')) || [];
    renderDashboard();
    renderOrders();
    renderProducts();
    renderInventory();
    renderCustomers();
}

// ═══ TAB SWITCHING ═══
function switchTab(tab, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    el.classList.add('active');
    const titles = { dashboard: '📊 Dashboard', orders: '📋 Orders', products: '🍬 Products', inventory: '📦 Inventory', customers: '👥 Customers' };
    document.getElementById('pageTitle').textContent = titles[tab] || tab;
    document.getElementById('sidebar').classList.remove('open');
}

// ═══ DASHBOARD ═══
function renderDashboard() {
    document.getElementById('totalOrders').textContent = orders.length;
    const rev = orders.reduce((s, o) => s + (o.status !== 'Cancelled' ? o.total : 0), 0);
    document.getElementById('totalRevenue').textContent = '₹' + rev.toLocaleString('en-IN');
    document.getElementById('totalProducts').textContent = products.length;
    const uniqueCustomers = [...new Set(orders.map(o => o.customer.phone))];
    document.getElementById('totalCustomers').textContent = uniqueCustomers.length;
    document.getElementById('orderBadge').textContent = orders.filter(o => o.status === 'Pending').length;

    // Recent orders
    const recent = document.getElementById('recentOrders');
    if (orders.length === 0) { recent.innerHTML = '<p class="empty-state">No orders yet. Orders from the shop will appear here.</p>'; }
    else {
        const last5 = orders.slice(-5).reverse();
        recent.innerHTML = `<table class="data-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead><tbody>
      ${last5.map(o => `<tr><td>${o.id}</td><td>${o.customer.name}</td><td>₹${o.total.toLocaleString('en-IN')}</td><td><span class="status-badge status-${o.status}">${o.status}</span></td></tr>`).join('')}
    </tbody></table>`;
    }

    // Top products
    const salesCount = {};
    orders.forEach(o => o.items.forEach(i => { salesCount[i.id] = (salesCount[i.id] || 0) + i.qty; }));
    const top = Object.entries(salesCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topEl = document.getElementById('topProducts');
    if (top.length === 0) {
        topEl.innerHTML = '<p class="empty-state">Sales data will appear here</p>';
    } else {
        topEl.innerHTML = top.map(([id, qty]) => {
            const p = products.find(pr => pr.id == id);
            return p ? `<div class="top-product-item"><span class="tp-emoji">${p.emoji}</span><span class="tp-name">${p.name}</span><span class="tp-sales">${qty} sold</span></div>` : '';
        }).join('');
    }
}

// ═══ ORDERS ═══
function renderOrders() {
    const filter = document.getElementById('orderFilter')?.value || 'all';
    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
    const el = document.getElementById('ordersTable');

    if (filtered.length === 0) { el.innerHTML = '<p class="empty-state">No orders found</p>'; return; }

    el.innerHTML = `<table class="data-table"><thead><tr><th>Order ID</th><th>Customer</th><th>Phone</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${filtered.slice().reverse().map(o => `<tr>
      <td><strong>${o.id}</strong><br><small style="color:rgba(255,255,255,0.3)">${new Date(o.date).toLocaleDateString('en-IN')}</small></td>
      <td>${o.customer.name}</td>
      <td>${o.customer.phone}</td>
      <td>${o.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</td>
      <td><strong>₹${o.total.toLocaleString('en-IN')}</strong></td>
      <td>${o.payment}</td>
      <td><span class="status-badge status-${o.status}">${o.status}</span></td>
      <td>
        ${o.status === 'Pending' ? `<button class="action-btn" onclick="updateOrderStatus('${o.id}','Confirmed')">✅ Confirm</button>` : ''}
        ${o.status === 'Confirmed' ? `<button class="action-btn" onclick="updateOrderStatus('${o.id}','Delivered')">🚚 Deliver</button>` : ''}
        ${o.status !== 'Cancelled' && o.status !== 'Delivered' ? `<button class="action-btn danger" onclick="updateOrderStatus('${o.id}','Cancelled')">❌</button>` : ''}
      </td>
    </tr>`).join('')}
  </tbody></table>`;
}

function updateOrderStatus(id, status) {
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = status;
        localStorage.setItem('mm_orders', JSON.stringify(orders));
        refreshAll();
        showToast(`Order ${id} → ${status} ✅`);
    }
}

// ═══ PRODUCTS ═══
function renderProducts() {
    const el = document.getElementById('productsTable');
    el.innerHTML = `<table class="data-table"><thead><tr><th></th><th>Name</th><th>Category</th><th>Price</th><th>Unit</th><th>Stock</th><th>Actions</th></tr></thead><tbody>
    ${products.map(p => {
        const stock = inventory[p.id]?.stock || 0;
        return `<tr>
        <td style="font-size:1.5rem">${p.emoji}</td>
        <td><strong>${p.name}</strong>${p.bestseller ? ' ⭐' : ''}</td>
        <td style="text-transform:capitalize">${p.category}</td>
        <td>₹${p.price}</td>
        <td>${p.unit}</td>
        <td>${stock}</td>
        <td>
          <button class="action-btn" onclick="editProduct(${p.id})">✏️ Edit</button>
          <button class="action-btn danger" onclick="deleteProduct(${p.id})">🗑️</button>
        </td>
      </tr>`;
    }).join('')}
  </tbody></table>`;
}

function openProductModal() {
    editingProductId = null;
    document.getElementById('pmTitle').textContent = 'Add New Product';
    ['pmName', 'pmDesc', 'pmPrice', 'pmUnit', 'pmEmoji'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('pmStock').value = 100;
    document.getElementById('productModal').classList.add('show');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

function editProduct(id) {
    const p = products.find(pr => pr.id === id);
    if (!p) return;
    editingProductId = id;
    document.getElementById('pmTitle').textContent = 'Edit Product';
    document.getElementById('pmName').value = p.name;
    document.getElementById('pmDesc').value = p.desc || '';
    document.getElementById('pmPrice').value = p.price;
    document.getElementById('pmUnit').value = p.unit;
    document.getElementById('pmCategory').value = p.category;
    document.getElementById('pmEmoji').value = p.emoji;
    document.getElementById('pmStock').value = inventory[p.id]?.stock || 0;
    document.getElementById('productModal').classList.add('show');
}

function saveProduct() {
    const name = document.getElementById('pmName').value.trim();
    const price = parseInt(document.getElementById('pmPrice').value);
    if (!name || !price) { showToast('Please fill required fields ⚠️'); return; }

    if (editingProductId) {
        const p = products.find(pr => pr.id === editingProductId);
        if (p) {
            p.name = name;
            p.price = price;
            p.unit = document.getElementById('pmUnit').value || p.unit;
            p.category = document.getElementById('pmCategory').value;
            p.emoji = document.getElementById('pmEmoji').value || p.emoji;
            inventory[p.id] = { ...inventory[p.id], stock: parseInt(document.getElementById('pmStock').value) || 0 };
            showToast('Product updated! ✅');
        }
    } else {
        const newId = Math.max(...products.map(p => p.id)) + 1;
        const newProduct = {
            id: newId,
            name,
            desc: document.getElementById('pmDesc').value,
            price,
            unit: document.getElementById('pmUnit').value || '500g',
            category: document.getElementById('pmCategory').value,
            emoji: document.getElementById('pmEmoji').value || '🍬',
            bestseller: false
        };
        products.push(newProduct);
        inventory[newId] = { stock: parseInt(document.getElementById('pmStock').value) || 100, sold: 0 };
        showToast('Product added! 🎉');
    }

    localStorage.setItem('mm_inventory', JSON.stringify(inventory));
    closeProductModal();
    refreshAll();
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const idx = products.findIndex(p => p.id === id);
    if (idx > -1) { products.splice(idx, 1); delete inventory[id]; }
    localStorage.setItem('mm_inventory', JSON.stringify(inventory));
    refreshAll();
    showToast('Product deleted 🗑️');
}

// ═══ INVENTORY ═══
function renderInventory() {
    const el = document.getElementById('inventoryTable');
    el.innerHTML = `<table class="data-table"><thead><tr><th></th><th>Product</th><th>Stock</th><th>Stock Level</th><th>Sold</th><th>Actions</th></tr></thead><tbody>
    ${products.map(p => {
        const inv = inventory[p.id] || { stock: 0, sold: 0 };
        const pct = Math.min(inv.stock / 200 * 100, 100);
        const cls = pct > 50 ? 'stock-high' : pct > 20 ? 'stock-medium' : 'stock-low';
        return `<tr>
        <td style="font-size:1.5rem">${p.emoji}</td>
        <td><strong>${p.name}</strong></td>
        <td>${inv.stock} units</td>
        <td><div class="stock-bar"><div class="stock-bar-fill ${cls}" style="width:${pct}%"></div></div></td>
        <td>${inv.sold} sold</td>
        <td>
          <button class="action-btn" onclick="adjustStock(${p.id}, 50)">+50</button>
          <button class="action-btn" onclick="adjustStock(${p.id}, -10)">-10</button>
        </td>
      </tr>`;
    }).join('')}
  </tbody></table>`;
}

function adjustStock(id, amount) {
    if (!inventory[id]) inventory[id] = { stock: 0, sold: 0 };
    inventory[id].stock = Math.max(0, inventory[id].stock + amount);
    localStorage.setItem('mm_inventory', JSON.stringify(inventory));
    refreshAll();
    showToast(`Stock updated: ${amount > 0 ? '+' : ''}${amount} units`);
}

// ═══ CUSTOMERS ═══
function renderCustomers() {
    const el = document.getElementById('customersTable');
    if (orders.length === 0) { el.innerHTML = '<p class="empty-state">No customers yet</p>'; return; }

    const customerMap = {};
    orders.forEach(o => {
        const key = o.customer.phone;
        if (!customerMap[key]) { customerMap[key] = { ...o.customer, orders: 0, spent: 0 }; }
        customerMap[key].orders++;
        customerMap[key].spent += o.total;
    });

    const customers = Object.values(customerMap).sort((a, b) => b.spent - a.spent);

    el.innerHTML = `<table class="data-table"><thead><tr><th>Name</th><th>Phone</th><th>Address</th><th>Orders</th><th>Total Spent</th></tr></thead><tbody>
    ${customers.map(c => `<tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.phone}</td>
      <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.address}</td>
      <td>${c.orders}</td>
      <td><strong>₹${c.spent.toLocaleString('en-IN')}</strong></td>
    </tr>`).join('')}
  </tbody></table>`;
}

// ═══ TOAST ═══
function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// Modal close on overlay
document.getElementById('productModal').addEventListener('click', function (e) {
    if (e.target === this) closeProductModal();
});
