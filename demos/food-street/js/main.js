/* ============================================================
   OLD MONK FOOD STREET — Main JavaScript
   ============================================================ */

/* === LOADER === */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1700);
});

/* === CUSTOM CURSOR === */
const cursor       = document.querySelector('.cursor');
const cursorFollow = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followX = 0, followY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

function animateFollower() {
  followX += (mouseX - followX) * 0.12;
  followY += (mouseY - followY) * 0.12;
  if (cursorFollow) {
    cursorFollow.style.left = followX + 'px';
    cursorFollow.style.top  = followY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .tab-btn, .menu-order-btn, .gallery-item, .insta-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; }
    if (cursorFollow) { cursorFollow.style.width = '56px'; cursorFollow.style.height = '56px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; }
    if (cursorFollow) { cursorFollow.style.width = '36px'; cursorFollow.style.height = '36px'; }
  });
});

/* === PARTICLES === */
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left    = Math.random() * 100 + '%';
    p.style.bottom  = '-10px';
    p.style.width   = (Math.random() * 3 + 1) + 'px';
    p.style.height  = p.style.width;
    p.style.setProperty('--dur',   (Math.random() * 8 + 5) + 's');
    p.style.setProperty('--delay', (Math.random() * 8) + 's');
    p.style.opacity = Math.random() * 0.6 + 0.2;
    container.appendChild(p);
  }
}
createParticles();

/* === NAVIGATION SCROLL === */
const nav = document.querySelector('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (nav) {
    if (y > 60) nav.classList.add('scrolled');
    else         nav.classList.remove('scrolled');
  }
  lastY = y;
});

/* === HAMBURGER === */
const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* === SCROLL REVEAL === */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

/* === NUMBER COUNTER === */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

/* === MENU TABS === */
const tabBtns   = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-card');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    menuItems.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.style.display = '';
        setTimeout(() => { item.style.opacity = '1'; item.style.transform = ''; }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => { item.style.display = 'none'; }, 280);
      }
    });
  });
});

/* === TESTIMONIAL AUTO-SCROLL === */
const track = document.querySelector('.testimonials-track');
if (track) {
  let scrollDir = 1;
  let autoScroll = setInterval(() => {
    track.scrollLeft += 1.5 * scrollDir;
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) scrollDir = -1;
    if (track.scrollLeft <= 0) scrollDir = 1;
  }, 20);
  track.addEventListener('mouseenter', () => clearInterval(autoScroll));
  track.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      track.scrollLeft += 1.5 * scrollDir;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) scrollDir = -1;
      if (track.scrollLeft <= 0) scrollDir = 1;
    }, 20);
  });
}

/* === GALLERY LIGHTBOX === */
function buildLightbox() {
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    position:fixed; inset:0; background:rgba(8,8,8,0.96); z-index:99999;
    display:none; align-items:center; justify-content:center; padding:2rem;
  `;
  lb.innerHTML = `
    <button id="lb-close" style="position:absolute;top:24px;right:32px;background:none;border:none;color:#FFD700;font-size:2.5rem;cursor:pointer;line-height:1;">&times;</button>
    <button id="lb-prev" style="position:absolute;left:24px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.3);color:#FFD700;width:50px;height:50px;border-radius:50%;font-size:1.5rem;cursor:pointer;">&#8249;</button>
    <img id="lb-img" src="" alt="" style="max-width:90vw;max-height:85vh;object-fit:contain;border-radius:12px;box-shadow:0 30px 80px rgba(0,0,0,0.8);">
    <button id="lb-next" style="position:absolute;right:24px;background:rgba(255,215,0,0.15);border:1px solid rgba(255,215,0,0.3);color:#FFD700;width:50px;height:50px;border-radius:50%;font-size:1.5rem;cursor:pointer;">&#8250;</button>
  `;
  document.body.appendChild(lb);

  const imgs = Array.from(document.querySelectorAll('.gallery-item img, .insta-item img'));
  let current = 0;

  function open(i) {
    current = i;
    lb.style.display = 'flex';
    document.getElementById('lb-img').src = imgs[i].src;
    document.body.style.overflow = 'hidden';
  }
  function close() { lb.style.display = 'none'; document.body.style.overflow = ''; }

  imgs.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => open(i));
  });
  document.getElementById('lb-close').addEventListener('click', close);
  document.getElementById('lb-prev').addEventListener('click', () => open((current - 1 + imgs.length) % imgs.length));
  document.getElementById('lb-next').addEventListener('click', () => open((current + 1) % imgs.length));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (lb.style.display === 'flex') {
      if (e.key === 'ArrowLeft')  document.getElementById('lb-prev').click();
      if (e.key === 'ArrowRight') document.getElementById('lb-next').click();
      if (e.key === 'Escape')     close();
    }
  });
}
buildLightbox();

/* === CONTACT FORM === */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    }, 1400);
  });
}

/* === ACTIVE NAV LINK === */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* === PARALLAX HERO === */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});

/* === MARQUEE DUPLICATION === */
const marqueeInner = document.querySelector('.marquee-inner');
if (marqueeInner) {
  const clone = marqueeInner.cloneNode(true);
  marqueeInner.parentElement.appendChild(clone);
}
