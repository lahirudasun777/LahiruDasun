// Interactive behaviors: tilt card, skills wheel, timeline controls, lightbox, theme, contact form

(() => {
  // Footer year
  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Theme toggle
    const themeBtn = document.getElementById('themeToggle');
    const stored = localStorage.getItem('theme');
    if(stored === 'light') document.body.classList.add('light');
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.textContent = isLight ? '☀️' : '🌙';
    });

    // Tilt / parallax for float card
    const floatCard = document.getElementById('floatCard');
    if(floatCard) {
      const rect = () => floatCard.getBoundingClientRect();
      document.addEventListener('mousemove', (e) => {
        const r = rect();
        const cx = r.left + r.width/2; const cy = r.top + r.height/2;
        const dx = (e.clientX - cx)/r.width; const dy = (e.clientY - cy)/r.height;
        floatCard.style.transform = `rotateX(${(-dy*8).toFixed(2)}deg) rotateY(${(dx*8).toFixed(2)}deg) translateZ(6px)`;
      });
      document.addEventListener('mouseleave', () => { floatCard.style.transform = 'rotateX(0) rotateY(0)'; });
    }

    // Skills wheel: render sectors and attach click handlers
    const skills = [
      {name:'Java', percent:90, projects:['Chat App','Portfolio Website']},
      {name:'React Native', percent:85, projects:['Chat App']},
      {name:'Python', percent:80, projects:['Data Tool']},
      {name:'Ethical Hacking', percent:70, projects:['Security Tests']},
      {name:'HTML/CSS', percent:88, projects:['Discover USA Wonders']},
      {name:'Git', percent:82, projects:['All Projects']}
    ];

    const svg = document.getElementById('skillsWheel');
    const ex = document.getElementById('skillExamples');
    if(svg){
      const size = 400; const cx = 200; const cy = 200; const r = 140;
      let start = -90; // start angle
      skills.forEach((s, i) => {
        const angle = 360 * (1/skills.length);
        const a1 = start; const a2 = start + angle;
        const p1 = polar(cx,cy,r,a1); const p2 = polar(cx,cy,r,a2);
        const large = angle>180 ? 1 : 0;
        const path = document.createElementNS('http://www.w3.org/2000/svg','path');
        path.setAttribute('d', `M ${cx} ${cy} L ${p1.x} ${p1.y} A ${r} ${r} 0 ${large} 1 ${p2.x} ${p2.y} Z`);
        path.setAttribute('fill','rgba(6,214,255,0.05)');
        path.setAttribute('stroke','rgba(6,214,255,0.06)');
        path.setAttribute('data-i', i);
        path.style.cursor = 'pointer';
        path.addEventListener('mouseenter', () => { path.setAttribute('fill','rgba(6,214,255,0.12)'); });
        path.addEventListener('mouseleave', () => { path.setAttribute('fill','rgba(6,214,255,0.05)'); });
        path.addEventListener('click', () => { showSkill(i); });
        svg.appendChild(path);

        // label
        const mid = polar(cx,cy,r+36,a1+angle/2);
        const text = document.createElementNS('http://www.w3.org/2000/svg','text');
        text.setAttribute('x', mid.x); text.setAttribute('y', mid.y);
        text.setAttribute('text-anchor','middle'); text.setAttribute('alignment-baseline','middle');
        text.setAttribute('font-size','12'); text.setAttribute('fill', 'rgba(230,238,248,0.9)');
        text.textContent = s.name;
        svg.appendChild(text);

        start += angle;
      });
    }

    function showSkill(i){
      const s = skills[i];
      const info = document.getElementById('skillInfo');
      info.querySelector('h3').textContent = s.name + ' — ' + s.percent + '%';
      ex.innerHTML = '';
      s.projects.forEach(p => {
        const d = document.createElement('div'); d.className='ex'; d.textContent = '• ' + p; ex.appendChild(d);
      });
    }

    function polar(cx,cy,r,deg){
      const rad = deg * Math.PI/180; return {x: cx + r*Math.cos(rad), y: cy + r*Math.sin(rad)};
    }

    // Show first skill
    showSkill(0);

    // Timeline controls
    const tl = document.getElementById('timeline');
    document.getElementById('tLeft').addEventListener('click', () => { tl.scrollBy({left:-340,behavior:'smooth'}); });
    document.getElementById('tRight').addEventListener('click', () => { tl.scrollBy({left:340,behavior:'smooth'}); });

    // Drag to scroll timeline
    let isDown=false; let startX, scrollLeft;
    tl.addEventListener('mousedown', (e)=>{ isDown=true; tl.classList.add('active'); startX=e.pageX - tl.offsetLeft; scrollLeft = tl.scrollLeft; });
    tl.addEventListener('mouseleave', ()=>{ isDown=false; tl.classList.remove('active'); });
    tl.addEventListener('mouseup', ()=>{ isDown=false; tl.classList.remove('active'); });
    tl.addEventListener('mousemove', (e)=>{ if(!isDown) return; e.preventDefault(); const x = e.pageX - tl.offsetLeft; const walk = (x - startX) * 2; tl.scrollLeft = scrollLeft - walk; });

    // Lightbox for certs
    const lightbox = document.getElementById('lightbox'); const lbImg = document.getElementById('lbImg');
    document.querySelectorAll('.cert').forEach(c => c.addEventListener('click', ()=>{ lbImg.src = c.dataset.src; lightbox.setAttribute('aria-hidden','false'); }));
    document.getElementById('lbClose').addEventListener('click', ()=>{ lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; });
    lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) { lightbox.setAttribute('aria-hidden','true'); lbImg.src=''; } });

    // Contact form: mailto fallback
    const form = document.getElementById('contactForm');
if(form){ 
  form.addEventListener('submit', (e) => { 
    e.preventDefault(); 
    const fd = new FormData(form); 
    const name = fd.get('name'); 
    const email = fd.get('email'); 
    const msg = fd.get('message'); 
    window.location.href = `mailto:your-email@example.com?subject=${encodeURIComponent('Contact from ' + name)}&body=${encodeURIComponent(`${msg}

From: ${name} <${email}>`)}`;
  }); 
}

  });
})();