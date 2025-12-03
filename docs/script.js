// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Load service.json and populate the template
  fetch('service.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load service.json');
      }
      return response.json();
    })
    .then(data => {
      populatePage(data);
    })
    .catch(error => {
      console.error('Error loading service.json:', error);
      document.body.innerHTML = '<div style="padding: 2rem; text-align: center;"><h1>Error Loading Page</h1><p>' + error.message + '</p><p>Make sure you\'re viewing this page through a web server (not file://).</p></div>';
    });
});

function populatePage(data) {
    // Update meta tags
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]').content = data.meta.description;
    document.querySelector('meta[name="keywords"]').content = data.meta.keywords;

    // Update text content
    document.querySelectorAll('.brand-name').forEach(el => {
      el.textContent = data.business.name;
    });

    document.querySelectorAll('.brand-subline').forEach(el => {
      el.textContent = data.business.subtitle || 'Local tree removal & cleanup pros';
    });

    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.innerHTML = data.business.tagline.split('\n').join('<br>');
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
      heroSubtitle.textContent = data.business.subtitle;
    }

    const quoteBtn = document.querySelector('.quote-btn');
    if (quoteBtn) {
      quoteBtn.textContent = data.hero.ctaText;
      quoteBtn.href = data.hero.ctaLink;
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection && data.hero.backgroundImage) {
      document.documentElement.style.setProperty('--hero-image', `url('${data.hero.backgroundImage}')`);
    }

    // Build services accordion
    const accordion = document.querySelector('.accordion');
    if (accordion && data.services) {
      accordion.innerHTML = data.services.map(service => `
        <div class="accordion-item">
          <button class="accordion-header">${service.name}</button>
          <div class="accordion-content">
            <p>${service.description}</p>
          </div>
        </div>
      `).join('');

      // Add accordion click handlers
      document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
          const isActive = button.classList.contains('active');

          // Close all accordions
          document.querySelectorAll('.accordion-header').forEach(btn => {
            btn.classList.remove('active');
          });

          // Open clicked accordion if it wasn't active
          if (!isActive) {
            button.classList.add('active');
          }
        });
      });
    }

    // Update contact section
    const contactHeading = document.querySelector('.contact h2');
    if (contactHeading) {
      contactHeading.textContent = data.contact.heading;
    }

    const contactSubheading = document.querySelector('.contact p');
    if (contactSubheading) {
      contactSubheading.textContent = data.contact.subheading;
    }

    const contactForm = document.querySelector('.contact form');
    if (contactForm && data.contact.fields) {
      contactForm.action = data.contact.formAction;

      // Build form fields
      const fieldsHTML = data.contact.fields.map(field => {
        if (field.type === 'textarea') {
          return `<textarea placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>`;
        }
        return `<input type="${field.type}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`;
      }).join('\n');

      contactForm.innerHTML = fieldsHTML + `\n      <button type="submit">${data.contact.submitText}</button>`;
    }

    const phone = data.business.phone || '';
    const email = data.business.email || '';
    const sanitizedPhone = phone.replace(/[^\d+]/g, '');
    const callLink = document.getElementById('callLink');
    const textLink = document.getElementById('textLink');
    const emailLink = document.getElementById('emailLink');

    if (callLink && phone) {
      callLink.href = `tel:${sanitizedPhone}`;
      callLink.textContent = `Call ${phone}`;
    }

    if (textLink && phone) {
      textLink.href = `sms:${sanitizedPhone}`;
    }

    if (emailLink && email) {
      emailLink.href = `mailto:${email}`;
    }

    // Update gallery
    const carouselSlides = document.querySelector('.carousel-slides');
    if (carouselSlides && data.gallery.images) {
      carouselSlides.innerHTML = data.gallery.images.map(image =>
        `<div class="carousel-slide"><img src="${image}" alt="${data.business.name} project photo"></div>`
      ).join('');

      // Initialize carousel
      initCarousel();
    }

    // Update footer
    const footer = document.querySelector('.footer-meta p');
    if (footer) {
      footer.innerHTML = `&copy; ${data.footer.year} ${data.footer.text}`;
    }

  // Apply brand colors
  if (data.business.brandColor) {
    document.documentElement.style.setProperty('--brand-color', data.business.brandColor);
  }
  if (data.business.brandColorHover) {
    document.documentElement.style.setProperty('--brand-color-hover', data.business.brandColorHover);
  }

  insertStructuredData(data);
  // Initialize mobile menu
  initMobileMenu();
}

// Carousel functionality
function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelector('.carousel-indicators');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (slides.length === 0) return;

  let currentSlide = 0;

  // Create indicators
  if (indicators) {
    indicators.innerHTML = slides.length > 0
      ? Array.from(slides).map((_, i) =>
          `<span class="dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></span>`
        ).join('')
      : '';

    // Indicator click handlers
    indicators.querySelectorAll('.dot').forEach(indicator => {
      indicator.addEventListener('click', () => {
        currentSlide = parseInt(indicator.dataset.slide);
        updateCarousel();
      });
    });
  }

  function updateCarousel() {
    // Update slides
    slides.forEach((slide, index) => {
      slide.style.display = index === currentSlide ? 'block' : 'none';
    });

    // Update indicators
    if (indicators) {
      indicators.querySelectorAll('.dot').forEach((ind, index) => {
        ind.classList.toggle('active', index === currentSlide);
      });
    }
  }

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });
  }

  // Initialize
  updateCarousel();

  // Auto-advance carousel every 5 seconds
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  }, 5000);
}

// Mobile menu toggle
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

function insertStructuredData(data) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  const phone = data.business.phone || '';
  const sanitizedPhone = phone.replace(/[^\d+]/g, '');
  const addressLine = data.business.address || '';
  const [lineLocality = '', lineRegion = '', lineCountry = ''] = addressLine.split(',').map(part => part.trim());
  const logoPath = data.business.logo || 'logo.svg';

  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.business.name,
    image: new URL(logoPath, window.location.href).href,
    url: window.location.href,
    telephone: phone,
    email: data.business.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressLine || undefined,
      addressLocality: data.business.locality || lineLocality || undefined,
      addressRegion: data.business.region || lineRegion || undefined,
      addressCountry: data.business.country || lineCountry || 'US'
    },
    areaServed: data.contact.heading || addressLine || undefined,
    sameAs: [
      sanitizedPhone ? `tel:${sanitizedPhone}` : undefined,
      data.business.email ? `mailto:${data.business.email}` : undefined
    ].filter(Boolean)
  });
  document.head.appendChild(script);
}
