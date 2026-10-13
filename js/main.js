(function(){
  var s = window.SITE || {};
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
  var btn = document.querySelector('.menu'), nav = document.getElementById('nav');
  if (btn && nav) btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('[data-site]').forEach(function(el){
    var k = el.getAttribute('data-site'), v = s[k]; if (!v) return;
    if (k === 'email') { el.href = 'mailto:' + v; if (el.hasAttribute('data-text')) el.textContent = v; }
    else if (k === 'whatsapp') { el.href = 'https://wa.me/' + String(v).replace(/\D/g, ''); }
    else { el.href = v; }
    el.classList.add('on');
  });
  document.querySelectorAll('.stack').forEach(function(el){
    if (el.children.length === 0) {
      var tags = el.textContent.split('·').map(function(t){ return t.trim(); }).filter(Boolean);
      el.innerHTML = tags.map(function(t){ return '<span class="pill">' + t + '</span>'; }).join('');
    }
  });
  var form = document.getElementById('contact-form'); if (!form) return;
  var status = document.getElementById('status');
  if (!s.formAction) { status.textContent = 'The form is not connected yet. Please use the contact links on this page.'; return; }
  form.action = s.formAction;
  form.addEventListener('submit', function(e){
    e.preventDefault(); status.textContent = 'Sending...';
    fetch(s.formAction, {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}})
      .then(function(r){ if (!r.ok) throw 0; form.reset(); status.textContent = 'Thank you. Your message was sent and I will reply within 24 hours.'; })
      .catch(function(){ status.textContent = 'Sorry, something went wrong. Please try again or use the contact links.'; });
  });
})();
