# ⚡ Quick Start Guide

## Create a New Client Site in 3 Steps

### Step 1: Edit Config
```bash
cd template
cp config.json client-name.json
nano client-name.json  # or use any text editor
```

**What to change:**
- `business.name` → Client's business name
- `business.tagline` → Three-word tagline
- `business.subtitle` → One-line description
- `services` → List their services (add/remove as needed)
- `brandColor` → Their primary color (hex code)

### Step 2: Generate Site
```bash
python generate.py client-name.json ../client-site
```

### Step 3: Add Images
```bash
cp client-background.jpg ../client-site/background.jpg
cp client-photos/* ../client-site/images/
```

**Done!** Open `../client-site/index.html` to preview.

---

## Full Example

```bash
# 1. Copy and edit config
cp config.json acme-landscaping.json
# Edit acme-landscaping.json with their info

# 2. Generate
python generate.py acme-landscaping.json ../acme-site

# 3. Add images
cp acme-bg.jpg ../acme-site/background.jpg
cp acme-photos/*.jpg ../acme-site/images/

# 4. Preview
open ../acme-site/index.html  # Mac
# or xdg-open ../acme-site/index.html  # Linux
# or start ../acme-site/index.html  # Windows
```

---

## Common Edits

### Change Colors
```json
"brandColor": "#1a5f3b",           ← Your client's primary color
"brandColorHover": "#2a8f5b"       ← Lighter version for hovers
```

### Add a Service
```json
"services": [
  {
    "name": "New Service",
    "description": "What this service includes..."
  }
]
```

### Change Tagline
```json
"tagline": "Your. Three. Words."   ← Splits on spaces, animates each word
```

### Update Images List
```json
"images": [
  "images/project1.jpg",
  "images/project2.jpg",
  "images/project3.jpg"
]
```

---

## Deploy Checklist

- [ ] Test locally in browser
- [ ] Check mobile view (Chrome DevTools)
- [ ] Verify all images load
- [ ] Test carousel swipe on mobile
- [ ] Click all navigation links
- [ ] Test form (if integrated)
- [ ] Check brand colors match client
- [ ] Compress images if needed
- [ ] Upload to hosting
- [ ] Test live site
- [ ] Send to client for approval

---

## Time Estimate

- **First site:** 30-45 min (learning the system)
- **Subsequent sites:** 15-20 min (once you have assets)
- **With pre-optimized images:** 10 min

---

## Need Help?

See `README.md` for full documentation.

**Common Issues:**
- Images not showing → Check file paths match config exactly
- Colors not right → Verify hex codes, regenerate site
- Script error → Check JSON syntax (use JSONLint.com)
