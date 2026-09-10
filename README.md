# DECK 97 Website

Official static site for **DECK 97**.

Production domain: `https://deck97game.com`

## Local development

```powershell
npm install
npm run dev
```

## Production verification

```powershell
npm run build
npm run validate
npm run preview
```

The landing page is built with Astro and deployed as static output. Source media lives under `raw/`; selected site media is mapped into `src/assets/` and optimized by `astro:assets` during production builds. See `docs/MEDIA.md` for the current mapping.

External campaign/store URLs are configuration-driven in `src/data/site.ts`. Until a real Steam URL is configured, the public CTA intentionally renders **COMING TO STEAM** without pretending to be a functional wishlist link.
