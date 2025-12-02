# webtemp
Template for website - Generates a professional website from JSON data

## Quick Start

1. **Edit your content** in `docs/service.json`
2. **Build the website**: `node build.js`
3. **View locally**: `cd docs && npx serve`
4. **Open in browser**: Visit `http://localhost:3000/index-built.html`

## Files

- `docs/index.html` - Template with placeholders
- `docs/service.json` - Your business data (edit this!)
- `docs/style.css` - Styling
- `docs/script.js` - Interactive features
- `build.js` - Builds the final HTML from template + JSON

## How It Works

The build script reads `docs/service.json` and replaces all `{{PLACEHOLDER}}` values in the template to generate `docs/index-built.html`.
