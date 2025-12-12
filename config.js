/**
 * Safe Configuration System for Notta Trace Tree Service
 *
 * This config system separates business content from structure,
 * making it safer to edit without breaking the build process.
 *
 * Edit only the values below - never change the structure unless
 * you also update the corresponding build template.
 */

const config = {
  // ============================================
  // BUSINESS INFO - Edit these anytime!
  // ============================================
  business: {
    name: "Notta-Trace Tree Service",
    tagline: "Support Local",
    subtitle: "Professional tree removal and stump grinding with complete cleanup",
    phone: "(270) 499-0735",
    email: "Notta-Trace@gmail.com",
    address: "McLean County, Kentucky, USA",
    brandColor: "#245334",
    brandColorHover: "#3b8a5a"
  },

  // ============================================
  // HERO SECTION - Edit copy and CTA
  // ============================================
  hero: {
    backgroundImage: "images/background.png",
    kicker: "Friendly Service. Serious Standards.",
    title: "NOTTA TRACE",
    subtitle: "Professional Tree Removal and Stump Grinding",
    badges: [
      "Licensed & Insured",
      "Same-day Estimates",
      "Complete Cleanups"
    ],
    ctaText: "Get Free Estimate",
    ctaLink: "#contact"
  },

  // ============================================
  // SERVICES - Edit descriptions freely
  // ============================================
  services: [
    {
      name: "Tree Removal",
      description: "Safe removal of hazardous, dead, or unwanted trees with complete debris cleanup and site restoration."
    },
    {
      name: "Trimming and Pruning",
      description: "Professional tree trimming and pruning to improve tree health, reduce hazards, and maintain property aesthetics."
    },
    {
      name: "Stump Grinding",
      description: "Complete stump grinding and removal to clear your landscape and prepare sites for replanting or construction."
    },
    {
      name: "Emergency/Storm Damage",
      description: "Emergency response for fallen trees, storm damage, and urgent tree hazards threatening property or safety."
    }
  ],

  // ============================================
  // CONTACT SECTION - Customize fields and messaging
  // ============================================
  contact: {
    heading: "McLean County and surrounding areas",
    subheading: "Snap a Pic, Send it in, Get a free quote",

    // Contact chips (quick action buttons)
    chips: [
      {
        text: "Call Jared",
        href: "tel:2704990735",
        id: "callLink"
      },
      {
        text: "Text us photos",
        href: "sms:2704990735",
        id: "textLink"
      },
      {
        text: "Email a description",
        href: "mailto:Notta-Trace@gmail.com",
        id: "emailLink"
      }
    ],

    // Contact form fields (add/remove/reorder as needed)
    fields: [
      {
        type: "text",
        placeholder: "Notta-Trace Tree Service",
        required: true
      },
      {
        type: "email",
        placeholder: "Notta-Trace@gmail.com",
        required: true
      },
      {
        type: "tel",
        placeholder: "2704990735",
        required: false
      },
      {
        type: "textarea",
        placeholder: "Show us the problem",
        required: true
      }
    ],
    submitText: "Request Quote",
    formAction: "#"
  },

  // ============================================
  // GALLERY - Add or remove image paths
  // ============================================
  gallery: {
    images: [
      "images/before-after-1.jpg",
      "images/before-after-2.jpg",
      "images/kitchen-clean.jpg",
      "images/office-clean.jpg",
      "images/carpet-clean.jpg",
      "images/window-clean.jpg"
    ]
  },

  // ============================================
  // FOOTER - Edit copyright and tagline
  // ============================================
  footer: {
    title: "Notta-Trace Tree Service",
    tagline: "Serving McLean County and surrounding Kentucky towns with safe, tidy tree work.",
    text: "Notta-Trace - Friendly Neighborhood Tree Service",
    year: "2025",

    // Footer links (shown in footer metadata)
    links: [
      {
        text: "Call now",
        href: "tel:2704990735"
      },
      {
        text: "Text photos",
        href: "sms:2704990735"
      },
      {
        text: "Email",
        href: "mailto:Notta-Trace@gmail.com"
      }
    ]
  },

  // ============================================
  // SEO & META - Edit page metadata
  // ============================================
  meta: {
    title: "Notta Trace Tree Service - McLean County, KY | Tree Removal",
    description: "Professional tree removal, trimming, stump grinding, and emergency services. Complete cleanup with zero debris left behind. Licensed and insured.",
    keywords: "tree removal mclean county ky, emergency tree service, stump grinding, storm cleanup, insured, local tree trimming"
  }
};

/**
 * CONFIGURATION VALIDATOR
 * This validates the config structure on load to catch common errors early
 */
function validateConfig() {
  const errors = [];

  // Check required top-level keys
  const required = ['business', 'hero', 'services', 'contact', 'gallery', 'footer', 'meta'];
  required.forEach(key => {
    if (!config[key]) {
      errors.push(`Missing required section: ${key}`);
    }
  });

  // Validate business section
  if (config.business) {
    if (!config.business.name) errors.push('business.name is required');
    if (!config.business.email) errors.push('business.email is required');
  }

  // Validate services is an array
  if (!Array.isArray(config.services)) {
    errors.push('services must be an array');
  } else if (config.services.length === 0) {
    errors.push('At least one service is required');
  }

  // Validate services have required fields
  config.services.forEach((service, idx) => {
    if (!service.name) errors.push(`services[${idx}] missing name`);
    if (!service.description) errors.push(`services[${idx}] missing description`);
  });

  // Validate contact fields is an array
  if (!Array.isArray(config.contact.fields)) {
    errors.push('contact.fields must be an array');
  }

  // Validate gallery images is an array
  if (!Array.isArray(config.gallery.images)) {
    errors.push('gallery.images must be an array');
  }

  // Log validation results
  if (errors.length > 0) {
    console.warn('⚠️  Configuration validation errors:');
    errors.forEach(error => console.warn(`  - ${error}`));
    return false;
  }

  console.log('✅ Configuration is valid');
  return true;
}

// Validate on load (in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
  module.exports.validateConfig = validateConfig;
}
