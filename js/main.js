(function(){
  var s = window.SITE || {};
  
  // Year in footer
  var y = document.getElementById('year'); 
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
  var btn = document.querySelector('.menu'), nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function(){
      var open = nav.classList.toggle('open'); 
      btn.setAttribute('aria-expanded', open);
    });
  }

  // Dynamic site config bindings
  document.querySelectorAll('[data-site]').forEach(function(el){
    var k = el.getAttribute('data-site'), v = s[k]; 
    if (!v) return;
    if (k === 'email') { 
      el.href = 'mailto:' + v; 
      if (el.hasAttribute('data-text')) el.textContent = v; 
    } else if (k === 'whatsapp') { 
      el.href = 'https://wa.me/' + String(v).replace(/\D/g, ''); 
    } else { 
      el.href = v; 
    }
    el.classList.add('on');
  });

  // Auto-format .stack text into sleek .pill tags
  document.querySelectorAll('.stack').forEach(function(el){
    if (el.children.length === 0) {
      var tags = el.textContent.split('·').map(function(t){ return t.trim(); }).filter(Boolean);
      el.innerHTML = tags.map(function(t){ return '<span class="pill">' + t + '</span>'; }).join('');
    }
  });

  // --- React Bits: Spotlight Card Effect ---
  document.querySelectorAll('.card').forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
    card.addEventListener('mouseleave', function(){
      card.style.setProperty('--mouse-x', '-999px');
      card.style.setProperty('--mouse-y', '-999px');
    });
  });

  // --- React Bits: Magnetic Button Effect ---
  document.querySelectorAll('.btn:not(.ghost)').forEach(function(b){
    b.addEventListener('mousemove', function(e){
      var rect = b.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      b.style.transform = 'translate(' + (x * 0.22) + 'px, ' + (y * 0.22) + 'px)';
    });
    b.addEventListener('mouseleave', function(){
      b.style.transform = 'translate(0px, 0px)';
    });
  });

  // --- React Bits: Decrypted Text Animation ---
  var eyebrow = document.querySelector('.eyebrow');
  if (eyebrow) {
    var targetText = eyebrow.textContent;
    var chars = '!<>-_\\/[]{}—=+*^?#________';
    var iteration = 0;
    var timer = setInterval(function(){
      eyebrow.textContent = targetText.split('').map(function(char, index){
        if (char === ' ' || char === '·') return char;
        if (index < iteration) return targetText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      if (iteration >= targetText.length) {
        clearInterval(timer);
        eyebrow.textContent = targetText;
      }
      iteration += 1 / 2;
    }, 28);
  }

  // --- React Bits: Click Spark Particle Effect ---
  var canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var sparks = [];

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('click', function(e){
    for (var i = 0; i < 8; i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = Math.random() * 3 + 1.5;
      sparks.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        alpha: 1,
        color: Math.random() > 0.4 ? '#0D9488' : '#0284C7'
      });
    }
  });

  function animateSparks(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = sparks.length - 1; i >= 0; i--) {
      var p = sparks[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.035;
      if (p.alpha <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateSparks);
  }
  animateSparks();

  // Contact form submission
  var form = document.getElementById('contact-form'); 
  if (!form) return;
  var status = document.getElementById('status');
  if (!s.formAction) { 
    status.textContent = 'The form is not connected yet. Please use the contact links on this page.'; 
    return; 
  }
  form.action = s.formAction;
  form.addEventListener('submit', function(e){
    e.preventDefault(); 
    status.textContent = 'Sending...';
    fetch(s.formAction, {
      method: 'POST', 
      body: new FormData(form), 
      headers: { Accept: 'application/json' }
    })
    .then(function(r){ 
      if (!r.ok) throw 0; 
      form.reset(); 
      status.textContent = 'Thank you. Your message was sent and I will reply within 24 hours.'; 
    })
    .catch(function(){ 
      status.textContent = 'Sorry, something went wrong. Please try again or use the contact links.'; 
    });
  });
})();
