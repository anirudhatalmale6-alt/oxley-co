/* ═══════════════════════════════════════
   OXLEY & CO — Main JS
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Nav scroll effect ───
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Mobile menu toggle ───
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ─── Scroll reveal ───
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // ─── FAQ accordion ───
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
      });

      // Toggle current
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  // ─── Active nav link ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ─── Form submission (placeholder) ───
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<span>ENQUIRY SENT</span>';
      btn.style.background = 'var(--gold)';
      btn.style.color = 'var(--navy)';
      btn.style.borderColor = 'var(--gold)';
      setTimeout(() => {
        btn.innerHTML = origText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
        form.reset();
      }, 3000);
    });
  });

  // ─── Smooth anchor scrolling ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
