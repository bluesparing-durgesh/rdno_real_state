# EDNO — Premium Luxury Real Estate Registry

A curated luxury real estate platform featuring the world's most significant architectural landmarks and residential sanctuaries. Built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**.

---

## ✨ Features

- 🏠 **Curated Property Registry** — 11+ ultra-luxury properties across Malibu, New York, Aspen, Mumbai, Goa, Delhi & Udaipur
- 🌗 **Dark / Light Mode** — Premium glass-morphism design with seamless theme switching
- 🔍 **Advanced Filtering** — Filter by city, type, community, budget (₹ Crore), beds & baths
- 📊 **Analytics Dashboard** — Personal viewing, comparison, and favorites tracking
- 👔 **Agent Profiles** — Dedicated pages for luxury real estate advisors
- 📝 **Registry Briefs** — Curated insights blog on luxury real estate trends
- 📱 **Fully Responsive** — Mobile-first design with animated interactions
- ⚡ **Production-Optimized** — Static generation, image optimization, security headers

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + Vanilla CSS |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Theme | next-themes |
| Carousel | Embla Carousel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=20.0.0`
- npm `>=10.0.0`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/edno.git
cd edno

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and auto-fix issues |
| `npm run type-check` | Run TypeScript compiler checks |
| `npm run clean` | Remove build artifacts (`.next`, `out`, `dist`) |

---

## 🌍 Environment Variables

Copy `.env.example` to `.env.local` and fill in values before running:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Full public URL, e.g. `https://edno.luxury` |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

> **Never commit `.env.local` or any file containing secrets.** See `.gitignore`.

---

## 🚢 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Push to your GitHub repo — Vercel auto-detects Next.js and configures the build.

### Docker / Self-hosted

Uncomment `output: "standalone"` in [`next.config.ts`](./next.config.ts), then:

```bash
npm run build
# Build Docker image
docker build -t edno .
docker run -p 3000:3000 edno
```

### Manual (Node.js server)

```bash
npm run build
npm run start          # Serves on port 3000
PORT=8080 npm start    # Custom port
```

---

## 🏗 Project Structure

```
edno/
├── public/              # Static assets (favicons, og-images)
├── src/
│   ├── app/             # Next.js App Router pages & layouts
│   │   ├── page.tsx     # Home page
│   │   ├── properties/  # Property listing & detail pages
│   │   ├── agents/      # Agent profiles
│   │   ├── blogs/       # Registry Briefs blog
│   │   ├── contact/     # Contact form
│   │   ├── about/       # About EDNO
│   │   ├── dashboard/   # Analytics dashboard
│   │   └── faq/         # FAQ
│   ├── components/
│   │   └── custom/      # All UI components
│   ├── constants/
│   │   └── mock-data.ts # Property, agent & community data
│   ├── hooks/           # Custom React hooks
│   └── lib/
│       └── utils.ts     # Utility functions (formatPrice, cn)
├── .env.example         # Environment variable template
├── .gitignore
├── next.config.ts       # Next.js config (security headers, image domains)
├── package.json
├── postcss.config.mjs
├── tailwind.config      # (Tailwind v4 — inline config in CSS)
└── tsconfig.json
```

---

## 🔒 Security

- `X-Frame-Options: DENY` — prevents clickjacking
- `Strict-Transport-Security` — enforces HTTPS with 1-year preload
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `Permissions-Policy` — disables camera, microphone, geolocation
- `Content-Security-Policy` — restricts resource origins
- `poweredByHeader: false` — hides Next.js fingerprint

---

## 📄 License

Private — All rights reserved © 2026 EDNO Real Estate Registry.
