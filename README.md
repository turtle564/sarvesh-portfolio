# sarveshsajan.com

Personal site of Sarvesh Sajan Pottangadi. It's a plain static site: everything that gets published is in `site/`.

## Preview it on your computer

Open `site/index.html` in Chrome or Edge. Nothing needs installing.

## Publish

Merge into `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml` publishes `site/` to GitHub Pages.

## What's where

- `site/index.html`: the page
- `site/css/site.css`: styles
- `site/js/main.js`: scroll effects, menu, photo viewer, music, video sound
- `site/img`, `site/media`, `site/fonts`: photos, video and music, fonts
- `site/cv/Sarvesh-Sajan-CV.pdf`: the CV the download button opens. Replace this file to update it. (`site/Sarvesh Sajan CV.pdf` keeps the old link working.)

## Security notes

- The page may only load its own files: a Content-Security-Policy in the page blocks scripts, styles and fonts from anywhere else. Keep JavaScript in `js/main.js`, not inline in the HTML, or the policy will block it.
- No phone number on the site. The email address is assembled by the script so address-harvesting bots don't find it in the HTML.
- Strip location data from photos before adding them. The deploy fails if a file contains GPS coordinates.
- GitHub Actions are pinned to exact commits; Dependabot opens a pull request when they need updating.
