import './App.css'
import { UrlShortener } from './components/UrlShortener'
// @ts-ignore - LightRays is a JSX component without types
import LightRays from './components/LightRays'
// @ts-ignore - TargetCursor is a JSX component without types
import TargetCursor from './components/TargetCursor'
import './assets/css/satoshi.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 relative overflow-hidden" style={{ backgroundColor: '#000000' }}>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        targetSelector=".cursor-target"
        hoverDuration={0.2}
      />
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      {/* Capsule Navbar */}
      <div className="relative z-10 mb-8 mt-4 w-full flex justify-center">
        <div 
          className="px-12 py-3 rounded-full"
          style={{
            width: '50%',
            maxWidth: '400px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            fontFamily: "'Satoshi-Variable', 'Satoshi-Bold', sans-serif",
          }}
        >
          <h1 
            className="text-xl font-bold text-white text-center tracking-wide"
            style={{ fontFamily: "'Satoshi-Variable', 'Satoshi-Bold', sans-serif" }}
          >
            SHORTIFY
          </h1>
        </div>
      </div>
      {/* Main Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        {/* Quote */}
        <div className="mb-8 max-w-2xl px-4 text-center">
          <p 
            className="text-white/90 italic text-lg md:text-xl font-light leading-relaxed"
            style={{
              fontFamily: "'Satoshi-Variable', 'Satoshi-Light', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            "Simplify your links, amplify your reach."
          </p>
        </div>
        <UrlShortener />
      </div>
    </div>
  )
}

export default App
