# Portfolio Plan

**Positioning (one line):** *"I build AI systems that run real businesses: WhatsApp-to-ERP order engines, AI video pipelines, and the mobile apps on top of them."*

Most "eye-catching" portfolios are designers showing off WebGL. Your edge is different: you ship **AI + backend + Flutter products end to end**. The site should make that visible. The best way to do that is with animated **living system diagrams**, not a generic 3D blob.

---

## 1. Inspiration: 10 sites worth studying

| # | Site | What it does well | What to steal |
|---|------|-------------------|---------------|
| 1 | [bruno-simon.com](https://bruno-simon.com) | You drive a 3D car through a physics world to find projects. Awwwards Developer Site of the Year 2019. | **One** memorable interactive gimmick people share. Don't build a whole world. |
| 2 | [dennissnellenberg.com](https://dennissnellenberg.com) | Multilingual "Hello" preloader, magnetic buttons, images revealed on hover over the project list, curved page transitions, a live local-time clock. | The micro-interaction kit. This is the "feels expensive" layer. |
| 3 | [brittanychiang.com](https://brittanychiang.com) | Dark theme, sticky left nav, a spotlight gradient that follows the cursor, clear experience and projects sections. | Recruiter readability. Your info should be scannable in 10 seconds. |
| 4 | [rauno.me](https://rauno.me) | Interaction designer at Vercel with a "Craft" page of small interaction experiments and archived past versions of the site. | A **Lab** page for small experiments and bots. |
| 5 | [henryheffernan.com](https://henryheffernan.com) | A 3D retro computer you zoom into, with a working OS inside it. | A **concept-driven hero**: one idea carried through the whole site. |
| 6 | [joshwcomeau.com](https://joshwcomeau.com) | Spring physics, sound on click, playful details everywhere. | Whimsy that rewards curiosity. |
| 7 | [lynnandtonic.com](https://lynnandtonic.com) | Redesigned every year, with surprising behaviour as you resize the window. | Personality over templates. |
| 8 | [paco.me](https://paco.me) | Minimal site with a ⌘K command menu (Paco Coursey built `cmdk`). | A ⌘K palette that lets you jump to any project. |
| 9 | [robin-noguier.com](https://robin-noguier.com) | A WebGL project slider with distortion and seamless transitions into case studies. | Smooth project-to-case-study transitions. |
| 10 | Recent Awwwards winners: **Léo Parpeix – Portfolio 2026** (Site of the Day + Developer Award, Sep 2026) and **[Huy Phan Vol.2](https://huyml.co/)** (Site of the Day + Developer Award, Oct 14 2026) | Current state of the art. | Browse [Awwwards › Portfolio](https://www.awwwards.com/websites/portfolio/), filtered to the Developer award, before you design. |

**Common pattern among the winners:** one signature idea, smooth scrolling, typography-led layouts, hover reveals, page transitions, and very fast loading. None of them do everything.

---

## 2. Your content: what goes in

Scanned `~/PersonalProjects` and `~/Work`. Grouped by how much each project sells you.

### Flagship case studies (4–5, full pages)

| Project | Folder | Story | Signature visual on the site |
|---|---|---|---|
| **Evolio Order Engine** | `Work/EvolioFMCG`, `Work/EvolioAIWA`, `~/evolio-migration` | WhatsApp and email messages are turned into ERP orders automatically. Built with NestJS, BullMQ, Redis, Mistral OCR and OpenTelemetry. Includes a Flutter app and a live database cutover migration. | **Animated pipeline:** a WhatsApp bubble flies in → AI parses it → an order card lands in the ERP. Use a fake demo message. |
| **DreamPop**: AI video pipeline | `Work/DreamPop` | Images and audio become rendered video. Built with FastAPI, an RQ/Redis job queue, ffmpeg, Deepgram/Auphonic and multiple LLMs, with self-healing workers and monitoring. | An autoplaying output video, plus a job-queue visual showing jobs moving through stages. |
| **AI Interior Design** | `Work/Interior_design` (43 renders) | Next.js 16, NestJS and Supabase with the AI SDK, plus a prompt lab and benchmarks. | A **before/after drag slider** on real renders. This will be the most eye-catching thing on the site. |
| **QRev**: reputation SaaS | `Work/QRMapsReview` | A multi-tenant Next.js 16 and Supabase app with row-level security, a Turborepo monorepo, Sentry/PostHog and AI-drafted review replies. | A dashboard screenshot with parallax, and a QR code that actually works on the page. |
| **ViralPosta** | `Work/ViralPostaBE` | An AI content engine. Built with NestJS, BullMQ, Claude/Gemini/OpenAI through the AI SDK, Stripe and PDF generation. | Generated posts streaming into a feed. |

### Shipped apps (phone-mockup carousel)

- **PermisON** (`SimularePermis`, `PermisONFigmaCOde`): Romanian driving-theory exam app in Flutter, with a scraped question bank and TikTok content (`tiktok_conduzy_top5` has view-count videos). *Show the real numbers.*
- **TruckerTracker**: an offline-first trip logger in Flutter, with drift, background sync and maps. A UI design zip exists.
- **CityIssues**: map-first, anonymous civic reporting with crowd confirmation and a 25 m duplicate check.
- **WA-Muter** (`ChatMuter`): an Android app. Store screenshots are already in `Screenshots/`.
- **Wishmo** and **Lares e-Badge**: client Flutter apps. Show them as logos and roles only, unless the clients allow more.

### Lab (small cards, Rauno-style)

- **Tennis Remote**: Xiaomi Smart Band music buttons used to keep a tennis score, with spoken scores. *Best story on the list; lead the Lab with it.*
- **Meeting Companion**: an Electron app that explains meeting jargon live as you talk.
- **ChatGPT → Claude Migrator**: a Chrome extension (Manifest V3, React 19).
- **Deal Radars**: an OLX listing monitor and a Wizz/Ryanair fare radar, both posting to Telegram. Optionally show a **live "deals found today" counter**.
- **Restaurant Menu Poster AI** and **Shopify negative-review research**: an AI prototype and a data-research piece.

### Leave out
- `Amanda`: off-brand for a dev portfolio.
- `CarFirmware`: it's a prompt file, not a project.
- Anything from the Obsidian vaults. ⚠️ `Work/ObsidianVaultTXT/11 Dreampop.txt` contains **plaintext Auphonic credentials**. Rotate that password and move it to a password manager.
- Client names, screenshots or metrics (Evolio, DreamPop, Wishmo, Lares) **need the client's OK**. Otherwise anonymize them, e.g. "FMCG distributor, RO".

---

## 3. Site structure

```
/            Hero → Selected work (4–5) → Apps carousel → Lab teaser → Stack → Contact
/work/[slug] Case study: problem → system diagram (animated) → key decisions → result/metrics → stack
/lab         Grid of experiments and bots
/about       Short bio, timeline, photo, CV download
⌘K           Command palette available everywhere
```

**Case study template.** Every case study answers four questions: *What was broken? What did I build? What was hard? What changed?* Use numbers wherever you have them: orders per day, minutes saved, videos rendered, TikTok views.

---

## 4. Signature ideas (pick the hero; the rest are supporting)

**Hero: "The Pipeline" (recommended).** A full-width animated SVG system diagram that tells a story as you scroll. A message, image or voice note enters on the left, passes through AI nodes, and comes out as an order, a video or an app screen. Each output node links to its case study.
- Why this one: it's unique to you, says "AI systems builder" instantly, is light to load (SVG + GSAP, no WebGL), and is easy to make responsive.
- Alternative: a 3D phone (React Three Fiber) that rotates through your app recordings on scroll. It's more generic and heavier, so use it for the Apps section instead.

**Supporting effects (Dennis Snellenberg-level polish):**
1. A preloader that cycles "Salut → Hello → Hola…" and finishes on your name.
2. Smooth scrolling with Lenis, plus scroll-scrubbed text reveals by line.
3. A project list where hovering a row shows a floating preview that follows the cursor.
4. Magnetic buttons and a custom cursor that changes label ("View", "Drag", "Play").
5. Page transitions with the native View Transitions API, so the project card morphs into the case-study header.
6. A before/after slider on the interior renders.
7. A ⌘K command palette.
8. A live Cluj clock and an "available for work" status in the footer.
9. Optional: an **"Ask my portfolio"** chat that answers about your projects using Claude and a few markdown files, with a hard rate limit. It fits your AI positioning; skip it if you don't want the running cost.

**Don't do all of it in v1.** The hero, effects 2, 3 and 5, and the before/after slider deliver about 80% of the wow.

---

## 5. Stack

| Need | Pick | Why |
|---|---|---|
| Framework | **Next.js 16 + TypeScript** | You already use it in QRev and Interior Design. |
| Styling | **Tailwind v4** | Same reason. |
| Animation | **GSAP + ScrollTrigger** (free since 2025), **Lenis** | The standard on Awwwards; handles scroll-scrubbed timelines. |
| UI motion | **Motion** (`motion/react`) | Layout and hover springs. Use GSAP for scroll, Motion for components. |
| 3D (optional, one place only) | **React Three Fiber** | Only if you build the 3D phone. |
| Content | **MDX** files in the repo | No CMS needed for about 15 projects. |
| ⌘K | `cmdk` | |
| Deploy | **Vercel** | Preview URLs and analytics. |

**Non-negotiables:** Lighthouse score ≥ 90 on mobile; honour `prefers-reduced-motion` by turning off Lenis and scrubbing; real text, not text baked into images; the site must work on mobile, which is where recruiters open links.

---

## 6. Build order

1. **Content first (1–2 days).** For each project, write a 3-line pitch and gather assets: screen recordings of the Flutter apps (simulator capture), the interior renders, the DreamPop output video, TikTok stats, and client permissions.
2. **Skeleton (1 day).** Next.js, Tailwind, MDX, page routes and typography. Choose one display font, such as Clash Display or PP Neue Montreal, plus Inter.
3. **Hero pipeline (2–3 days).** Draw the SVG in Figma, export it, and animate it with a GSAP ScrollTrigger timeline.
4. **Work list + case-study template (2 days).** Hover previews and view transitions.
5. **Apps carousel + before/after slider + Lab grid (2 days).**
6. **Polish (2 days).** Preloader, cursor, magnetic buttons, ⌘K, footer clock.
7. **Performance and accessibility pass, then launch (1 day).** Submit to Awwwards, CSS Design Awards and Godly for exposure.

About 2 weeks of focused work.

---

## 7. Before building, decide

- Your name, a photo, and the domain.
- Which clients allow you to name them.
- Language: EN only, or EN + RO. Recommend **EN only** for v1.
- Whether you want the AI chat and its running cost.

Sources: [Awwwards Portfolio](https://www.awwwards.com/websites/portfolio/) · [Awwwards Developer inspiration](https://www.awwwards.com/inspiration_search/developer/) · [Three.js portfolios roundup](https://dev.to/hr21don/six-stunning-web-developer-portfolios-showcasing-threejs-mastery-206n) · [Elementor dev portfolio examples](https://elementor.com/blog/inspiring-web-developer-portfolio-examples/)
