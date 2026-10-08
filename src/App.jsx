import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />

      {/* Second section — gives the page enough height to scroll through the pinned hero */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #0a0a14 0%, #0d0b1e 100%)',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '0.35em',
            color: 'rgba(240,240,245,0.15)',
            textTransform: 'uppercase',
          }}
        >
          Next Section
        </h2>
      </section>
    </div>
  )
}
