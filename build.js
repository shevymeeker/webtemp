/**
 * Build Script for Notta Trace Tree Service
 *
 * This script builds the final HTML file from:
 * - docs/index.html (template with placeholders)
 * - config.js (centralized configuration)
 *
 * Usage: node build.js
 *
 * The config.js file contains all editable content. Edit there,
 * then run this script to generate the final HTML.
 */

const fs = require('fs');
const path = require('path');

// Load configuration
const config = require('./config.js');

// Validate configuration before building
const { validateConfig } = require('./config.js');
if (!validateConfig()) {
  console.error('❌ Configuration is invalid. Fix errors above and try again.');
  process.exit(1);
}

// Read the template
const templatePath = path.join(__dirname, 'docs', 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

// ============================================
// BUILD HELPER FUNCTIONS
// ============================================

/**
 * Build services accordion HTML from config
 */
function buildServicesHTML() {
  return config.services
    .map(service => `
      <div class="accordion-item">
        <button class="accordion-header">${escapeHtml(service.name)}</button>
        <div class="accordion-content">
          <p>${escapeHtml(service.description)}</p>
        </div>
      </div>`)
    .join('\n');
}

/**
 * Build contact form fields from config
 */
function buildContactFieldsHTML() {
  return config.contact.fields
    .map(field => {
      const required = field.required ? 'required' : '';
      if (field.type === 'textarea') {
        return `      <textarea placeholder="${escapeHtml(field.placeholder)}" ${required}></textarea>`;
      }
      return `      <input type="${field.type}" placeholder="${escapeHtml(field.placeholder)}" ${required}>`;
    })
    .join('\n');
}

/**
 * Build contact chips (quick action buttons)
 */
function buildContactChipsHTML() {
  return config.contact.chips
    .map(chip => `      <a class="contact-chip" id="${chip.id}" href="${chip.href}">${escapeHtml(chip.text)}</a>`)
    .join('\n');
}

/**
 * Build gallery slides from config
 */
function buildGalleryHTML() {
  return config.gallery.images
    .map(image => `        <div class="carousel-slide"><img src="${image}" alt="Gallery image"></div>`)
    .join('\n');
}

/**
 * Build hero badges
 */
function buildBadgesHTML() {
  if (!config.hero.badges || config.hero.badges.length === 0) {
    return '';
  }
  return `<div class="hero-badges">
        ${config.hero.badges
          .map(badge => `<span class="pill">${escapeHtml(badge)}</span>`)
          .join('\n        ')}
      </div>`;
}

/**
 * Build footer links
 */
function buildFooterLinksHTML() {
  if (!config.footer.links || config.footer.links.length === 0) {
    return '';
  }
  const links = config.footer.links
    .map(link => `<a href="${link.href}">${escapeHtml(link.text)}</a>`)
    .join('\n        <span aria-hidden="true">•</span>\n        ');
  return `<p class="footer-links">
        ${links}
      </p>`;
}

/**
 * Safely escape HTML to prevent injection
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ============================================
// BUILD PROCESS
// ============================================

console.log('🔨 Building Notta Trace website...\n');

let output = template;

// Replace meta tags
output = output.replace(/{{META_TITLE}}/g, escapeHtml(config.meta.title));
output = output.replace(/{{META_DESCRIPTION}}/g, escapeHtml(config.meta.description));
output = output.replace(/{{META_KEYWORDS}}/g, escapeHtml(config.meta.keywords));

// Replace business info
output = output.replace(/{{BUSINESS_NAME}}/g, escapeHtml(config.business.name));
output = output.replace(/{{BUSINESS_EMAIL}}/g, escapeHtml(config.business.email));
output = output.replace(/{{BUSINESS_PHONE}}/g, escapeHtml(config.business.phone));
output = output.replace(/{{BUSINESS_ADDRESS}}/g, escapeHtml(config.business.address));

// Replace hero section
output = output.replace(/{{HERO_BACKGROUND_IMAGE}}/g, config.hero.backgroundImage);
output = output.replace(/{{HERO_KICKER}}/g, escapeHtml(config.hero.kicker));
output = output.replace(/{{HERO_TITLE}}/g, escapeHtml(config.hero.title));
output = output.replace(/{{HERO_SUBTITLE}}/g, escapeHtml(config.hero.subtitle));
output = output.replace(/{{HERO_BADGES_HTML}}/g, buildBadgesHTML());
output = output.replace(/{{HERO_CTA_TEXT}}/g, escapeHtml(config.hero.ctaText));
output = output.replace(/{{HERO_CTA_LINK}}/g, config.hero.ctaLink);

// Replace services
output = output.replace(/{{SERVICES_HTML}}/g, buildServicesHTML());

// Replace contact section
output = output.replace(/{{CONTACT_HEADING}}/g, escapeHtml(config.contact.heading));
output = output.replace(/{{CONTACT_SUBHEADING}}/g, escapeHtml(config.contact.subheading));
output = output.replace(/{{CONTACT_CHIPS_HTML}}/g, buildContactChipsHTML());
output = output.replace(/{{CONTACT_FORM_ACTION}}/g, config.contact.formAction);
output = output.replace(/{{CONTACT_FORM_FIELDS}}/g, buildContactFieldsHTML());
output = output.replace(/{{CONTACT_SUBMIT_TEXT}}/g, escapeHtml(config.contact.submitText));

// Replace gallery
output = output.replace(/{{GALLERY_IMAGES_HTML}}/g, buildGalleryHTML());

// Replace footer
output = output.replace(/{{FOOTER_TITLE}}/g, escapeHtml(config.footer.title));
output = output.replace(/{{FOOTER_TAGLINE}}/g, escapeHtml(config.footer.tagline));
output = output.replace(/{{FOOTER_TEXT}}/g, escapeHtml(config.footer.text));
output = output.replace(/{{FOOTER_YEAR}}/g, config.footer.year);
output = output.replace(/{{FOOTER_LINKS_HTML}}/g, buildFooterLinksHTML());

// Write the output to the docs directory
const outputPath = path.join(__dirname, 'docs', 'index-built.html');
fs.writeFileSync(outputPath, output);

console.log('✅ Build complete!');
console.log(`📄 Generated: docs/index-built.html\n`);
console.log('📝 To edit content, modify config.js and run this script again\n');
console.log('🚀 To view locally: cd docs && npx serve');
