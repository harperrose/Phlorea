import { useEffect, useRef, useState } from 'react'

const spiralCopy =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

function Spiral({ repeated = false }) {
  const spiralRef = useRef(null)
  const [isVisible, setIsVisible] = useState(!repeated)
  const characters = [...spiralCopy]
  const points = characters.map((character, index) => {
    const progress = index / Math.max(characters.length - 1, 1)
    const angle = index * 0.29 - Math.PI / 2
    const radius = 8 + progress * 158

    return {
      character,
      x: 50 + Math.cos(angle) * (radius / 3.9),
      y: 50 + Math.sin(angle) * (radius / 3.9),
      angle: (angle * 180) / Math.PI + 90,
      delay: `${index * 42}ms`,
    }
  })

  useEffect(() => {
    if (!repeated || !spiralRef.current) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(spiralRef.current)
    return () => observer.disconnect()
  }, [repeated])

  return (
    <div
      ref={spiralRef}
      className={`spiral ${repeated ? 'spiral--repeated' : ''} ${isVisible ? 'spiral--visible' : ''}`}
      aria-label={spiralCopy}
      role="img"
    >
      <svg
        className="spiral__line"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <path d="M200 200c0-9 7-16 16-16 18 0 31 15 31 33 0 28-23 51-52 51-40 0-72-32-72-72 0-52 42-94 94-94 65 0 117 53 117 118 0 78-63 141-141 141-91 0-165-74-165-165" />
      </svg>

      <span className="spiral__letters" aria-hidden="true">
        {points.map(({ character, x, y, angle, delay }, index) => (
          <span
            className="spiral__letter"
            key={`${character}-${index}`}
            style={{
              '--x': `${x}%`,
              '--y': `${y}%`,
              '--angle': `${angle}deg`,
              '--delay': delay,
            }}
          >
            {character === ' ' ? '\u00a0' : character}
          </span>
        ))}
      </span>
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <a className="wordmark" href="#top" aria-label="Phlorea, home">
        phlorea
      </a>
      <nav aria-label="Main navigation">
        <a href="#story">Story</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

function App() {
  return (
    <div id="top">
      <Header />
      <div className="fixed-spiral" aria-hidden="true">
        <Spiral />
      </div>

      <main>
        <section className="hero">
          <p className="eyebrow">Handmade in Columbus, Ohio</p>
          <h1>
            Adornment with
            <br />
            a life of its own.
          </h1>
          <a className="pill" href="#work">
            Enter the world
          </a>
        </section>

        <section className="story" id="story">
          <div className="portrait" role="img" aria-label="Artist wearing handmade jewelry">
            <div className="portrait__wash" />
          </div>
          <div className="story__copy">
            <span className="section-number">01</span>
            <h2>Made by hand.<br />Led by feeling.</h2>
            <p>
              Phlorea creates expressive beadwork and jewelry for bodies in
              motion. Every piece begins slowly, one bead at a time.
            </p>
            <a className="pill pill--light" href="#contact">Meet the maker</a>
          </div>
        </section>

        <section className="work" id="work">
          <p className="eyebrow">Objects for becoming</p>
          <h2>Small forms.<br />Big energy.</h2>
          <div className="work__meta">
            <p>Beadwork · earrings · wearable sculpture</p>
            <a className="pill" href="#contact">View the work</a>
          </div>
        </section>

        <section className="closing" id="contact">
          <Spiral repeated />
          <p className="eyebrow">The spiral returns</p>
          <h2>Stay in the orbit.</h2>
          <a href="mailto:hello@phlorea.com">hello@phlorea.com</a>
        </section>
      </main>

      <footer>
        <span>Phlorea © 2026</span>
        <a href="#top">Back to top</a>
        <span>Columbus, Ohio</span>
      </footer>
    </div>
  )
}

export default App
