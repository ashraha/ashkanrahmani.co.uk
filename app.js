// ========= Ash Tech JS =========
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Set year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll for text blocks
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

$$('.reveal').forEach(el => revealObserver.observe(el));

// Reveal for media/cards (slightly different easing/scale)
const mediaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      mediaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

$$('.img-reveal').forEach(el => mediaObserver.observe(el));

// Smooth scroll for internal nav links
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    }
  });
});

// Policy modals
const privacyModal = document.getElementById('privacy-modal');
const termsModal = document.getElementById('terms-modal');

$$('[data-open="privacy"]').forEach(el => el.addEventListener('click', (e) => {
  e.preventDefault();
  privacyModal.showModal();
}));
$$('[data-open="terms"]').forEach(el => el.addEventListener('click', (e) => {
  e.preventDefault();
  termsModal.showModal();
}));
$$('dialog [data-close]').forEach(btn => btn.addEventListener('click', (e) => {
  e.target.closest('dialog').close();
}));

// Quote form — show inline status
const form = document.getElementById('quote-form');
const statusEl = document.getElementById('form-status');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    });
    if (res.ok) {
      form.reset();
      statusEl.textContent = '✅ Thanks! I will get back to you shortly.';
    } else {
      statusEl.textContent = '❌ Something went wrong. Please try again or message on WhatsApp.';
    }
  } catch (err) {
    statusEl.textContent = '❌ Network error. Please try again later.';
  }
});
