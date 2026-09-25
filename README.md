# Riya Sharma — Portfolio

A modern, animated personal portfolio website built with React, TypeScript, and Framer Motion.

🌐 **Live at:** https://riyasharma07.github.io/About-Me/
---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Font | Inter + JetBrains Mono (Google Fonts) |

---

## Features

- **Interactive particle background** — reacts to mouse movement
- **Typewriter animation** — cycles through roles in the hero section
- **Scroll-triggered animations** — every section animates in on scroll
- **Glassmorphism dark theme** — neon cyan & purple accents
- **Animated skill bars** — with shimmer effect on hover
- **Expandable project cards** — accordion-style experience section
- **Contact form** — opens email client pre-filled (see below for real inbox delivery)
- **Fully responsive** — mobile, tablet, and desktop

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── ParticleBackground.tsx   # Canvas particle system
│   ├── Navbar.tsx               # Sticky nav with active section indicator
│   ├── Hero.tsx                 # Typewriter, stats, floating badges
│   ├── About.tsx                # Bio, tech stack, achievements
│   ├── Skills.tsx               # Animated skill bars by category
│   ├── Experience.tsx           # FieldAssist — DMS & MapGPT projects
│   ├── Education.tsx            # GLA University
│   ├── Contact.tsx              # Contact form + info cards
│   ├── Footer.tsx               # Footer with nav links
│   └── SocialIcons.tsx          # GitHub & LinkedIn SVG icons
├── data/
│   └── portfolio.ts             # ← All your personal data lives here
├── hooks/
│   └── useInView.ts             # Intersection Observer hook
├── App.tsx
├── main.tsx
└── index.css                    # Tailwind + custom CSS (glassmorphism, neon glows)
```

---

## Customization

All personal content is centralized in **`src/data/portfolio.ts`** — edit that file to update:

- Name, title, roles, bio, location, email, phone
- LinkedIn and GitHub URLs
- Stats (users, RPS, etc.)
- Skills and proficiency levels
- Experience, projects, and highlights
- Education details

---

## Enabling Real Email Delivery

The contact form currently opens the visitor's email client via `mailto:`. To receive messages **directly in your inbox**, integrate [EmailJS](https://www.emailjs.com/) (free, 200 emails/month, no backend needed):

1. Create a free account at emailjs.com
2. Add a Gmail service and create an email template
3. `npm install @emailjs/browser`
4. Replace the `handleSubmit` logic in `src/components/Contact.tsx`

---

## Deployment

**Vercel (recommended — free):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Drag & drop the dist/ folder to netlify.com/drop
```

---

## Contact

**Riya Sharma** · sharmariyasharma1039@gmail.com · Gurugram, India

## Iris – AI assistant

Iris is a chat widget (`src/components/Iris.tsx`) backed by a Vercel serverless function (`api/iris.ts`) that uses LangChain + Google Gemini. Its knowledge is built from `src/data/portfolio.ts` (plus `extraFacts` in `api/_lib/knowledge.ts`), so updating the site data updates Iris.

**Deploy the API to Vercel**
1. Import this repo in Vercel and set the Root Directory to `portfolio`.
2. Add the backend env vars from `.env.example` (`GOOGLE_API_KEY`, optional `GEMINI_MODEL`, `ALLOWED_ORIGINS`).
3. Deploy, then check `https://<project>.vercel.app/api/iris`.

**Point the site at it**
- Create `portfolio/.env.production.local` with `VITE_IRIS_API_URL=https://<project>.vercel.app/api/iris`, then `npm run deploy`.

**Local development**
- `npx vercel dev` runs the site and the function together (put `GOOGLE_API_KEY` in `.env.local`).
