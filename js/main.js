/* ================================================================
   main.js  |  Shared scripts — runs on every page
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom cursor ───────────────────────────── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function tick() {
    if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
    if (ring)   {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    }
    requestAnimationFrame(tick);
  })();

  /* ── Nav scroll state + progress bar ────────── */
  const nav      = document.getElementById('navbar');
  const progress = document.getElementById('progress');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 48);
    if (progress) {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      progress.style.width = Math.min(pct, 100) + '%';
    }
  }, { passive: true });

  /* ── Fade-in on scroll ───────────────────────── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.10 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* Immediately reveal anything in the first viewport */
  setTimeout(() => {
    const firstSection = document.querySelector('section, .cs-hero, #hero');
    if (firstSection) firstSection.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }, 80);

  /* ── Marquee: duplicate so loop is seamless ──── */
  const track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;

});
