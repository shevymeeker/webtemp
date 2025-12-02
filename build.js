const fs = require('fs');
const path = require('path');

// Read the template and data
const template = fs.readFileSync(path.join(__dirname, 'docs', 'index.html'), 'utf8');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs', 'service.json'), 'utf8'));

// Build the hero tagline HTML (with line breaks)
const heroTaglineHTML = data.business.tagline.split('\n').join('<br>');

// Build services HTML
const servicesHTML = data.services
  .map(service => `
      <div class="accordion-item">
        <button class="accordion-header">${service.name}</button>
        <div class="accordion-content">
          <p>${service.description}</p>
        </div>
      </div>`)
  .join('\n');

// Build contact form fields HTML
const contactFormFields = data.contact.fields
  .map(field => {
    if (field.type === 'textarea') {
      return `      <textarea placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>`;
    }
    return `      <input type="${field.type}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>`;
  })
  .join('\n');

// Build gallery images HTML
const galleryImagesHTML = data.gallery.images
  .map(image => `        <div class="carousel-slide"><img src="${image}" alt="Gallery image"></div>`)
  .join('\n');

// Build footer text
const footerText = `&copy; ${data.footer.year} ${data.footer.text}`;

// Replace all placeholders
let output = template
  .replace(/{{META_TITLE}}/g, data.meta.title)
  .replace(/{{META_DESCRIPTION}}/g, data.meta.description)
  .replace(/{{META_KEYWORDS}}/g, data.meta.keywords)
  .replace(/{{BUSINESS_NAME}}/g, data.business.name)
  .replace(/{{HERO_TAGLINE_HTML}}/g, heroTaglineHTML)
  .replace(/{{HERO_SUBTITLE}}/g, data.business.subtitle)
  .replace(/{{HERO_CTA_TEXT}}/g, data.hero.ctaText)
  .replace(/{{HERO_CTA_LINK}}/g, data.hero.ctaLink)
  .replace(/{{SERVICES_HTML}}/g, servicesHTML)
  .replace(/{{CONTACT_HEADING}}/g, data.contact.heading)
  .replace(/{{CONTACT_SUBHEADING}}/g, data.contact.subheading)
  .replace(/{{CONTACT_FORM_ACTION}}/g, data.contact.formAction)
  .replace(/{{CONTACT_FORM_FIELDS}}/g, contactFormFields)
  .replace(/{{CONTACT_SUBMIT_TEXT}}/g, data.contact.submitText)
  .replace(/{{GALLERY_IMAGES_HTML}}/g, galleryImagesHTML)
  .replace(/{{FOOTER_TEXT}}/g, footerText);

// Write the output to the docs directory
fs.writeFileSync(path.join(__dirname, 'docs', 'index-built.html'), output);

console.log('✅ Build complete! Generated docs/index-built.html');
console.log('🚀 To view: cd docs && npx serve');
