# Mobile Detailing Directory

A production-ready Next.js 14 directory website for mobile car detailers in the USA. Part of a 5-site directory portfolio sharing a single Supabase project.

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/YOURUSERNAME/mobile-detailing-directory.git
cd mobile-detailing-directory
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in your Supabase and Resend credentials

# 3. Set up Supabase (see below)

# 4. Seed the database
npm install -D dotenv
npm run seed

# 5. Run locally
npm run dev
```

## Environment Variables

| Variable | Where to get it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role key (keep secret!) |
| `RESEND_API_KEY` | resend.com → API Keys |

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com) (or use your shared project)
2. Go to **SQL Editor** and paste the contents of `supabase-schema.sql`
3. Run the SQL to create all tables, indexes, and RLS policies
4. Create a storage bucket called `md-photos` (Dashboard → Storage → New Bucket → name: `md-photos`, public: true)
5. Copy your API credentials to `.env.local`

## Seed the Database

```bash
npm install -D dotenv
npm run seed
```

This inserts 50 realistic detailing listings across 10 major US cities, plus reviews for featured listings.

## Deploy to Vercel

1. Push repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all 4 environment variables
4. Deploy — Vercel will build all 200+ static pages automatically

## Post-Launch Checklist

### LLM SEO (do this immediately after deploy)

- [ ] Submit `sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit `sitemap.xml` to [Bing Webmaster Tools](https://www.bing.com/webmasters) — **Bing powers ChatGPT's live web search**
- [ ] Verify `https://YOURDOMAIN.com/llms.txt` is accessible
- [ ] Verify `https://YOURDOMAIN.com/llms-full.txt` loads full content
- [ ] Verify `robots.txt` allows GPTBot, PerplexityBot, ClaudeBot

### Traditional SEO

- [ ] Set up Google Analytics
- [ ] Submit to Google Business Profile if applicable
- [ ] Start building backlinks (see strategy below)

## Managing Listings

### Approve/Reject Listings
1. Go to `/admin` and sign in with your Supabase auth credentials
2. Review pending listings in the "Pending" tab
3. Click Approve or Reject

### Mark as Featured
Toggle the star icon on any listing in the admin dashboard. Featured listings appear first with an orange badge and receive lead emails. Charge $29/mo via manual Stripe link.

### Add New City Pages
Add a city object to `data/cities.ts` and redeploy. Vercel auto-builds the new static page.

## Affiliate Links

Replace placeholder URLs in the codebase:
- Search for `YOURCODE` in the project
- Replace with your actual affiliate codes from:
  - Chemical Guys affiliate program
  - Adam's Polishes referral program
  - Detailed Image affiliate program

## Monetization

1. **Featured listings** — $29/mo, toggled via admin
2. **Affiliate links** — product recommendations in blog + service pages
3. **Lead gen** — "Get 3 Free Quotes" connects car owners to featured detailers
4. **Mediavine ads** — placeholders ready, apply at 10K sessions/mo
5. **$19 PDF checklist** — link to Gumroad product

## Backlink Strategy

### The $50 Swap Tactic
1. Find local business directories and chamber of commerce sites
2. Offer to link to them from your city page in exchange for a backlink
3. Email detailers you list — ask them to link back from their site

### Ahrefs Workflow
1. Find competitor backlinks using Ahrefs Site Explorer
2. Replicate their links via outreach
3. Target resource pages, business directories, and auto blogs

## Data Enrichment

Use the Claude API or [enrich.directory](https://enrich.directory) to:
- Bulk-add descriptions from business websites
- Extract services and pricing from Google Business profiles
- Generate city-specific content variations

## Tech Stack

- **Framework:** Next.js 14 (App Router, SSG)
- **Styling:** Tailwind CSS
- **Database:** Supabase (shared project, `md_` table prefix)
- **Email:** Resend
- **Deployment:** Vercel
- **Blog:** MDX via next-mdx-remote
