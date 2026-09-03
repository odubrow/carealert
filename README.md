# CareAlert website — setup guide

No coding required. This takes about 15 minutes, once, and then you can edit
the site forever from a simple dashboard.

## What's in this folder
- `index.html`, `css/`, `js/` — the actual website (don't need to touch these)
- `content/` — every piece of text on the site, as simple files. This is what
  you'll edit.
- `admin/` — your visual editor (like a mini CMS)

---

## Part 1 — Put the site online (one-time setup, ~15 min)

### Step 1: Create a free GitHub account
Go to [github.com](https://github.com) → Sign up. This is just a place to
store your website's files (like a Google Drive for code — you won't write
any code).

### Step 2: Create a new repository
1. Click the **+** icon top-right → **New repository**
2. Name it `carealert-website`
3. Keep it **Public**, click **Create repository**

### Step 3: Upload this folder
1. On your new repo's page, click **uploading an existing file**
2. Drag in **everything inside this folder** (all files and folders —
   `index.html`, `css`, `js`, `content`, `admin`, `netlify.toml`, `images`)
3. Scroll down, click **Commit changes**

### Step 4: Create a free Netlify account
Go to [netlify.com](https://netlify.com) → sign up **with your GitHub
account** (easiest option).

### Step 5: Deploy the site
1. In Netlify, click **Add new site → Import an existing project**
2. Choose **GitHub**, then select your `carealert-website` repo
3. Leave all settings as-is, click **Deploy site**
4. In under a minute, you'll get a free live link like
   `https://random-name-123.netlify.app` — that's your real, working website

Tip: In Netlify, go to **Site configuration → Change site name** to make the
address `carealert.netlify.app` instead of a random name.

### Step 6: Turn on the editor (Identity + Git Gateway)
This is what lets you log in and edit the site with no code.
1. In your Netlify site dashboard, go to **Site configuration → Identity**
   → click **Enable Identity**
2. Go to **Identity → Registration**, set to **Invite only** (keeps
   strangers from signing up to edit your site)
3. Go to **Identity → Services → Git Gateway** → click **Enable Git Gateway**
4. Go to the **Identity** tab (top-level, not settings) → **Invite users**
   → enter your own email → you'll get an email invite, click it, set a
   password

### Step 7: Log into your editor
Go to `https://YOUR-SITE-NAME.netlify.app/admin/` and log in with the
password you just set. You'll see a dashboard with every section of your
site listed — click any one, edit it, hit **Publish**. Changes go live in
about a minute.

---

## Part 2 — Editing your site (forever, no code)

Go to `/admin/` on your site any time. You'll see these sections, each
matching a part of the page:

- **Site Settings** — your colors, fonts, font size, logo text, social
  links, contact email. Change a color here and the whole site updates.
- **Hero Section** — the big headline at the top
- **Stat Bar** — the three highlighted numbers
- **About Section** — this is your **tabs**: Our Mission / Our Team /
  Partners are three tabs edited right here, including adding/removing team
  members and uploading their photos
- **How It Works** — the four numbered steps
- **What We Offer** — the feature cards
- **Impact** — the pilot section and quote
- **Contact Section** — the text next to your contact form

**To add an image:** click into any field with an image icon, click
**Choose an image**, upload from your computer. Done.

**To change fonts:** in Site Settings, type any font name from
[Google Fonts](https://fonts.google.com) exactly as spelled there (e.g.
`Merriweather`, `Poppins`, `Playfair Display`).

**The contact form** already works out of the box — Netlify collects
submissions for free. View them anytime in your Netlify dashboard under
**Forms**.

**Adding more tabs, nav items, or whole new sections** — that part *does*
need a small code change (new tabs aren't auto-generated from content the
way text is). Come back to Claude any time and ask to add a section; paste
in this project's files and describe what you want.

---

## Part 3 — Getting carealert.com (optional, later)

If your team ever wants the real `carealert.com` domain:
1. Buy it from a registrar (Namecheap, Google Domains successor Squarespace
   Domains, etc.) — about $10-15/year, no way around this cost, but it's
   independent of hosting, which stays free.
2. In Netlify: **Site configuration → Domain management → Add a domain** →
   enter `carealert.com` → follow the DNS instructions Netlify gives you.

Nothing about your site or editor changes — the address just points to the
same free site.
