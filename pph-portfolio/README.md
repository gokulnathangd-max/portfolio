# PeoplePerHour Freelance Portfolio

A high-converting, accessible static portfolio website for freelance developer Gokul, engineered specifically to be linked from a **PeoplePerHour (PPH)** profile and proposal pitches.

---

## Key Highlights & Hard Rules Compliance

- **PPH-Only Funnel**: Zero external contact forms, emails, phone numbers, WhatsApp, or mailto links anywhere on the site.
- **Unified Action**: Every call to action reads `"Hire me on PeoplePerHour"` and links to your PPH profile via `js/config.js`. If empty, all CTA buttons are hidden automatically to prevent dead links.
- **Strict Factual Accuracy**: Zero invented testimonials, fake ratings, fictional statistics, or stock photos.
- **Performance & Accessibility**: Pure semantic HTML5, modern vanilla CSS, and vanilla JS. WCAG AA contrast ratio compliance, >=44px touch targets, visible focus states, and respects `prefers-reduced-motion`.

---

## File Structure

```text
pph-portfolio/
├── index.html                   # Homepage: Value prop, How I work strip, 4 services, featured case study, credentials
├── services.html                # 4 Fixed-scope offers (inclusions/exclusions/timelines) + 1-on-1 DSA mentoring
├── about.html                   # Education (SKCET CSE Cyber Sec), certifications, time-zone workflow
├── work/
│   ├── hillcoast-connect.html   # Case study: HillCoast Connect (Spring Boot, React, MySQL, Maps API, MSME 5.0)
│   └── agri-twin.html           # Case study: Agri-Twin (Fastify, TypeScript, React, Three.js 3D twin)
├── css/
│   └── style.css                # Brand styles (#0F6B5C accent, #F3F6F4 bg, #12201C ink, Space Grotesk, IBM Plex Sans)
├── js/
│   ├── config.js                # Single source of truth for links, delivery times, and placeholders
│   └── main.js                  # Dynamic DOM hydration, menu accessibility, and auto-hiding logic
└── README.md                    # Setup, configuration guide, and deployment instructions
```

---

## How to Edit `js/config.js`

All dynamic URLs, project repositories, delivery times, and custom contribution notes are controlled in [`js/config.js`](js/config.js).

### Configuration Options:

```javascript
const SITE_CONFIG = {
  // 1. PeoplePerHour Profile URL
  // Paste your actual PPH freelancer URL here:
  pphProfileUrl: "https://www.peopleperhour.com/freelancer/technology-programming/...",

  // 2. Developer Profiles (Leave as "" to hide)
  github: "https://github.com/gokulnathangd-max",
  linkedin: "", // e.g. "https://www.linkedin.com/in/gokul"

  // 3. Typical Delivery Times (Shown as badges on Services page)
  deliveryTimes: {
    fixAndFinish: "2 - 5 business days",
    integrations: "3 - 7 business days",
    dashboards: "1 - 2 weeks",
    threeJsViewers: "1 - 3 weeks",
    mentoring: "1-hour dedicated sessions"
  },

  // 4. Case Studies Links & Assets
  projects: {
    hillCoastConnect: {
      github: "",               // e.g. "https://github.com/..."
      live: "",                 // e.g. "https://..."
      screenshot: "",           // Image path e.g. "../assets/hillcoast.webp"
      specificContribution: ""  // Optional detailed custom note
    },
    agriTwin: {
      github: "",
      live: "",
      screenshot: "",
      specificContribution: ""
    }
  }
};
```

> **Hiding Behavior**: If any field is set to an empty string (`""`), its associated button, badge, or link is hidden automatically from the rendered page.

---

## Local Development & Testing

You can preview the site locally using any lightweight HTTP server.

### Option 1: Python HTTP Server (Built-in)
Run from the `pph-portfolio` directory:
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option 2: Node.js (npx serve)
```bash
npx serve .
```

---

## Deploying to Cloudflare Pages (Recommended)

Cloudflare Pages provides global CDN edge delivery with zero build step required.

### Method A: Via Git Integration (Automated Deployments)

1. Push this branch (`pph-portfolio`) to your GitHub repository:
   ```bash
   git push -u origin pph-portfolio
   ```
2. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
4. Select your `portfolio` repository.
5. In the **Set up builds and deployments** section:
   - **Project Name**: `gokul-pph-portfolio` (or your choice)
   - **Production branch**: `pph-portfolio` (or merge to `main`)
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank)*
   - **Build output directory / Root directory**: `pph-portfolio`
6. Click **Save and Deploy**. Your site will be live on a `*.pages.dev` domain in under 30 seconds.

---

### Method B: Via Wrangler CLI (Direct Upload)

If you prefer deploying directly from your terminal using Wrangler:

1. Install or authenticate Wrangler:
   ```bash
   npx wrangler login
   ```
2. Deploy the `pph-portfolio` folder directly:
   ```bash
   npx wrangler pages deploy pph-portfolio --project-name=gokul-pph-portfolio
   ```
3. Cloudflare will upload all static files and print your production URL.

---

## Deploying to Cloudflare Workers (Alternative)

If deploying as a Worker with static assets:

1. Inside `pph-portfolio`, create a `wrangler.toml`:
   ```toml
   name = "gokul-pph-portfolio"
   main = "src/index.js"
   compatibility_date = "2024-01-01"

   [site]
   bucket = "./"
   ```
2. Deploy via:
   ```bash
   npx wrangler deploy
   ```
