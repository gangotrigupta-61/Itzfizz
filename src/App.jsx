import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-[#090a10] text-[#f0f0f5]">
      {/* ── Scroll-Driven Hero Section ── */}
      <HeroSection />

      {/* ── Second Section: Content continues naturally after hero scroll completes ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #090a10 0%, #0d0f1b 50%, #06070a 100%)',
          padding: '40px 20px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#22c55e',
            marginBottom: '12px',
          }}
        >
          Itzfizz Digital
        </span>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 3.8vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '0.15em',
            color: 'rgba(240, 240, 245, 0.85)',
            textTransform: 'uppercase',
          }}
        >
          Next Section
        </h2>
        <p
          style={{
            marginTop: '16px',
            maxWidth: '480px',
            fontSize: '0.9rem',
            color: 'rgba(240, 240, 245, 0.45)',
            lineHeight: 1.6,
          }}
        >
          The scroll-driven interactive animation is complete. Standard page flow resumes smoothly without trapping the user.
        </p>
      </section>
    </div>
  )
}
