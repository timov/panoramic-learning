/* =============================================
   PANORAMIC LEARNING â€” Showcase JS
   ============================================= */

// ---- Header scroll effect ----
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ---- Mobile nav toggle ----
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });
  // Close on nav link click
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });
}

// ---- Language switcher ----
const langBtn = document.getElementById('lang-switch');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    const currentFile = window.location.pathname.split('/').pop();
    if (currentFile === 'index-nl.html') {
      window.location.href = 'index.html';
    } else {
      window.location.href = 'index-nl.html';
    }
  });
}

// ---- Testimonials carousel ----
const track  = document.getElementById('testimonial-track');
const btnPrev = document.getElementById('tnav-prev');
const btnNext = document.getElementById('tnav-next');

let currentIndex  = 0;
let autoPlayTimer = null;
let isDragging    = false;
let dragStartX    = 0;
let dragDeltaX    = 0;

function getCardWidth() {
  const card = track.querySelector('.testimonial-card');
  if (!card) return 344;
  const style = window.getComputedStyle(track);
  const gap = parseFloat(style.gap) || 24;
  return card.offsetWidth + gap;
}

function getVisibleCount() {
  return Math.floor(track.parentElement.offsetWidth / getCardWidth());
}

const totalOriginal = 6; // original (non-duplicate) cards

function goTo(index) {
  const cardW = getCardWidth();
  currentIndex = Math.max(0, Math.min(index, totalOriginal - 1));
  track.style.transform = `translateX(-${currentIndex * cardW}px)`;
}

function next() { goTo(currentIndex + 1); }
function prev() { goTo(currentIndex - 1); }

btnNext.addEventListener('click', next);
btnPrev.addEventListener('click', prev);

// Pointer drag support
track.addEventListener('pointerdown', (e) => {
  isDragging = true;
  dragStartX = e.clientX;
  track.setPointerCapture(e.pointerId);
  track.style.transition = 'none';
});
track.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  dragDeltaX = e.clientX - dragStartX;
  const cardW = getCardWidth();
  track.style.transform = `translateX(${-currentIndex * cardW + dragDeltaX}px)`;
});
track.addEventListener('pointerup', () => {
  if (!isDragging) return;
  isDragging = false;
  track.style.transition = '';
  if (dragDeltaX < -60) next();
  else if (dragDeltaX > 60) prev();
  else goTo(currentIndex);
  dragDeltaX = 0;
});

// Auto-advance
function startAutoPlay() {
  autoPlayTimer = setInterval(() => {
    if (currentIndex >= totalOriginal - 1) goTo(0);
    else next();
  }, 2500);
}
function stopAutoPlay() { clearInterval(autoPlayTimer); }

startAutoPlay();
track.addEventListener('pointerenter', stopAutoPlay);
track.addEventListener('pointerleave', startAutoPlay);

// Recalc on resize
window.addEventListener('resize', () => goTo(currentIndex), { passive: true });

// ---- FAQ accordion ----
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.faq-item');
    const isOpen  = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', false);
    });

    // Open clicked (toggle)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', true);
    }
  });
});

// ---- Booking form (demo validation) ----
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = bookingForm.querySelector('#f-name').value.trim();
    const email = bookingForm.querySelector('#f-email').value.trim();
    const level = bookingForm.querySelector('#f-level').value;

    if (!name || !email || !level) {
      alert('Please fill in all required fields.');
      return;
    }
    // In production: submits to WP (CF7 / Gravity Forms) then redirects to Mollie
    alert(`Thank you, ${name}! In the live site you'd be redirected to secure payment now.`);
  });
}

// ---- Smooth reveal on scroll (IntersectionObserver) ----
const revealEls = document.querySelectorAll(
  '.course-card, .step, .testimonial-card, .booking-detail, .faq-item, .about-content > *, .section-header'
);

const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity .5s ease, transform .5s ease; }
  .reveal.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(revealStyle);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

