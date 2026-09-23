const PRODUCTS = [
  {id:1, name:'Real Madrid Away Kit', price:449, was:null, image:'images/1.webp', rating:3.9, color:'#b87a3d',
    shape:`<path d="M45 20 Q100 4 155 20 L165 220 Q100 236 35 220 Z" fill="{c}"/>
           <path d="M45 20 L20 90 L38 100 L60 45 Z" fill="{c}"/>
           <path d="M155 20 L180 90 L162 100 L140 45 Z" fill="{c}"/>
           <line x1="100" y1="30" x2="100" y2="210" stroke="#0d0c0b" stroke-width="2" opacity=".3"/>`},
  {id:2, name:'Real Madrid Home Kit', price:189, was:229, image:'images/2.webp', rating:4.3, color:'#5c6b4a',
    shape:`<path d="M50 25 Q100 8 150 25 L158 200 Q100 214 42 200 Z" fill="{c}"/>
           <path d="M50 25 L24 85 L44 95 L62 48 Z" fill="{c}"/>
           <path d="M150 25 L176 85 L156 95 L138 48 Z" fill="{c}"/>
           <line x1="60" y1="40" x2="60" y2="195" stroke="#0d0c0b" stroke-width="1.5" opacity=".25"/>
           <line x1="80" y1="35" x2="80" y2="205" stroke="#0d0c0b" stroke-width="1.5" opacity=".25"/>
           <line x1="120" y1="35" x2="120" y2="205" stroke="#0d0c0b" stroke-width="1.5" opacity=".25"/>
           <line x1="140" y1="40" x2="140" y2="195" stroke="#0d0c0b" stroke-width="1.5" opacity=".25"/>`},
  {id:3, name:'Real Madrid third Kit', price:119, was:null, image:'images/3.jpg', rating:3.6, color:'#3d5a7a',
    shape:`<path d="M52 22 Q100 6 148 22 L156 190 Q100 202 44 190 Z" fill="{c}"/>
           <path d="M52 22 L28 80 L46 90 L62 44 Z" fill="{c}"/>
           <path d="M148 22 L172 80 L154 90 L138 44 Z" fill="{c}"/>
           <path d="M78 22 L78 80" stroke="#0d0c0b" stroke-width="1.5" opacity=".3"/>
           <path d="M122 22 L122 80" stroke="#0d0c0b" stroke-width="1.5" opacity=".3"/>`},
  {id:4, name:'Bayern Munich Home Kit', price:159, was:null, image:'images/4.jpg', rating:4.4, color:'#6b7a4a',
    shape:`<path d="M55 30 Q100 14 145 30 L150 180 Q100 196 50 180 Z" fill="{c}"/>
           <path d="M55 30 L30 85 L48 95 L64 52 Z" fill="{c}"/>
           <path d="M145 30 L170 85 L152 95 L136 52 Z" fill="{c}"/>
           <ellipse cx="100" cy="30" rx="26" ry="9" fill="#e0654a" opacity=".7"/>`},
  {id:5, name:'Bayern Munich Away Kit', price:349, was:429, image:'images/5.jpg', rating:3.8, color:'#4a342a',
    shape:`<path d="M50 24 Q100 8 150 24 L158 195 Q100 208 42 195 Z" fill="{c}"/>
           <path d="M50 24 L26 82 L44 92 L60 46 Z" fill="{c}"/>
           <path d="M150 24 L174 82 L156 92 L140 46 Z" fill="{c}"/>
           <path d="M70 24 Q60 90 74 195" stroke="#000" stroke-width="2" opacity=".35" fill="none"/>`},
  {id:6, name:'Bayern Munich Third Kit', price:79, was:null, image:'images/54861_6.avif', rating:4.5, color:'#1f5c3d',
    shape:`<path d="M55 22 Q100 8 145 22 L152 175 Q100 188 48 175 Z" fill="{c}"/>
           <path d="M55 22 L30 60 L48 70 L64 40 Z" fill="{c}"/>
           <path d="M145 22 L170 60 L152 70 L136 40 Z" fill="{c}"/>
           <path d="M82 22 Q100 32 118 22 L118 40 Q100 48 82 40 Z" fill="#0d0c0b" opacity=".4"/>`},
];

const grid = document.getElementById('grid');
const wished = new Set();
const cart = { count: 0, total: 0 };
let activeFilter = 'all';

function svgIcon(p, size){
  return `<svg viewBox="0 0 200 320" width="${size}" height="${size}">${p.shape.replaceAll('{c}', p.color)}</svg>`;
}
// Shows the real photo from /images; if the file isn't there yet, falls back to the placeholder icon.
function productImg(p, size){
  return `<img src="${p.image}" alt="${p.name}" width="${size}" height="${size}"
            onerror="this.outerHTML=window.svgIconFallback(${p.id},${size})">`;
}
window.svgIconFallback = function(id, size){
  return svgIcon(PRODUCTS.find(pp=>pp.id===id), size);
};

function render(){
  const list = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.name.includes(activeFilter));
  grid.innerHTML = list.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="card-top">
        <button class="wish ${wished.has(p.id)?'active':''}" data-wish="${p.id}" title="Wishlist">${wished.has(p.id)?'♥':'♡'}</button>
        <div class="rating"><span class="star">★</span>${p.rating}</div>
      </div>
      <div class="garment-stage">
        ${productImg(p, 130)}
        <button class="add-overlay" data-bag="${p.id}">+ Add to cart</button>
      </div>
      <div class="card-info">
        <div>
          <h3 class="name">${p.name}</h3>
          <p class="price">$${p.price}${p.was?`<span class="was">$${p.was}</span><span class="sale-tag">Sale</span>`:''}</p>
        </div>
        <button class="bag-btn" data-bag="${p.id}" title="Add to bag">🛍</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-wish]').forEach(el=>{
    el.onclick = ()=>{
      const id = +el.dataset.wish;
      wished.has(id) ? wished.delete(id) : wished.add(id);
      render();
    };
  });
  document.querySelectorAll('[data-bag]').forEach(el=>{
    el.onclick = ()=>{
      const id = +el.dataset.bag;
      const p = PRODUCTS.find(pp=>pp.id===id);
      cart.count++;
      cart.total += p.price;
      document.getElementById('cartCount').textContent = cart.count;
      document.getElementById('cartTotal').textContent = '$' + cart.total;
    };
  });
}

render();

document.querySelectorAll('.filter-item').forEach(el=>{
  el.onclick = ()=>{
    activeFilter = el.dataset.filter;
    document.querySelectorAll('.filter-item').forEach(f=>f.classList.remove('active'));
    el.classList.add('active');
    render();
  };
});

document.getElementById('checkoutBtn').onclick = ()=>{
  document.getElementById('modalCount').textContent = cart.count;
  document.getElementById('modalTotal').textContent = '$' + cart.total;
  document.getElementById('checkoutModal').classList.add('open');
};
document.getElementById('modalClose').onclick = ()=>{
  document.getElementById('checkoutModal').classList.remove('open');
};
document.getElementById('cardNumber').addEventListener('input', (e)=>{
  let v = e.target.value.replace(/\D/g,'').slice(0,16);
  e.target.value = v.replace(/(.{4})/g,'$1 ').trim();
});
document.getElementById('cardExpiry').addEventListener('input', (e)=>{
  let v = e.target.value.replace(/\D/g,'').slice(0,4);
  if(v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = v;
});
document.getElementById('cardCvv').addEventListener('input', (e)=>{
  e.target.value = e.target.value.replace(/\D/g,'').slice(0,3);
});

document.getElementById('payBtn').onclick = ()=>{
  if(cart.count === 0){ alert('Your cart is empty.'); return; }
  const num = document.getElementById('cardNumber').value.replace(/\s/g,'');
  const exp = document.getElementById('cardExpiry').value;
  const cvv = document.getElementById('cardCvv').value;
  if(num.length !== 16){ alert('Enter a valid 16-digit card number.'); return; }
  if(!/^\d{2}\/\d{2}$/.test(exp)){ alert('Enter expiry as MM/YY.'); return; }
  if(cvv.length !== 3){ alert('Enter a valid 3-digit CVV.'); return; }
  alert('Payment successful! Total charged: $' + cart.total);
  cart.count = 0; cart.total = 0;
  document.getElementById('cartCount').textContent = 0;
  document.getElementById('cartTotal').textContent = '$0';
  document.getElementById('cardNumber').value = '';
  document.getElementById('cardExpiry').value = '';
  document.getElementById('cardCvv').value = '';
  document.getElementById('checkoutModal').classList.remove('open');
};