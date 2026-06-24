# Streamify

A responsive video streaming content browser built with Next.js 16, TypeScript, and Tailwind CSS. Browse trending movies, search by title, filter by genre, and watch HLS video streams — all in a clean, mobile-first interface.

**Live Demo:** [your-vercel-link-here]  
**Built with:** Next.js · TypeScript · Tailwind CSS · shadcn/ui · TMDB API · hls.js

---

## What I Built

Streamify is a "content browser" — think a lightweight Netflix-style front end. The core experience is:

- A **home page** showing a responsive grid of trending movies fetched from TMDB
- **Search** by title (debounced, 400ms) and **filter** by genre/category
- A **detail page** (`/title/[id]`) for each movie with metadata, backdrop, and a working video player
- A **video player** using hls.js to play a public HLS stream (`.m3u8`)
- A **"Continue Watching"** row that persists across sessions via `localStorage`
- Sensible **loading, empty, and error states** throughout

---

## Architecture

The app is structured around clean, decoupled service boundaries — each layer has one job and does not bleed into others.

```
streamify/
├── app/                        # Next.js App Router (pages + API routes)
│   ├── page.tsx                # Home — Server Component, fetches initial data
│   ├── title/[id]/page.tsx     # Detail — Server Component, fetches movie by ID
│   ├── layout.tsx
│   └── api/
│       └── movies/route.ts     # API proxy — shields TMDB key from the browser
│
├── services/                   # External data layer (all TMDB logic lives here)
│   └── tmdb/
│       ├── client.ts           # Base fetch wrapper (base URL, API key, ISR cache)
│       ├── movies.ts           # getTrendingMovies, searchMovies, getMovieById, getGenres
│       └── types.ts            # TMDBMovie, TMDBMovieDetail, TMDBGenre, TMDBResponse
│
├── hooks/                      # Client-side state and side effects
│   ├── useMovies.ts            # Search + filter logic, calls /api/movies
│   └── useWatchHistory.ts      # localStorage read/write for continue watching
│
├── components/                 # Pure UI components, no data fetching
│   ├── BrowsePage.tsx          # Client shell for home page (search + filter state)
│   ├── ContentCard.tsx         # Movie card — thumbnail, title, year, rating
│   ├── ContentGrid.tsx         # Responsive grid with loading/error/empty states
│   ├── SearchBar.tsx           # Controlled search input with clear button
│   ├── GenreFilter.tsx         # Horizontal scrollable genre chip row
│   ├── VideoPlayer.tsx         # hls.js wrapper with Safari native fallback
│   ├── ContinueWatching.tsx    # Horizontal scroll row from localStorage history
│   └── DetailPage.tsx          # Client shell for detail page (adds to history)
│
└── lib/
    └── utils.ts                # shadcn utility (cn helper)
```

### Why this structure?

The key principle is **separation of concerns at every boundary**:

- **`services/tmdb/`** is the only place that knows about TMDB. If we swap TMDB for another API (e.g. OMDB, a custom CMS), only this folder changes. Nothing in components or hooks imports directly from TMDB.

- **`app/api/movies/route.ts`** is a thin server-side proxy. It exists for one reason: the TMDB API key (`TMDB_API_KEY`) must never reach the browser. Without this route, the key would be visible in the browser's Network tab on every request. The route acts as a gatekeeper — the browser hits `/api/movies`, the server appends the secret key and calls TMDB.

- **`hooks/`** holds all client-side business logic. Components are kept dumb — they receive props and render. Hooks own the state, effects, and data fetching calls.

- **Server Components vs Client Components** are used deliberately (see SSR section below).

---

## Key Decisions & Trade-offs

### 1. Server Components for initial page load

`app/page.tsx` and `app/title/[id]/page.tsx` are **async Server Components**. They fetch data on the server before sending HTML to the browser.

**Why:** Faster initial render, better SEO (the movie grid is in the HTML, not fetched after load), and the TMDB API key never leaves the server for these calls. No loading spinner on first visit.

**Trade-off:** Server Components cannot use `useState` or browser APIs. That is why `BrowsePage.tsx` and `DetailPage.tsx` exist as separate `"use client"` shells — the server fetches the data, passes it as props, and the client component handles interactivity.

### 2. API Route as a security proxy

The `/api/movies` route is not strictly necessary for SSR — Server Components can call TMDB directly. But the **search and filter features run client-side** (the user types in a browser). Without the proxy route, client-side fetches would expose the API key.

The route also gives a clean internal API contract: the browser always talks to `/api/movies`, never to TMDB directly. Swapping the data source only requires changing the route handler, not the hook.

### 3. hls.js with Safari native fallback

HLS (`.m3u8`) is natively supported in Safari but not in Chrome or Firefox. `VideoPlayer.tsx` checks `video.canPlayType("application/vnd.apple.mpegurl")` first — if true (Safari), it sets `video.src` directly. Otherwise it initialises hls.js.

This avoids loading hls.js unnecessarily on Safari and ensures correct playback everywhere.

### 4. Debounced search (400ms)

Search queries are debounced with a 400ms delay before the API call fires. This prevents a network request on every keystroke. The trade-off is a very slight perceived lag, which is invisible in practice and saves significant API quota.

### 5. Mock HLS stream

The video player uses a public test stream from Mux (`https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`). In a real product, each title would have its own stream URL stored in the database and passed to the player. The player component already accepts a `streamUrl` prop — swapping in real URLs requires no component changes.

### 6. ISR (Incremental Static Regeneration)

The `tmdbFetch` client passes `{ next: { revalidate: 3600 } }` to Next.js `fetch`. This caches API responses on the server for 1 hour. Trending movies and genre lists do not change by the minute — caching reduces TMDB API calls and improves response times for all users without going fully static.

### 7. Continue Watching in localStorage

Watch history is stored in `localStorage` (max 10 items, newest first). The trade-off vs a database: it works instantly with no backend, but is device-specific and clears with browser data. For this scope it is the right call — no auth, no backend, zero latency.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework, SSR, API routes |
| TypeScript | Type safety across all layers |
| Tailwind CSS v4 | Styling |
| shadcn/ui | UI component primitives |
| TMDB API | Movie data and images |
| hls.js | HLS video playback |
| Lucide React | Icons |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/streamify.git
cd streamify
npm install
```

### 2. Environment variables

Create a `.env.local` file in the root:

```env
TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_IMAGE_BASE=https://image.tmdb.org/t/p
```

Get a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## AI Tools Used

This project was built with heavy use of Claude (Anthropic). Claude assisted with:

- Initial architecture planning and folder structure
- Generating boilerplate for service layer, hooks, and components
- Debugging TypeScript errors and Next.js config issues

All generated code was reviewed, understood, and adapted. Every decision in this README reflects genuine understanding of the trade-offs — not a copy-paste of AI output.