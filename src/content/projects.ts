export const SITE = {
  name: "Bogdan Puri",
  role: "AI systems & app developer",
  location: "Cluj-Napoca, RO",
  timeZone: "Europe/Bucharest",
  email: "puribogdan@gmail.com",
};

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  client: string;
  role: string;
  tagline: string;
  tags: string[];
  problem: string;
  built: string;
  hard: string;
  outcome: string;
  flow: string[];
  decisions: { title: string; body: string }[];
  facts?: { value: string; label: string }[];
  stack: string[];
  // Work-list preview: one landscape image, or a few screens (phones, posts) laid side by side.
  cover?: { src: string } | { tiles: string[]; aspect: string };
  beforeAfter?: { before: string; after: string; label: string }[];
};

export type App = {
  name: string;
  tagline: string;
  platform: string;
  stack: string[];
  screens?: string[];
  points?: string[];
  car?: { screen: string; phone: string };
};

export type LabItem = {
  name: string;
  tagline: string;
  stack: string[];
  kind: string;
};

export const WORK: CaseStudy[] = [
  {
    slug: "evolio-order-engine",
    cover: { tiles: ["/work/evolio/home.jpg", "/work/evolio/order.jpg", "/work/evolio/orders.jpg"], aspect: "412 / 860" },
    title: "Evolio Order Engine",
    year: "2026",
    client: "Evolio · FMCG distribution, RO",
    role: "Backend, AI pipeline, Flutter agent app",
    tagline: "WhatsApp and email messages become ERP orders.",
    tags: ["AI pipeline", "Backend", "Flutter"],
    problem:
      "Shop owners order the way they talk: “10 baxuri de apă și 3 Cola” on WhatsApp, or a loose email. Someone had to read every message, work out the products, and retype it all into the ERP.",
    built:
      "Two ways in (a WhatsApp webhook and an IMAP poller), one pipeline, two ways out. Messages are grouped into a batch per customer, a language model turns the batch into order lines, and every line is matched to a real catalogue product. Clean batches go straight into the Nibo ERP. Anything ambiguous lands in a reviewer’s queue in the Flutter agent app. I then rebuilt the original Express service in NestJS, porting the domain logic instead of rewriting it, and ran the live database cutover.",
    hard:
      "A wrong order costs more than a slow one. The rule became: nothing is submitted automatically unless every part of it is confident. The model scores; code decides. Work is made durable before it is acknowledged, and retries refuse to replay a write that isn’t idempotent.",
    outcome:
      "It runs in production from main. The rewrite replaced the old service surface by surface, with zero endpoints removed and every remaining contract difference deliberate and documented.",
    flow: ["WhatsApp · Email", "Batch per customer", "LLM interpreter", "Catalogue match", "Confidence gate", "ERP or human review"],
    decisions: [
      { title: "The model scores, code decides", body: "The LLM proposes order lines with confidence. Deterministic code makes the final call on what gets submitted." },
      { title: "Durable before acknowledged", body: "A message is persisted and queued before the webhook returns, so a crash never loses an order." },
      { title: "Redis schedules, Postgres decides", body: "BullMQ handles timing; the database is the source of truth for what is still outstanding." },
      { title: "Zod is the only schema language", body: "One schema validates HTTP input, environment config and model output, and generates the API contract." },
    ],
    facts: [
      { value: "12,290", label: "lines of domain logic ported" },
      { value: "1,477", label: "of them coupled to Express" },
      { value: "25", label: "API endpoints, auth on by default" },
      { value: "0", label: "endpoints lost in the rewrite" },
    ],
    stack: ["NestJS", "BullMQ", "Redis", "Supabase", "Postgres", "Zod", "Mistral", "OpenTelemetry", "Flutter"],
  },
  {
    slug: "ai-interior-design",
    title: "AI Interior Design",
    year: "2026",
    client: "Interior design startup",
    role: "Full-stack, AI pipeline, prompt lab",
    tagline: "A photo of your room in. A redesign with real products out.",
    tags: ["Generative AI", "Full-stack"],
    problem:
      "Most AI redesign tools return a pretty but generic room: furniture you can’t buy, at a scale that wouldn’t fit, in a room that no longer looks like yours.",
    built:
      "A multi-step agent pipeline that reads the room, adapts a style to its actual size, picks real products from a catalogue and renders them in place. The app is a Next.js front end with AI streaming in a NestJS backend. Next to it, a prompt lab that benchmarks prompt variants across rooms and camera angles.",
    hard:
      "Changing everything in the room while keeping the room itself: the same walls, windows, light and camera. Every prompt change was benchmarked against a fixed set of rooms instead of judged by eye.",
    outcome:
      "Renders that keep the architecture intact and swap in furniture that exists. Drag the sliders below to compare.",
    flow: ["Room photo", "Room analysis", "Style fitted to size", "Product catalogue", "Render", "Benchmark"],
    decisions: [
      { title: "Measure, don’t eyeball", body: "A prompt lab with saved benchmark reports, so every change is compared against the same rooms." },
      { title: "AI streams from the backend", body: "Model calls live in NestJS behind ports and adapters, so providers can be swapped without touching the UI." },
      { title: "Swappable foundations", body: "Database and auth sit behind interfaces in a Turborepo monorepo to keep the blast radius of change small." },
    ],
    stack: ["Next.js 16", "NestJS 11", "Supabase", "Vercel AI SDK", "AI Gateway", "Turborepo"],
    beforeAfter: [1, 2, 3, 4].map((i) => ({
      before: `/work/interior/before-${i}.jpg`,
      after: `/work/interior/after-${i}.jpg`,
      label: `Room ${i}`,
    })),
  },
  {
    slug: "dreampop",
    cover: { src: "/work/dreampop.jpg" },
    title: "DreamPop",
    year: "2025–26",
    client: "DreamPop",
    role: "Backend, AI video pipeline, infrastructure",
    tagline: "Personalised storybook videos, rendered by a queue of AI workers.",
    tags: ["AI video", "Backend"],
    problem:
      "Turning a story idea into a finished, narrated video takes a scriptwriter, an illustrator, an animator and an editor. DreamPop wanted it to take one request.",
    built:
      "A pipeline that writes the script with an LLM, illustrates each scene, animates the illustrations into video clips, cleans up the narration, adds subtitles and merges it all with ffmpeg. A FastAPI web service hands jobs to Redis-backed RQ workers running on separate instances.",
    hard:
      "Long jobs on cheap instances. Workers ran out of memory or got stuck halfway, and the web and worker processes didn’t share a disk. Job status moved into Redis, files were staged through cloud storage, and recovery scripts restart stuck jobs.",
    outcome:
      "Video models can be switched per run (Kling or WAN) and prompts edited from an admin page without a deploy, so the team can trade quality against cost on the fly.",
    flow: ["Story prompt", "Script (LLM)", "Scene illustrations", "Image → video clips", "Voice + subtitles", "Final video"],
    decisions: [
      { title: "Split web and worker", body: "The API stays responsive while heavy renders run on their own instances." },
      { title: "Models behind a switch", body: "Image-to-video backends are swappable from config, because model prices and quality change monthly." },
      { title: "Stop-after-images flag", body: "Test the expensive pipeline up to the cheap stage first." },
    ],
    stack: ["Python", "FastAPI", "Redis", "RQ", "ffmpeg", "Replicate", "OpenAI", "Anthropic", "Deepgram", "Auphonic"],
  },
  {
    slug: "qrev",
    cover: { src: "/work/qrev.jpg" },
    title: "QRev",
    year: "2026",
    client: "SaaS product",
    role: "Architecture, full-stack",
    tagline: "Reputation management for local businesses.",
    tags: ["SaaS", "Full-stack"],
    problem:
      "Happy customers rarely leave reviews and unhappy ones go straight to Google. Local businesses need a way to ask at the right moment and to catch problems privately first.",
    built:
      "QR codes at the counter that route happy customers to Google and capture unhappy feedback privately. A Google-review inbox with AI-drafted replies, plus reputation insights. Multi-tenant from day one, with row-level security in Postgres.",
    hard:
      "Multi-tenancy you can trust. Every query is scoped by row-level security in the database, not only by app code, and the architecture records its decisions as ADRs.",
    outcome:
      "Review collection, the inbox with AI replies, private feedback and insights are built. Billing is scaffolded but not yet live.",
    flow: ["QR at the counter", "Rating", "Google review", "Private feedback", "Inbox + AI replies", "Insights"],
    decisions: [
      { title: "Server-first React", body: "Server Components and Server Actions by default; client state only where it earns its place." },
      { title: "Security in the database", body: "Row-level security policies enforce tenant isolation even if app code has a bug." },
      { title: "Observability from the start", body: "Sentry, PostHog and OpenTelemetry wired before the first customer." },
    ],
    stack: ["Next.js 16", "React 19", "Supabase", "Drizzle", "Tailwind v4", "Turborepo", "Sentry", "PostHog", "Playwright"],
  },
  {
    slug: "viralposta",
    cover: { tiles: ["/work/viralposta/car1_cover.jpg", "/work/viralposta/car2_reason.jpg", "/work/viralposta/rsvp.jpg"], aspect: "2 / 3" },
    title: "ViralPosta",
    year: "2026",
    client: "ViralPosta",
    role: "Backend, AI generation pipeline",
    tagline: "An AI engine that plans and designs social posts.",
    tags: ["Generative AI", "Backend"],
    problem:
      "Asking one model for a finished social post gives you either good writing or a good layout, rarely both.",
    built:
      "A NestJS backend where generation runs as BullMQ jobs. Canvas generation runs in two steps: a planner model decides the content and structure, then a schema writer outputs the design as structured data the front end renders. Several model providers sit behind the AI SDK, with Stripe billing through Better Auth and PDF export.",
    hard:
      "Making model output renderable every time. The design is a validated schema, not free text, and every fallback path is logged so failures can be traced to the step that caused them.",
    outcome: "Posts arrive as editable designs instead of flat images, and generation scales through the job queue.",
    flow: ["Brief", "Planner model", "Schema writer", "Canvas render", "Export"],
    decisions: [
      { title: "Two models, two jobs", body: "Planning and layout are separate calls with separate prompts, so each can be improved on its own." },
      { title: "Queue everything", body: "Generation is a job with progress over WebSockets, not a request that times out." },
    ],
    stack: ["NestJS", "BullMQ", "Redis", "AI SDK", "Anthropic", "Gemini", "OpenAI", "Drizzle", "Stripe"],
  },
];

export const APPS: App[] = [
  {
    name: "PermisON",
    tagline: "Pass the Romanian driving-theory exam on the first try.",
    platform: "iOS · Android",
    stack: ["Flutter", "Python", "SQLite"],
    screens: ["/apps/permison/2.jpg", "/apps/permison/3.jpg", "/apps/permison/4.jpg"],
  },
  {
    name: "WA-Muter",
    tagline: "Mute the noise, keep the important stuff. Scheduled muting for WhatsApp.",
    platform: "Android",
    stack: ["Flutter", "Kotlin", "Notification listener"],
    screens: ["/apps/wamuter/2.jpg", "/apps/wamuter/3.jpg", "/apps/wamuter/4.jpg"],
  },
  {
    name: "TruckerTracker",
    tagline: "Offline-first trip logger for very small trucking companies.",
    platform: "iOS · Android",
    stack: ["Flutter", "Riverpod", "drift", "Supabase"],
    points: ["Works with no signal", "Syncs in the background", "Trips on a map"],
  },
  {
    name: "Roadlink",
    tagline: "Turns an old Android phone into a wireless Android Auto screen for your car. A receiver written from scratch.",
    platform: "Android",
    stack: ["Java", "Android Auto protocol", "TLS", "MediaCodec", "Bluetooth"],
    car: { screen: "/apps/roadlink/android-auto.jpg", phone: "/apps/roadlink/home.jpg" },
  },
];

export const LAB: LabItem[] = [
  { name: "Tennis Remote", kind: "Hardware hack", tagline: "Keep score with a Xiaomi Smart Band: music buttons become point, point, undo, and the phone calls out the score.", stack: ["Flutter", "BLE", "TTS"] },
  { name: "Meeting Companion", kind: "Desktop app", tagline: "Listens to a meeting and explains the jargon in near real time.", stack: ["Electron", "React", "OpenAI"] },
  { name: "ChatGPT → Claude", kind: "Chrome extension", tagline: "Moves conversations, memories and custom instructions from ChatGPT to Claude, with no server.", stack: ["React 19", "Manifest V3"] },
  { name: "OLX Radar", kind: "Bot", tagline: "Watches OLX searches and pings Telegram the moment a new listing appears.", stack: ["Python", "Playwright", "SQLite"] },
  { name: "Travel Deals Radar", kind: "Bot", tagline: "Pulls Wizz Air and Ryanair fares from Cluj daily and flags round trips far below their usual price.", stack: ["Python", "Postgres", "Docker"] },
  { name: "Menu Poster AI", kind: "Prototype", tagline: "Turns a restaurant menu into a print-ready poster. AI-first, no OCR.", stack: ["Next.js", "Supabase", "sharp"] },
  { name: "Shopify Review Mining", kind: "Research", tagline: "Mined 1–2★ reviews of ten Shopify apps to rank app ideas worth building.", stack: ["Python", "Data"] },
];

export const STACK = [
  "TypeScript", "Next.js", "React", "NestJS", "Python", "FastAPI", "Flutter", "Dart",
  "Supabase", "Postgres", "Redis", "BullMQ", "Docker", "OpenAI", "Anthropic", "Mistral", "Vercel AI SDK", "Playwright",
];
