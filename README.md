# Itzfizz — Scroll-Driven Hero Animation

A scroll-driven interactive hero section built as a Web Development Internship assignment for **Itzfizz Digital**. 

Inspired by modern creative web interactions, this project features a car traversing an asphalt road track tied directly to the user's scroll progress, revealing a vibrant progress trail and dynamic impact statistics.

🌐 **Live Demo:** [https://gangotrigupta-61.github.io/Itzfizz/](https://gangotrigupta-61.github.io/Itzfizz/)

---

## ✨ Features

- **Scroll-Driven Animation:** Pinned hero viewport (`ScrollTrigger` with `scrub: 1.1`) where movement is directly connected to user scroll rather than autoplay loops.
- **Dynamic Road Trail & Headline Reveal:** An emerald progress trail expands behind the sports car, progressively revealing the bold **WELCOME ITZFIZZ** headline through GPU-accelerated clipping.
- **Staggered Metric Cards:** Four impact statistic cards (`58%`, `23%`, `27%`, `40%`) appear smoothly at distinct milestones as the car advances along the track.
- **Performance Optimized:** Uses composite properties (`transform: translate`, `opacity`, `scale`) to maintain 60+ FPS without layout thrashing or scroll reflows.
- **Responsive Layout:** Adapts cleanly across desktop, tablet, and mobile viewports with no horizontal overflow.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Animation:** GSAP (GreenSock) & GSAP ScrollTrigger
- **Styling:** Tailwind CSS v4 & Custom CSS
- **Deployment:** GitHub Pages

---

## 📁 Project Structure

```text
src/
├── components/
│   └── HeroSection.jsx    # Hero layout, GSAP timelines, and road animations
├── App.jsx                # Root container with hero and transition section
├── index.css              # Global styles and Tailwind directives
└── main.jsx               # Application entry point
public/
├── car.jpeg               # Primary car asset
└── car.png                # Fallback car asset
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### Installation & Local Run

1. Clone the repository:
   ```bash
   git clone https://github.com/gangotrigupta-61/Itzfizz.git
   cd Itzfizz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Create production build:
   ```bash
   npm run build
   ```

---

## 📄 License
Created for internship evaluation purposes.
