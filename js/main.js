document.addEventListener('DOMContentLoaded',()=>{
  // Manejo de formularios
  const loginForm=document.getElementById('loginForm');
  const registerForm=document.getElementById('registerForm');
  const pedidoForm=document.getElementById('pedidoForm');

  if(loginForm){
    loginForm.addEventListener('submit',e=>{
      e.preventDefault();
      alert('Bienvenido a la florería Josbet');
      window.location.href='menu.html';
    });
  }
  if(registerForm){
    registerForm.addEventListener('submit',e=>{
      e.preventDefault();
      alert('Cuenta creada. Bienvenido a la florería Josbet');
      window.location.href='menu.html';
    });
  }
  if(pedidoForm){
    pedidoForm.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(pedidoForm);
      const pedido=Object.fromEntries(data.entries());
      const pedidos=JSON.parse(localStorage.getItem('pedidos')||'[]');
      pedidos.push(pedido);
      localStorage.setItem('pedidos',JSON.stringify(pedidos));
      const summary=document.getElementById('pedidoSummary');
      summary.innerHTML=`<h3>Pedido guardado</h3><pre>${JSON.stringify(pedido,null,2)}</pre>`;
      pedidoForm.reset();
    });
  }

  // Carrito
  window.PRODUCTOS = {
    'Girasol eterno': 120,
    'Tulipanes eternos': 150,
    'Rosas eternas': 130,
    'Flor única 1': 60,
    'Flor única 2': 65,
    'Flor única 3': 70,
    'Ramo clásico': 200,
    'Ramo moderno': 250,
    'Ramo deluxe': 320
  };

  window.addToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let qty = 1;
    if(arguments.length > 1) {
      qty = Math.max(1,parseInt(arguments[1])||1);
    }
    let found = cart.find(item => item.name === product);
    if(found) found.qty += qty;
    else cart.push({name:product,qty:qty});
    localStorage.setItem('cart', JSON.stringify(cart));
    showCartMessage(product + ' añadido al carrito.');
    renderCart();
    animateCartIcon();
  }

  window.renderCart = function() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let cartList = document.getElementById('cart-list');
    let cartTotal = document.getElementById('cart-total');
    let cartCount = document.getElementById('cart-count');
    if(cartList && cartTotal){
      if(cart.length === 0) {
        cartList.innerHTML = '<p style="color:#888">El carrito está vacío.</p>';
        cartTotal.textContent = '';
        if(cartCount) cartCount.textContent = '0';
        return;
      }
      let html = '<table style="width:100%;border-collapse:collapse;">';
      html += '<tr><th style="text-align:left;">Producto</th><th>Cantidad</th><th>Precio</th><th>Eliminar</th></tr>';
      let total = 0;
      let count = 0;
      cart.forEach((item,i)=>{
        let precio = window.PRODUCTOS[item.name] || 0;
        total += precio * item.qty;
        count += item.qty;
        html += `<tr><td>${item.name}</td><td>${item.qty}</td><td>$${precio*item.qty}</td><td><button class='btn' style='padding:2px 8px;font-size:0.9em;' onclick='removeFromCart(${i})'>✖</button></td></tr>`;
      });
      html += '</table>';
      cartList.innerHTML = html;
      cartTotal.textContent = 'Total: $' + total;
      if(cartCount) cartCount.textContent = count;
    }
  }

  window.removeFromCart = function(idx) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(idx,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }

  window.clearCart = function() {
    localStorage.removeItem('cart');
    renderCart();
  }

  window.showCartMessage = function(msg) {
    const el = document.getElementById('cart-message');
    if(el){
      el.textContent = msg;
      el.style.opacity = 1;
      setTimeout(()=>{
        el.style.opacity = 0;
      }, 1800);
    }
  }

  window.animateCartIcon = function() {
    const el = document.getElementById('cart-count');
    if(el){
      el.style.transform = 'scale(1.3)';
      setTimeout(()=>{el.style.transform = 'scale(1)';},400);
    }
  }

  window.finalizeCart = function() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if(cart.length === 0){
      showCartMessage('El carrito está vacío.');
      return;
    }
    localStorage.removeItem('cart');
    renderCart();
    showCartMessage('¡Compra finalizada! Gracias por tu pedido.');
  }

  // Renderizar carrito al cargar
  renderCart();
});
});
