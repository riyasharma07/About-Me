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
