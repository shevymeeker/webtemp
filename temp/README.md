# Service Business Website Template

**A professional, mobile-first website template for service-based businesses**

Perfect for lawn care, landscaping, cleaning services, home services, and any local service business. This template features:

- 🎨 **Squarespace-level design quality**
- 📱 **100% mobile responsive** with touch/swipe support
- ⚡ **Fast and lightweight** - no frameworks, pure vanilla JS
- 🎯 **Easy customization** - just edit one config file
- 🚀 **Production-ready** - deploy anywhere

---

## 🚀 Quick Start (3 Steps)

### 1. Edit the Configuration

Open `config.json` and customize it for your client:

```json
{
  "business": {
    "name": "Your Client's Business Name",
    "tagline": "Your Three. Word. Tagline.",
    "subtitle": "Your business description",
    "brandColor": "#00b33c",
    "brandColorHover": "#00ff4c"
  },
  ...
}
```

### 2. Generate the Website

```bash
cd template
python generate.py config.json ../output
```

### 3. Add Images

Copy your client's photos to the output directory:

```bash
cp your-background.jpg ../output/background.jpg
cp your-photos/* ../output/images/
```

**That's it!** Open `output/index.html` in a browser to see the site.

---

## 📝 Configuration Guide

### Business Information

```json
"business": {
  "name": "Client Business Name",           // Company name (appears in header & footer)
  "tagline": "Word. By. Word.",             // Hero section - splits on spaces
  "subtitle": "One-line description",       // Shows below tagline
  "brandColor": "#00b33c",                  // Primary brand color (green by default)
  "brandColorHover": "#00ff4c"              // Hover state color
}
```

### Hero Section

```json
"hero": {
  "backgroundImage": "background.jpg",      // Filename of hero background image
  "ctaText": "Get Free Quote",              // Call-to-action button text
  "ctaLink": "#contact"                     // Where CTA button links to
}
```

### Services

Add unlimited services - each becomes an accordion item:

```json
"services": [
  {
    "name": "Service Name",
    "description": "Detailed description of this service..."
  },
  {
    "name": "Another Service",
    "description": "What this service includes..."
  }
]
```

### Contact Form

```json
"contact": {
  "heading": "Get in touch.",
  "subheading": "Brief instruction text",
  "fields": [
    {
      "type": "text",                       // or "email", "tel", "textarea"
      "placeholder": "Your Name",
      "required": true
    }
  ],
  "submitText": "Send Message",
  "formAction": "#"                         // Form submission endpoint
}
```

**Note:** To make the form functional, update `formAction` with your form handler URL (Formspree, Google Forms, custom endpoint, etc.)

### Gallery/Carousel

List all project images:

```json
"gallery": {
  "images": [
    "images/project1.jpg",
    "images/project2.jpg",
    "images/project3.jpg"
  ]
}
```

The carousel auto-handles:
- ✅ Any number of images
- ✅ Missing images (won't show broken placeholders)
- ✅ Mobile swipe gestures
- ✅ Keyboard navigation
- ✅ Responsive aspect ratios

### SEO & Meta

```json
"meta": {
  "title": "Business Name - What You Do",
  "description": "SEO-friendly description (150-160 chars ideal)",
  "keywords": "keyword1, keyword2, keyword3"
}
```

---

## 🎨 Customizing Colors

The template supports full brand color customization. Just change these values in `config.json`:

```json
"brandColor": "#YOUR_COLOR",          // Primary brand color
"brandColorHover": "#HOVER_COLOR"     // Lighter/brighter hover state
```

The generator automatically updates **all** instances throughout the CSS:
- Header and navigation
- Buttons and CTAs
- Accordion highlights
- Footer background
- Hover effects
- Shadows and glows

**Color Tips:**
- Use a color picker to find your client's brand colors
- Hover color should be 10-20% brighter than primary
- Test on mobile for visibility

---

## 📱 Mobile Features

This template is **mobile-first** with premium features:

### Touch & Swipe
- Swipe left/right on carousel
- Smooth scroll navigation
- Touch-friendly button sizes

### Responsive Breakpoints
- **< 480px:** Extra small phones - compact layout
- **480-767px:** Phones - hamburger menu
- **768-1199px:** Tablets - desktop navigation appears
- **≥ 1200px:** Desktops - full layout

### Animations
- Fade-in hero text
- Pulsing CTA button
- Scroll-triggered service items
- Smooth accordion expand/collapse

---

## 🖼️ Image Guidelines

### Background Image
- **Filename:** Match the name in `config.json` (default: `background.jpg`)
- **Recommended size:** 1920x1080px or larger
- **Format:** JPG (optimized for web)
- **Subject:** Should work with text overlay - avoid busy centers

### Gallery/Project Images
- **Recommended size:** 1200x800px (3:2 ratio)
- **Format:** JPG (optimized) or PNG
- **Naming:** Use descriptive names (e.g., `front-lawn.jpg`, `backyard-landscaping.jpg`)
- **Quantity:** Template supports 10 by default, but you can add/remove any number

### Optimization Tips
- Compress images before uploading (use TinyPNG, Squoosh, or ImageOptim)
- Aim for < 500KB per gallery image
- Use descriptive alt text in the config

---

## 📤 Deployment Options

### Option 1: GitHub Pages (Free!)

1. Create a new GitHub repository
2. Copy generated files to the repo
3. Enable GitHub Pages in Settings
4. Your site will be live at `username.github.io/repo-name`

### Option 2: Netlify/Vercel (Free)

1. Drag & drop the output folder
2. Instant deployment with custom domain support

### Option 3: Traditional Web Hosting

1. FTP/upload the entire output folder
2. Point domain to the directory

### Option 4: Local/Client Preview

1. Zip the output folder
2. Send to client
3. They can open `index.html` locally

---

## 🔧 Advanced Customization

### Modifying the Template

If you need to make structural changes:

1. **Edit HTML:** Modify `index.template.html`
2. **Edit CSS:** Modify `style.template.css`
3. **Edit JS:** Modify `script.js`
4. **Test:** Regenerate with `python generate.py`

### Adding Custom Sections

Add new sections in `index.template.html`:

```html
<section id="custom" class="custom-section">
  <h2>{{CUSTOM_HEADING}}</h2>
  <p>{{CUSTOM_TEXT}}</p>
</section>
```

Then add to `config.json`:

```json
"custom": {
  "heading": "Custom Section",
  "text": "Your content here"
}
```

And update `generate.py` to handle the new placeholders.

---

## 📋 Workflow for Each New Client

1. **Duplicate config:**
   ```bash
   cp config.json client-name-config.json
   ```

2. **Edit client config:**
   - Update business info
   - Add their services
   - List their images
   - Set brand colors

3. **Generate site:**
   ```bash
   python generate.py client-name-config.json ../client-name-site
   ```

4. **Add images:**
   - Copy background image
   - Copy gallery photos to `images/`

5. **Test locally:**
   - Open in browser
   - Test on mobile (Chrome DevTools)
   - Verify all links work

6. **Deploy:**
   - Upload to hosting
   - Connect domain
   - Test live site

**Time per site:** 15-30 minutes once you have assets!

---

## 🎯 What to Ask Clients

### Required Information:
- [ ] Business name
- [ ] 3-word tagline (or you create one)
- [ ] One-sentence description
- [ ] 3-7 services (name + description)
- [ ] Contact form text
- [ ] 5-10 project photos
- [ ] 1 hero background image

### Optional Information:
- [ ] Brand colors (hex codes)
- [ ] Phone number
- [ ] Email address
- [ ] Physical address
- [ ] Social media links (if you add to template)

---

## 🐛 Troubleshooting

### Images Not Showing
- Check file paths in `config.json`
- Ensure images are in the correct directory
- Verify image filenames match exactly (case-sensitive)

### Colors Not Changing
- Make sure you're using valid hex codes (#RRGGBB)
- Regenerate the site after config changes
- Check that CSS file was updated

### Form Not Working
- Update `formAction` in config with your form endpoint
- Or integrate with Formspree, Google Forms, etc.
- Test form submission before going live

### Script Errors
- Ensure Python 3 is installed: `python --version`
- Check JSON syntax in config.json (use JSONLint)
- Read error messages - they usually point to the issue

---

## 📦 What's Included

```
template/
├── config.json                 # Configuration file - edit this!
├── index.template.html         # HTML template with placeholders
├── style.template.css          # CSS template with color variables
├── script.js                   # JavaScript (no changes needed)
├── generate.py                 # Generator script
└── README.md                   # This file
```

---

## 💡 Pro Tips

1. **Save client configs** - Keep a `clients/` folder with all your configs
2. **Create packages** - Bundle generated sites with instructions for clients
3. **Brand consistency** - Extract colors from client's logo with a color picker
4. **Image prep** - Create a standard image size template for clients
5. **Form integration** - Set up a Formspree account for easy form handling
6. **Version control** - Keep template in Git, track improvements
7. **Hosting partner** - Partner with a hosting provider for recurring revenue

---

## 🆘 Support

Questions? Issues? Suggestions?

1. Check this README first
2. Review the example `config.json`
3. Test with the default config to isolate issues
4. Check your JSON syntax

---

## 📄 License

Free to use for commercial and personal projects. No attribution required.

---

## 🎉 You're Ready!

This template makes creating professional service business websites **fast and easy**.

Each new site takes **15-30 minutes** instead of hours or days.

**Happy building!** 🚀
