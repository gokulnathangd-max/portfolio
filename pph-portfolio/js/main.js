/**
 * MAIN INTERACTION & CONFIG HYDRATION SCRIPT
 * 
 * Injects dynamic values from js/config.js.
 * Enforces marketplace safety rules:
 * - Hides any CTA buttons if pphProfileUrl is empty.
 * - Hides unconfigured external links, project slots, and delivery times.
 * - Accessible mobile menu keyboard and focus management.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSiteConfig();
  initMobileMenu();
  initAccessibleNavigation();
});

function initSiteConfig() {
  if (typeof SITE_CONFIG === 'undefined') {
    console.warn('SITE_CONFIG not loaded. Please ensure js/config.js is included.');
    return;
  }

  // 1. PeoplePerHour CTA Buttons
  const pphUrl = (SITE_CONFIG.pphProfileUrl || '').trim();
  const pphButtons = document.querySelectorAll('[data-pph-cta]');

  pphButtons.forEach(btn => {
    if (pphUrl) {
      btn.setAttribute('href', pphUrl);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
      btn.removeAttribute('hidden');
      btn.style.display = '';
    } else {
      // Rule: If URL is empty, hide buttons rather than showing a dead link
      btn.setAttribute('hidden', 'true');
      btn.style.display = 'none';
    }
  });

  // Also hide full banner CTA wrappers if pphUrl is empty and marked for hiding
  const pphWrappers = document.querySelectorAll('[data-pph-wrapper]');
  pphWrappers.forEach(wrapper => {
    if (!pphUrl) {
      wrapper.setAttribute('hidden', 'true');
      wrapper.style.display = 'none';
    } else {
      wrapper.removeAttribute('hidden');
      wrapper.style.display = '';
    }
  });

  // 2. Developer Profile Links (GitHub, LinkedIn)
  const profileLinks = document.querySelectorAll('[data-config-link]');
  profileLinks.forEach(link => {
    const key = link.getAttribute('data-config-link');
    const val = (SITE_CONFIG[key] || '').trim();
    if (val) {
      link.setAttribute('href', val);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.removeAttribute('hidden');
      link.style.display = '';
    } else {
      link.setAttribute('hidden', 'true');
      link.style.display = 'none';
    }
  });

  // 3. Service Delivery Times
  const deliveryElements = document.querySelectorAll('[data-delivery-time]');
  deliveryElements.forEach(el => {
    const serviceKey = el.getAttribute('data-delivery-time');
    const val = (SITE_CONFIG.deliveryTimes && SITE_CONFIG.deliveryTimes[serviceKey] || '').trim();
    const container = el.closest('[data-delivery-container]') || el;
    if (val) {
      el.textContent = val;
      container.removeAttribute('hidden');
      container.style.display = '';
    } else {
      container.setAttribute('hidden', 'true');
      container.style.display = 'none';
    }
  });

  // 4. Project Details & Hidden Config Slots
  const projectElements = document.querySelectorAll('[data-project-key]');
  projectElements.forEach(el => {
    const projectKey = el.getAttribute('data-project-key');
    const field = el.getAttribute('data-project-field');
    const project = SITE_CONFIG.projects && SITE_CONFIG.projects[projectKey];
    const val = project ? (project[field] || '').trim() : '';
    const container = el.closest('[data-project-slot]') || el;

    if (!val) {
      container.setAttribute('hidden', 'true');
      container.style.display = 'none';
    } else {
      container.removeAttribute('hidden');
      container.style.display = '';
      if (el.tagName === 'A') {
        el.setAttribute('href', val);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener noreferrer');
      } else if (el.tagName === 'IMG') {
        el.setAttribute('src', val);
      } else {
        el.textContent = val;
      }
    }
  });
}

/**
 * Mobile Navigation Toggle with keyboard support and focus states
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navContainer = document.querySelector('.site-nav');
  if (!toggleBtn || !navContainer) return;

  function toggleMenu(isOpen) {
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    navContainer.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('nav-lock', isOpen);
  }

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isCurrentlyOpen);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (toggleBtn.getAttribute('aria-expanded') === 'true') {
      if (!navContainer.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleMenu(false);
      }
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Close when clicking internal links
  navContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (toggleBtn.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
      }
    });
  });
}

/**
 * Accessible Navigation: Highlight current page link
 */
function initAccessibleNavigation() {
  const currentPath = window.location.pathname.replace(/\/$/, '');
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\/$/, '').replace(/^\.\.\//, '');
    if (currentPath.endsWith(cleanHref) && cleanHref !== '') {
      link.setAttribute('aria-current', 'page');
    }
  });
}
