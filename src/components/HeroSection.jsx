import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 4 Clearly visible percentage/impact metric cards matching assignment specs
const statsData = [
  {
    id: '01',
    value: '92%',
    label: 'Client Satisfaction',
    desc: 'Exceeded project milestones',
    accent: '#bef264',
  },
  {
    id: '02',
    value: '87%',
    label: 'Projects Delivered',
    desc: 'Full-cycle digital delivery',
    accent: '#ffffff',
  },
  {
    id: '03',
    value: '76%',
    label: 'Reduced Response Time',
    desc: 'Optimized user experiences',
    accent: '#38bdf8',
  },
  {
    id: '04',
    value: '95%',
    label: 'Average ROI Growth',
    desc: 'Measurable client impact',
    accent: '#fb923c',
  },
]

// Reusable Stat Card component — clean, readable, attractive, and always visible
function StatCard({ stat, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="stat-card"
      style={{
        background: 'rgba(20, 22, 32, 0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        padding: 'clamp(14px, 1.8vw, 20px) clamp(16px, 2.2vw, 24px)',
        minWidth: 'clamp(150px, 17vw, 210px)',
        maxWidth: '240px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '4px',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: 'rgba(240, 240, 245, 0.45)',
          }}
        >
          {stat.id}
        </span>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: stat.accent,
            display: 'inline-block',
          }}
        />
      </div>
      <p
        style={{
          fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)',
          fontWeight: 800,
          color: stat.accent,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {stat.value}
      </p>
      <p
        style={{
          fontSize: 'clamp(0.78rem, 1vw, 0.88rem)',
          color: '#f0f0f5',
          marginTop: '6px',
          fontWeight: 600,
          lineHeight: 1.25,
        }}
      >
        {stat.label}
      </p>
      <p
        style={{
          fontSize: '0.7rem',
          color: 'rgba(240, 240, 245, 0.5)',
          marginTop: '2px',
          lineHeight: 1.2,
        }}
      >
        {stat.desc}
      </p>
    </div>
  )
}

export default function HeroSection() {
  const heroRef = useRef(null)
  const roadRef = useRef(null)
  const trailRef = useRef(null)
  const carRef = useRef(null)
  const carImgRef = useRef(null)
  const headlineRef = useRef(null)
  const statsRef = useRef([])

  // Safe base URL for GitHub Pages deployment
  const baseUrl = import.meta.env.BASE_URL
  const [carSrc, setCarSrc] = useState(`${baseUrl}car.png`)
  const [useFallbackSvg, setUseFallbackSvg] = useState(false)

  // Remove fake checkerboard background pattern from car image if present
  useEffect(() => {
    const img = new Image()
    img.src = `${baseUrl}car.png`
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const d = imgData.data

        let hasCheckerboard = false
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i]
          const g = d[i + 1]
          const b = d[i + 2]
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b))
          const brightness = (r + g + b) / 3

          if (brightness > 170 && maxDiff < 18) {
            d[i + 3] = 0 // Transparent
            hasCheckerboard = true
          }
        }

        if (hasCheckerboard) {
          ctx.putImageData(imgData, 0, 0)
          setCarSrc(canvas.toDataURL('image/png'))
        }
      } catch {
        // Keep original if canvas restricted
      }
    }
    img.onerror = () => {
      const fallbackImg = new Image()
      fallbackImg.src = `${baseUrl}car.jpeg`
      fallbackImg.onload = () => setCarSrc(`${baseUrl}car.jpeg`)
      fallbackImg.onerror = () => setUseFallbackSvg(true)
    }
  }, [baseUrl])

  useEffect(() => {
    const hero = heroRef.current
    const road = roadRef.current
    const car = carRef.current
    const trail = trailRef.current
    const headline = headlineRef.current
    const cards = statsRef.current.filter(Boolean)

    if (!hero || !car || !trail) return

    // GSAP Context for safe, robust cleanup in React
    const ctx = gsap.context(() => {
      // ── 1. Initial Page Load Animation ─────────────────────────────
      const loadTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      loadTimeline
        .fromTo(
          headline,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(
          car,
          { opacity: 0, x: -70 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
        .fromTo(
          trail,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          '-=0.4'
        )
        .fromTo(
          cards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
          '-=0.3'
        )

      // ── 2. Scroll-Driven Animation ──────────────────────────────────
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Calculate travel distance so the car travels across the track
      const getTravelDistance = () => {
        const roadWidth = road ? road.offsetWidth : hero.offsetWidth
        const carWidth = carImgRef.current ? carImgRef.current.offsetWidth : 160
        // Front extends past the right edge while rear quarter stays visible
        return Math.max(roadWidth - carWidth * 0.35, 120)
      }

      // Car drives smoothly along the track tied to scroll progress
      scrollTimeline.to(
        car,
        {
          x: () => getTravelDistance(),
          ease: 'none',
        },
        0
      )

      // Green trail expands behind car across the road
      scrollTimeline.fromTo(
        trail,
        { width: 'clamp(50px, 6vw, 75px)' },
        {
          width: '100%',
          ease: 'none',
        },
        0
      )

      // Cards remain visible with subtle interactive emphasis during scroll
      cards.forEach((card, index) => {
        const progress = 0.15 + index * 0.2
        scrollTimeline.to(
          card,
          {
            scale: 1.03,
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
            duration: 0.12,
            ease: 'power1.out',
            yoyo: true,
            repeat: 1,
          },
          progress
        )
      })
    }, hero)

    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="overflow-hidden"
      style={{
        height: '100vh',
        width: '100%',
        background: 'linear-gradient(160deg, #090a10 0%, #0d0f1b 50%, #08090e 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(16px, 2.8vh, 28px) clamp(16px, 3.5vw, 40px)',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '65vw',
          height: '40vh',
          background: 'radial-gradient(ellipse, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Top Area: Stat Card 01, Brand Header, Stat Card 02 ── */}
      <div
        className="flex justify-between items-start flex-wrap gap-3 w-full"
        style={{ position: 'relative', zIndex: 20 }}
      >
        <StatCard
          stat={statsData[0]}
          cardRef={(el) => (statsRef.current[0] = el)}
        />

        {/* Center brand badge */}
        <div
          style={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <div
            style={{
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <p
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.28em',
                color: 'rgba(240, 240, 245, 0.65)',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              ITZFIZZ DIGITAL
            </p>
          </div>
          <span
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.12em',
              color: 'rgba(34, 197, 94, 0.8)',
              fontWeight: 600,
            }}
          >
            ● Scroll Driven Experience
          </span>
        </div>

        <StatCard
          stat={statsData[1]}
          cardRef={(el) => (statsRef.current[1] = el)}
        />
      </div>

      {/* ── Middle Area: Road Track, Headline, Green Trail & Car ── */}
      <div
        ref={roadRef}
        className="relative w-full overflow-hidden"
        style={{
          height: 'clamp(150px, 21vh, 210px)',
          background: '#13151f',
          borderRadius: '14px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 2px 14px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Base headline: visible in elegant silver before trail reaches it */}
        <div
          ref={headlineRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 5.2vw, 4.4rem)',
              fontWeight: 900,
              letterSpacing: 'clamp(0.12em, 0.35vw, 0.28em)',
              color: 'rgba(240, 240, 245, 0.25)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            W E L C O M E &nbsp; I T Z F I Z Z
          </h1>
        </div>

        {/* Green progress trail: grows across road behind the car */}
        <div
          ref={trailRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 'clamp(50px, 6vw, 75px)',
            background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)',
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.45)',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Duplicate headline inside green trail: revealed in bold dark text */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(1.6rem, 5.2vw, 4.4rem)',
                fontWeight: 900,
                letterSpacing: 'clamp(0.12em, 0.35vw, 0.28em)',
                color: '#090a0f',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              W E L C O M E &nbsp; I T Z F I Z Z
            </h1>
          </div>
        </div>

        {/* Car container — centered vertically on the road, starts at left */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* GSAP translates carRef horizontally along X-axis */}
          <div ref={carRef} style={{ display: 'inline-block' }}>
            {useFallbackSvg ? (
              // Clean sports car SVG fallback if image fails
              <svg
                width="160"
                height="80"
                viewBox="0 0 160 80"
                fill="none"
                style={{
                  display: 'block',
                  filter: 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.6))',
                }}
              >
                <path
                  d="M10 25 C10 15, 30 10, 80 10 C130 10, 150 20, 155 35 C158 45, 150 65, 140 70 C100 75, 40 75, 15 65 C8 55, 10 35, 10 25 Z"
                  fill="#f97316"
                />
                <path
                  d="M45 20 C60 18, 105 18, 120 22 C125 35, 120 50, 115 55 C95 58, 65 58, 48 55 C42 45, 40 30, 45 20 Z"
                  fill="#090a0f"
                />
                <rect x="5" y="15" width="10" height="50" rx="3" fill="#18181b" />
              </svg>
            ) : (
              <img
                ref={carImgRef}
                src={carSrc}
                alt="A sleek McLaren sports car driving through the hero section"
                onError={() => {
                  if (carSrc.endsWith('.png')) {
                    setCarSrc(`${baseUrl}car.jpeg`)
                  } else {
                    setUseFallbackSvg(true)
                  }
                }}
                style={{
                  height: 'clamp(110px, 16vh, 165px)',
                  width: 'auto',
                  display: 'block',
                  // Flipped horizontally so front faces right (direction of travel)
                  transform: 'scaleX(-1)',
                  filter: 'drop-shadow(0 8px 22px rgba(0, 0, 0, 0.6))',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Area: Stat Card 03, Scroll Indicator, Stat Card 04 ── */}
      <div
        className="flex justify-between items-end flex-wrap gap-3 w-full"
        style={{ position: 'relative', zIndex: 20 }}
      >
        <StatCard
          stat={statsData[2]}
          cardRef={(el) => (statsRef.current[2] = el)}
        />

        {/* Scroll exploration indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            alignSelf: 'center',
          }}
        >
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.24em',
              color: 'rgba(240, 240, 245, 0.55)',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Scroll to explore ↓
          </span>
          <span
            style={{
              width: '18px',
              height: '2px',
              backgroundColor: 'rgba(34, 197, 94, 0.6)',
              borderRadius: '999px',
            }}
          />
        </div>

        <StatCard
          stat={statsData[3]}
          cardRef={(el) => (statsRef.current[3] = el)}
        />
      </div>
    </section>
  )
}
