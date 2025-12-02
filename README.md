# webtemp
Template for website - Generates a professional website from JSON data

## Quick Start

1. **Edit your content** in `docs/service.json`
2. **Push to GitHub**
3. **Deploy via GitHub Pages or Netlify** (from the `docs` folder)

That's it! The website automatically loads the JSON and populates itself.

## Files

- `docs/index.html` - Main HTML template
- `docs/service.json` - Your business data (edit this!)
- `docs/style.css` - Styling
- `docs/script.js` - Loads JSON and populates the page

## How It Works

When the page loads, `script.js` fetches `service.json` and dynamically populates all the content. No build step needed!

## Local Development

To test locally:
```bash
cd docs && npx serve
```
Then open `http://localhost:3000/index.html`
