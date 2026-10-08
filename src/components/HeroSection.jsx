import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Statistics matching the reference design and screenshot
const stats = [
  {
    value: '58%',
    label: 'Increase in pick up point use',
    bg: '#def54f',
    textColor: '#111111',
    numColor: '#111111',
  },
  {
    value: '27%',
    label: 'Increase in pick up point use',
    bg: '#333333',
    textColor: '#ffffff',
    numColor: '#ffffff',
  },
  {
    value: '23%',
    label: 'Decreased in customer phone calls',
    bg: '#6ac9ff',
    textColor: '#111111',
    numColor: '#111111',
  },
  {
    value: '40%',
    label: 'Decreased in customer phone calls',
    bg: '#fa7328',
    textColor: '#111111',
    numColor: '#111111',
  },
]

// Impact statistic card component matching the reference layout
function StatCard({ stat, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="stat-card"
      style={{
        background: stat.bg,
        borderRadius: '10px',
        padding: 'clamp(20px, 2.6vw, 30px) clamp(22px, 2.8vw, 32px)',
        minWidth: 'clamp(170px, 19vw, 240px)',
        maxWidth: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 0,
        transform: 'translateY(24px)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
      }}
    >
      <p
        style={{
          fontSize: 'clamp(2.8rem, 4.4vw, 3.8rem)',
          fontWeight: 600,
          color: stat.numColor,
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {stat.value}
      </p>
      <p
        style={{
          fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
          color: stat.textColor,
          marginTop: '8px',
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {stat.label}
      </p>
    </div>
  )
}

export default function HeroSection() {
  const sectionRef = useRef(null)
  const roadRef = useRef(null)
  const roadFillRef = useRef(null)
  const carRef = useRef(null)
  const carImgRef = useRef(null)
  const cardsRef = useRef([])

  // Car image source with fallback and automatic background cleaner
  const [carSrc, setCarSrc] = useState('/car.jpeg')

  // Remove the gray/white checkerboard pattern from car.jpeg if present
  useEffect(() => {
    const img = new Image()
    img.src = '/car.jpeg'
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
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const road = roadRef.current
    const car = carRef.current
    const roadFill = roadFillRef.current
    const cards = cardsRef.current.filter(Boolean)

    // ── 1. Page Load Animation ──────────────────────────────────────
    const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Car smoothly settles into the start line at the left edge
    loadTl
      .fromTo(
        car,
        { opacity: 0, x: -70 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
      )
      .fromTo(
        roadFill,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.4'
      )

    // ── 2. Scroll-Driven Animation ──────────────────────────────────
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Calculate distance so that at the end of the scroll,
    // the car drives off the right edge leaving only its rear ~32% visible
    const getTravelDistance = () => {
      const roadWidth = road ? road.offsetWidth : section.offsetWidth
      const carWidth = carImgRef.current ? carImgRef.current.offsetWidth : 180
      return roadWidth - carWidth * 0.32
    }

    // Car travels across the road to the target end position
    scrollTl.to(
      car,
      {
        x: () => getTravelDistance(),
        ease: 'none',
      },
      0
    )

    // Green trail starts as the initial small sliver behind the car (~65px) and expands to 100%
    scrollTl.fromTo(
      roadFill,
      { width: 'clamp(55px, 6.5vw, 75px)' },
      {
        width: '100%',
        ease: 'none',
      },
      0
    )

    // Sequence the cards to appear at distinct scroll milestones as the car advances
    // Order: Card 0 (58%), Card 2 (23%), Card 1 (27%), Card 3 (40%)
    const cardAppearances = [
      { el: cards[0], start: 0.16, end: 0.32 },
      { el: cards[2], start: 0.36, end: 0.52 },
      { el: cards[1], start: 0.56, end: 0.72 },
      { el: cards[3], start: 0.74, end: 0.90 },
    ]

    cardAppearances.forEach(({ el, start, end }) => {
      if (!el) return
      scrollTl.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: end - start,
        },
        start
      )
    })

    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      loadTl.kill()
      scrollTl.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden"
      style={{
        height: '100vh',
        width: '100%',
        background: '#d1d1d1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(16px, 3vh, 32px) 0',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Top Area: Right-aligned Stat Cards (58% & 27%) ── */}
      <div
        className="flex justify-end items-center flex-wrap gap-4 sm:gap-6 w-full"
        style={{
          position: 'relative',
          zIndex: 20,
          paddingRight: 'clamp(24px, 10vw, 130px)',
          paddingLeft: 'clamp(16px, 4vw, 48px)',
          boxSizing: 'border-box',
          minHeight: '80px',
        }}
      >
        <StatCard
          stat={stats[0]}
          cardRef={(el) => (cardsRef.current[0] = el)}
        />
        <StatCard
          stat={stats[1]}
          cardRef={(el) => (cardsRef.current[1] = el)}
        />
      </div>

      {/* ── Middle Area: Full-Width Road Track, Green Trail, Headline & Car ── */}
      <div
        ref={roadRef}
        className="relative w-full overflow-hidden"
        style={{
          height: 'clamp(170px, 24vh, 230px)',
          background: '#1e1e1e',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Green progress trail: starts as sliver behind the car, grows across road, reveals bold text */}
        <div
          ref={roadFillRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: 'clamp(55px, 6.5vw, 75px)',
            background: '#45db7d',
            overflow: 'hidden',
            zIndex: 2,
          }}
        >
          {/* Headline inside green trail: revealed in bold black as green trail covers it */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingLeft: 'clamp(24px, 4.8vw, 68px)',
              pointerEvents: 'none',
              userSelect: 'none',
              boxSizing: 'border-box',
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 7.5vw, 6.4rem)',
                fontWeight: 900,
                letterSpacing: 'clamp(0.02em, 0.1vw, 0.05em)',
                color: '#111111',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              WELCOME ITZFIZZ
            </h1>
          </div>
        </div>

        {/* Car container — centered vertically in the road */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {/* GSAP translates carRef horizontally along X-axis */}
          <div ref={carRef} style={{ display: 'inline-block' }}>
            <img
              ref={carImgRef}
              src={carSrc}
              alt="A sleek sports car driving through the hero section"
              onError={() => setCarSrc('/car.png')}
              style={{
                height: 'clamp(160px, 23vh, 220px)',
                width: 'auto',
                display: 'block',
                // Flipped horizontally so front faces right (direction of travel)
                transform: 'scaleX(-1)',
                filter: 'drop-shadow(0 4px 16px rgba(0, 0, 0, 0.35))',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom Area: Right-aligned Stat Cards (23% & 40%) ── */}
      <div
        className="flex justify-end items-center flex-wrap gap-4 sm:gap-6 w-full"
        style={{
          position: 'relative',
          zIndex: 20,
          paddingRight: 'clamp(32px, 12.5vw, 170px)',
          paddingLeft: 'clamp(16px, 4vw, 48px)',
          boxSizing: 'border-box',
          minHeight: '80px',
        }}
      >
        <StatCard
          stat={stats[2]}
          cardRef={(el) => (cardsRef.current[2] = el)}
        />
        <StatCard
          stat={stats[3]}
          cardRef={(el) => (cardsRef.current[3] = el)}
        />
      </div>
    </section>
  )
}
