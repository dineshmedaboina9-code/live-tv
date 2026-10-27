# StreamPulse India — Virtual Live TV Dashboard 🇮🇳 📺

A modern, high-performance web-based Virtual TV streaming application built with **React**, **Vite**, **Tailwind CSS**, and **HLS.js**, powered by the open-source **IPTV-org** repository.

Stream live Indian news, entertainment, music, movies, regional broadcasts, and sports with zero desktop installation and zero local backend setup.

---

## 🌟 Key Features

- **Live TV Streaming**: High definition HLS.js streaming player with automatic recovery and mirror fallback.
- **Curated Indian Channels**: Dedicated national & regional channels covering Hindi, English, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi, and Punjabi.
- **Live IPTV-org Integration**: Automatically syncs and parses the latest `https://iptv-org.github.io/iptv/countries/in.m3u` playlist with graceful fallback.
- **EPG Program Guide**: Interactive television schedule drawer showing "Now Playing" live progress and upcoming programs today.
- **Custom M3U Support**: Paste any custom M3U/M3U8 playlist URL or raw text to load external channel lists on the fly.
- **Glassmorphic Dark UI**: Premium streaming experience with channel logos, category tabs, and animated live audio wave visualizers.
- **Favorites & Recent Channels**: Save channels with one click, persisted locally via `localStorage`.
- **Picture-in-Picture & Theater Mode**: Floating PiP player and widescreen theater view.
- **Universal Browser Compatibility**: 100% web-based; works on Chrome, Safari, Edge, Firefox, iOS, and Android.

---

## 🚀 One-Click Online Deployment

### 1. Deploy on Vercel
1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Vite and applies the included [`vercel.json`](file:///Users/apple/Downloads/live%20tv/vercel.json).
4. Click **Deploy** — your live TV website will be instantly live on a free `.vercel.app` domain!

### 2. Run Online on StackBlitz or Replit
- **StackBlitz**: Drag-and-drop this project folder directly onto [StackBlitz](https://stackblitz.com/) or open directly from GitHub.
- **Replit**: Create a new Vite React Repl and import these files to develop and test immediately in your browser.

---

## 💻 Local Quickstart (Optional)

If you wish to test locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your web browser.

---

## 📁 Project Structure

```
├── index.html                 # HTML shell with Google Fonts & responsive viewport
├── package.json               # Dependencies (HLS.js, Lucide React, Tailwind CSS)
├── vite.config.js             # Vite configuration with vendor chunk code-splitting
├── tailwind.config.js         # Tailwind theme & custom streaming color palette
├── vercel.json                # Single-page routing rewrites & caching rules
└── src/
    ├── main.jsx               # Application root mount
    ├── App.jsx                # Main layout, channel state & search/filter logic
    ├── index.css              # Custom scrollbars, glassmorphism utilities & animations
    ├── data/
    │   └── defaultChannels.js # Verified fallback Indian channels & category taxonomies
    ├── services/
    │   └── iptvService.js     # M3U parser, IPTV-org live fetcher & EPG generator
    └── components/
        ├── Navbar.jsx         # Search bar, sync indicator & custom M3U trigger
        ├── Sidebar.jsx        # Navigation tabs, genre list & language filters
        ├── VideoPlayer.jsx    # HLS.js video engine with custom controls & PiP
        ├── ChannelCard.jsx    # Channel card with live badge, logo & audio waves
        ├── EPGModal.jsx       # TV program guide schedule dialog
        └── CustomPlaylistModal.jsx # Custom M3U URL / text importer
```
