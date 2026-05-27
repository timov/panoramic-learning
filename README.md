# Panoramic Learning — GitHub Pages Showcase

A static HTML/CSS preview of the Panoramic Learning website for client approval.

## How to deploy to GitHub Pages

1. Create a new **public** GitHub repository (e.g. `panoramic-learning-preview`)
2. Upload the contents of this `github-pages/` folder to the repository root
3. Go to **Settings → Pages** in the repository
4. Under **Source**, select the `main` branch and `/ (root)` folder, then click **Save**
5. Your site will be live at `https://yourusername.github.io/panoramic-learning-preview/`

## Folder structure

```
index.html          ← Main page (English)
style.css           ← Stylesheet
script.js           ← Interactivity (nav, carousel, FAQ, form demo)
scroll-animate.js   ← Scroll reveal animations
.nojekyll           ← Tells GitHub Pages not to use Jekyll
images/             ← All images
  full-logo.png
  logo.png
  black-logo.png
  tulip-field.jpeg
  about-photo.png
  team-photo.png
  home-made.jpg
  expat-directory.png
  panoramic-advice.png
  situ.jpg
```

## Notes

- The booking form shows a demo confirmation message — no data is sent anywhere
- The language switcher button links to `index-nl.html` (Dutch version, not yet included)
- All fonts load from Google Fonts (requires internet connection)
