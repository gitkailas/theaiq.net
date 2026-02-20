# AIQ Website — Technical Overview

> **Last updated:** February 20, 2026
> **Live URL:** [https://theaiq.net](https://theaiq.net)
> **Repository:** [gitkailas/theaiq.net](https://github.com/gitkailas/theaiq.net)
> **Hosting:** GitHub Pages (deployed from the `main` branch)

---

## 1. What Is This?

This is the complete website for **AIQ** ("Smart solutions for tomorrow"). It is a static website — meaning there is no backend server or database. Everything runs directly in the browser. It is hosted for free on **GitHub Pages** and uses the custom domain **theaiq.net**.

---

## 2. Project File Structure

```
AIQ/
├── index.html                        ← Main homepage
├── blog.html                         ← Blog listing page (all posts)
├── blog-ai-automation.html           ← Blog post: AI & Automation
├── blog-web-tech-stack.html          ← Blog post: Web Tech Stack
├── blog-cloud-vs-onprem.html         ← Blog post: Cloud vs On-Premise
├── blog-ai-advertising.html          ← Blog post: AI-Powered Advertising
├── blog-zero-trust.html              ← Blog post: Zero Trust Networks
├── blog-digital-transformation.html  ← Blog post: Digital Transformation
├── styles.css                        ← Global CSS (design system, layout, animations)
├── blog.css                          ← CSS specific to the blog listing page
├── blog-post.css                     ← CSS specific to individual blog article pages
├── script.js                         ← Global JavaScript (canvas, nav, scroll, form)
├── blog-reader.js                    ← Text-to-speech "Listen to Article" feature
├── CNAME                             ← Custom domain config (theaiq.net)
├── assets/
│   ├── logo.png                      ← AIQ logo used in navbar and footer
│   └── favicon.png                   ← Browser tab icon
├── The AIQ logo.png                  ← Source logo file
└── aiq prompt.txt                    ← Original design brief / requirements
```

---

## 3. Technology Stack

| Layer          | Technology                     | Why we use it                                                        |
| -------------- | ------------------------------ | -------------------------------------------------------------------- |
| **Structure**  | HTML5                          | Defines all page content and layout                                  |
| **Styling**    | Vanilla CSS (no frameworks)    | Full control over design — no dependency on Tailwind, Bootstrap, etc |
| **Logic**      | Vanilla JavaScript (no frameworks) | Keeps things lightweight and fast — no React, Vue, etc needed    |
| **Font**       | Google Fonts (Inter)           | Clean, modern typeface loaded from Google's CDN                      |
| **Hosting**    | GitHub Pages                   | Free, fast, deploys automatically when you push to `main`            |
| **Domain**     | theaiq.net (via CNAME)         | Custom domain pointed to GitHub Pages                                |

**No build tools, no npm, no bundler.** You edit the files, push to GitHub, and they're live. That's it.

---

## 4. Global Design System (`styles.css`)

All visual design is controlled through **CSS custom properties** (also called CSS variables). This means changing a single variable automatically updates every element that uses it.

### 4.1 Color Palette (Dark Theme)

```css
--bg-primary: #04070D;       /* Main background — near black */
--bg-secondary: #0A0F1A;     /* Slightly lighter — used for sections */
--bg-card: #0D1321;          /* Card backgrounds */
--accent: #2B7AFF;           /* Primary blue accent */
--accent-light: #5B9AFF;     /* Lighter blue for hover states */
--accent-dark: #1A5AD4;      /* Darker blue for pressed states */
--accent-glow: rgba(43,122,255,0.12); /* Subtle glow effect */
--text-primary: #EAEDF3;     /* Main text — near white */
--text-secondary: #8A93A6;   /* Secondary text — muted */
--text-muted: #4A5568;       /* De-emphasized text */
--border: rgba(255,255,255,0.06);      /* Subtle borders */
--border-hover: rgba(255,255,255,0.12); /* Borders on hover */
```

### 4.2 Typography

- **Font:** `Inter` (loaded from Google Fonts with weights 300–800)
- **Headings:** Bold/Extra-bold, negative letter-spacing for a tight, modern look
- **Body text:** 1rem base, line-height of 1.7 for readability

### 4.3 Spacing & Sizing

```css
--radius-sm: 8px;   /* Small corners */
--radius-md: 12px;  /* Medium corners */
--radius-lg: 20px;  /* Large corners */
--ease: cubic-bezier(0.16, 1, 0.3, 1); /* Smooth animation curve */
```

### 4.4 Responsive Breakpoints

- **768px and below:** Mobile layout — single column, smaller fonts, stacked elements
- **480px and below:** Extra-small screens — further sizing reductions
- The navigation switches to a hamburger menu on mobile

---

## 5. Homepage (`index.html`)

The homepage has four main sections:

### 5.1 Navigation Bar

- **Fixed at top** of the screen — stays visible while scrolling
- **Scrolled state:** When you scroll down, the navbar gets a solid background and bottom border (controlled by JavaScript adding the `.scrolled` class)
- **Mobile menu:** A hamburger icon (three lines) toggles the nav links on small screens
- **Links:** Blog → Services → About → Contact → Get Started (CTA button)

### 5.2 Hero Section

- Full-height intro area with the title "Smart Solutions for Tomorrow"
- **Gradient text** effect on "for Tomorrow" using CSS `background-clip: text`
- Subtitle and two action buttons: "Explore Services" and "Contact Us"
- A **glow effect** behind the hero content for visual depth

### 5.3 Services Section

Six service cards in a responsive grid:

1. **Application Development** — Web, desktop, and mobile apps
2. **IT Infra Consulting** — Infrastructure planning and management
3. **AI Ads & Media** — AI-powered advertising campaigns
4. **Automation** — Automating existing business processes
5. **Network Setup** — End-to-end network design and deployment
6. **Web Development & Management** — Full website lifecycle management

Each card has:
- An **SVG icon** (hand-drawn, inline, no external icon library)
- A title and description
- **Staggered reveal animation** — cards fade in one after another as you scroll

### 5.4 About Section

- Company stats displayed as animated counters (e.g., "50+ Projects Completed")
- Stats animate once when they scroll into view (using IntersectionObserver)

### 5.5 Contact Section

- Simple contact form with name, email, and message fields
- On submit, shows a "Thank you!" feedback message (client-side only — no actual email sending)
- The form uses `e.preventDefault()` to stop the default page reload

### 5.6 Footer

- Logo, tagline, and quick links
- Copyright notice
- Consistent across all pages

---

## 6. Canvas Background (`script.js`)

The entire site has an **animated grid background** drawn on an HTML `<canvas>` element. Here's how it works:

1. A `<canvas>` element sits behind all content (positioned with `z-index: 0`)
2. JavaScript draws a grid of faint dots/lines that slowly animate
3. The canvas auto-resizes when the browser window changes size
4. This runs on every page that includes `script.js`

**Performance note:** The canvas animation uses `requestAnimationFrame` for smooth 60fps rendering without blocking the main thread.

---

## 7. Scroll Reveal Animations (`script.js`)

Elements with the CSS class `.reveal` are **hidden by default** (opacity 0, shifted downward). When they scroll into the viewport, JavaScript adds the `.active` class, which triggers a smooth fade-in + slide-up animation.

```
How it works:
1. CSS sets .reveal elements to opacity: 0 and transform: translateY(30px)
2. An IntersectionObserver watches each .reveal element
3. When an element enters the viewport → add .active class
4. CSS transition smoothly fades it in and slides it up
```

**Staggered timing:** Service cards have incremental `transition-delay` values (0.1s, 0.2s, 0.3s, etc.) so they animate in sequence rather than all at once.

---

## 8. Blog System

### 8.1 Blog Listing Page (`blog.html` + `blog.css`)

- Displays **6 blog post cards** in a responsive grid (3 columns → 2 → 1 on smaller screens)
- Each card shows: category badge, title, excerpt, date, and read time
- **Cards are clickable links** — each wrapped in an `<a>` tag pointing to the full article page
- Cards use the same `.reveal` scroll animation as the rest of the site
- The `.blog-card-link` wrapper uses `display: contents` so it doesn't affect the grid layout

### 8.2 Individual Blog Posts (`blog-*.html` + `blog-post.css`)

All 6 blog posts follow the same template structure:

```
┌─────────────────────────────────────────┐
│  Navigation (same as homepage)          │
├─────────────────────────────────────────┤
│  Article Hero                           │
│  ├─ Category badge (e.g., "AI Media")   │
│  ├─ Article title                       │
│  └─ Date + read time                    │
├─────────────────────────────────────────┤
│  Article Body                           │
│  ├─ ← Back to Blog link                │
│  ├─ 🔊 Listen to Article button        │
│  ├─ Article content (h2, h3, p, ul, blockquote) │
│  └─ CTA: "Talk to AIQ" button          │
├─────────────────────────────────────────┤
│  Footer (same as homepage)              │
└─────────────────────────────────────────┘
```

**Styling details:**
- `h2` headings have a blue left border (3px accent line)
- Blockquotes have a left accent border + subtle blue background
- Content is capped at `720px` width for readability
- The hero section is shorter than the homepage hero (`44vh`)

### 8.3 Blog Posts List

| File | Topic | Read Time |
| ---- | ----- | --------- |
| `blog-ai-automation.html` | How AI is revolutionizing business automation | 5 min |
| `blog-web-tech-stack.html` | AIQ's frontend & backend tech stack explained | 7 min |
| `blog-cloud-vs-onprem.html` | Cloud vs on-premise infrastructure comparison | 6 min |
| `blog-ai-advertising.html` | How AI powers modern digital advertising | 4 min |
| `blog-zero-trust.html` | Zero Trust network security explained | 5 min |
| `blog-digital-transformation.html` | 5 signs your business is ready to modernize | 6 min |

---

## 9. Text-to-Speech — "Listen to Article" (`blog-reader.js`)

Every blog post has a **"Listen to Article"** button at the top. This uses the browser's built-in **Web Speech API** — no external services, no API keys, no costs.

### How it works:

1. **Extract text:** The script grabs all text content from the `.article-content` div, skipping the back link, CTA, and the listen button itself
2. **Pick a voice:** It searches available browser voices and picks the best male English voice using a preference list:
   - Google UK English Male (Chrome)
   - Microsoft David (Edge/Windows)
   - Microsoft Mark (Edge/Windows)
   - Falls back to any English voice available
3. **Create utterance:** Wraps the text in a `SpeechSynthesisUtterance` with rate 0.95 (slightly slower for clarity)
4. **Play/Pause/Resume/Stop:** The button toggles between states. A separate stop button appears during playback

### Button states:

| State   | Icon  | Label             | Visual                                     |
| ------- | ----- | ----------------- | ------------------------------------------ |
| Idle    | ▶     | Listen to Article | Default card background + border           |
| Playing | ⏸     | Pause             | Accent border + pulsing glow animation     |
| Paused  | ▶     | Resume            | Darker accent background                   |

The **stop button** is a small circle next to the main button — hidden by default, slides in when playback starts, turns red on hover.

### Adding to a new blog post:

1. Add this HTML after the "Back to Blog" `</a>` tag:
```html
<div class="listen-bar">
    <button id="listenBtn" class="listen-btn" data-state="idle">
        <span class="listen-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg></span>
        <span class="listen-label">Listen to Article</span>
    </button>
    <button id="listenStopBtn" class="listen-stop-btn" aria-label="Stop">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
    </button>
</div>
```

2. Add this script tag before `</body>`:
```html
<script src="blog-reader.js"></script>
```

That's it — the script auto-detects the article content and handles everything.

---

## 10. JavaScript Safety Guards (`script.js`)

The same `script.js` runs on every page, but not every page has the same elements. To prevent errors:

- The **stat counter observer** checks if the stats section exists before trying to observe it
- The **contact form listener** checks if the form exists before attaching the submit handler

This means `script.js` runs safely on the blog pages (which don't have stats or a contact form).

---

## 11. Deployment Process

### How to deploy changes:

```bash
# 1. Make your edits to the files

# 2. Stage all changed files
git add .

# 3. Commit with a descriptive message
git commit -m "Description of what changed"

# 4. Push to main — GitHub Pages auto-deploys
git push origin main
```

Changes typically go live within **1–2 minutes** after pushing.

### Custom domain setup:

- The `CNAME` file contains `theaiq.net`
- This tells GitHub Pages to serve the site at that domain
- DNS records for `theaiq.net` must point to GitHub's servers (configured in your domain registrar)

---

## 12. Creating a New Blog Post (Step-by-Step)

1. **Copy** any existing `blog-*.html` file and rename it (e.g., `blog-new-topic.html`)
2. **Update** the `<title>`, `<meta description>`, article badge, title, date, and read time in the hero
3. **Replace** the article body content between `<div class="article-content">` and the closing `</div>`
4. **Keep** the back-to-blog link, listen bar, and CTA section intact
5. **Add a card** on `blog.html` — copy an existing `<a class="blog-card-link">...</a>` block and update:
   - The `href` to point to your new file
   - The badge, title, excerpt, date, and read time
6. **Commit and push** — the new post goes live automatically

---

## 13. Key CSS Classes Reference

| Class | Purpose |
| ----- | ------- |
| `.reveal` | Marks an element for scroll-triggered fade-in animation |
| `.active` | Added by JS when a `.reveal` element enters the viewport |
| `.scrolled` | Added to navbar when user scrolls down (solid background) |
| `.gradient-text` | Applies the blue gradient text effect |
| `.btn-primary` | Solid blue action button |
| `.btn-ghost` | Outlined/transparent button |
| `.nav-active` | Highlights the current nav link in blue |
| `.blog-card-link` | Wrapper link around blog cards (uses `display: contents`) |
| `.listen-btn` | The "Listen to Article" play/pause button |
| `.listen-stop-btn` | The stop button (appears during playback) |
| `.article-content` | Main article body container (max-width 720px) |

---

## 14. Browser Compatibility

- **Chrome:** Best experience — high-quality TTS voices, smooth canvas
- **Edge:** Full support — uses Microsoft voices for TTS
- **Firefox:** Full support — TTS voices may vary
- **Safari:** Full support — TTS uses macOS built-in voices
- **Mobile:** Responsive layout works on all screen sizes. TTS support varies by mobile browser

---

## 15. Performance Notes

- **No frameworks, no build step** — pages load extremely fast
- **Inline SVG icons** — no extra network requests for icons
- **Google Fonts preconnect** — font loads early via `<link rel="preconnect">`
- **Canvas animation** uses `requestAnimationFrame` — GPU-accelerated, battery-friendly
- **CSS animations** use `transform` and `opacity` — these are GPU-composited properties that don't trigger layout recalculation

---

*This document covers the full technical state of the AIQ website as of February 2026. For questions, contact the development team.*
