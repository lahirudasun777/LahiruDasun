// Theme toggle, modal, contact form (simple) and small helpers

document.addEventListener('DOMContentLoaded', () => {
  // year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme toggle
  const btn = document.getElementById('themeToggle');
  const prefersLight = localStorage.getItem('theme') === 'light';
  if(prefersLight) document.body.classList.add('light');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '☀️' : '🌙';
  });

  // Certificate modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');
  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-src');
      modalImg.src = src;
      modal.setAttribute('aria-hidden','false');
    });
    card.addEventListener('keypress', (e) => { if(e.key === 'Enter') card.click(); });
  });
  modalClose.addEventListener('click', () => { modal.setAttribute('aria-hidden','true'); modalImg.src = ''; });
  modal.addEventListener('click', (e) => { if(e.target === modal) { modal.setAttribute('aria-hidden','true'); modalImg.src = ''; } });

  // Simple contact form handling (no backend) — opens mailto as fallback
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    // fallback: open mail client
    window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
  });

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

});
