# DECK 97 Website

Official static website for **DECK 97**.

Production domain: https://deck97game.com

## Stack

- Astro 5
- Fully static output
- Minimal client JavaScript (gallery dialog only)
- GitHub Pages deployment through GitHub Actions

## Local development

```powershell
& {
    Set-Location E:\Omni\deck97_website
    npm ci
    npm run dev
}
```

Production verification:

```powershell
& {
    Set-Location E:\Omni\deck97_website
    npm ci
    npm run build
    npm run validate
}
```

## Public configuration

Edit `src/data/site.ts` for public URLs and release-state values. Steam, Kickstarter, contact, and social links are nullable; no CTA is rendered as functional unless a real URL is configured.

## Media

Original source material stays in `raw/`. Do not delete or casually rename it. Website media selected from those originals lives in `public/media/`; see `docs/MEDIA.md` for the source-to-public mapping.

## Deployment

Pushes to `development` run `.github/workflows/deploy.yml`, build the static site, validate the generated output, and deploy `dist/` to GitHub Pages.

`public/CNAME` contains `deck97game.com`, and Astro's canonical `site` is set to the root custom domain (not `/deck97_website/`).
