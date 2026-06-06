# Riff — Marketing Website

> Understand someone before you see them.

The official marketing website for Riff, built with Next.js 15 and deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19
- **Fonts:** Sora (headings) + Plus Jakarta Sans (body) via Google Fonts
- **Hosting:** Vercel (free tier)

## Project Structure

```
riff-website/
├── app/
│   ├── globals.css      # Global styles, variables, responsive
│   ├── layout.js        # Root layout with metadata + fonts
│   └── page.js          # Main marketing page (all sections)
├── public/
│   └── logo.png         # Riff logo
├── package.json
├── next.config.js
├── jsconfig.json
└── .gitignore
```

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Riff website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/riff-website.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up/log in
   - Click **"Add New Project"**
   - Select **"Import Git Repository"**
   - Choose your `riff-website` repo
   - Framework will auto-detect as **Next.js**
   - Click **"Deploy"**

3. **Your site is live!** Vercel gives you a URL like `riff-website.vercel.app`

4. **Add custom domain:**
   - In Vercel dashboard → your project → **Settings** → **Domains**
   - Add `riff.app` (or your domain)
   - Update your domain's DNS records as instructed by Vercel

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time will prompt for setup)
vercel

# Deploy to production
vercel --prod
```

## Custom Domain Setup

1. Purchase your domain (e.g., `riff.app`) from any registrar
2. In Vercel: Project → Settings → Domains → Add domain
3. Vercel will provide DNS records to add:
   - `A` record: `76.76.21.21`
   - `CNAME` record: `cname.vercel-dns.com`
4. SSL certificate is automatic — no configuration needed

## Environment Variables

For future backend integration, add these in Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://api.riff.app
NEXT_PUBLIC_WS_URL=wss://api.riff.app
```

## What's Included

- **Hero** — Headline, phone mockup, download CTAs, social proof
- **How it works** — 5-stage journey explained
- **Features** — Deep Connection + Friend Circle modes
- **Safety** — 6 trust & safety features
- **Practice Mode** — AI companion explanation
- **Pricing** — 3 tiers with monthly/yearly toggle
- **FAQ** — 7 expandable questions
- **CTA** — App Store + Google Play download
- **Footer** — Links, social, legal

## Next Steps

- [ ] Connect app store links when apps are published
- [ ] Add blog pages (`app/blog/page.js`)
- [ ] Add about page (`app/about/page.js`)
- [ ] Set up Railway backend (`api.riff.app`)
- [ ] Add analytics (PostHog or Vercel Analytics)
- [ ] Add cookie consent banner for GDPR

## License

Proprietary — © 2026 Riff. All rights reserved.
