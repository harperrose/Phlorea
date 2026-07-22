import { useEffect, useState } from 'react'
import { buildSpiralWords, SPIRAL_COPY } from './spiral'

function Spiral() {
  const words = buildSpiralWords()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsAnimating(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      className={`spiral ${isAnimating ? 'spiral--is-animating' : ''}`}
      aria-label={SPIRAL_COPY}
      role="img"
    >
      <span className="spiral__words" aria-hidden="true">
        {words.map(({ word, x, y, characters }, index) => (
          <span
            className="spiral__word"
            key={`${word}-${index}`}
            style={{
              '--x': `${x}%`,
              '--y': `${y}%`,
            }}
          >
            {characters.map(({ character, delay }, characterIndex) => (
              <span
                className="spiral__letter"
                key={`${character}-${characterIndex}`}
                style={{ '--delay': delay }}
              >
                {character}
              </span>
            ))}
          </span>
        ))}
      </span>
    </div>
  )
}

function OrbitButton({ children = 'Explore' }) {
  return <a className="orbit-button" href="#contact">{children}</a>
}

function App() {
  return (
    <>
      <a className="wordmark" href="#top" aria-label="Phlorea home">Phlorea</a>
      <div className="fixed-spiral">
        <Spiral />
      </div>

      <main className="page" id="top">
        <section className="intro" aria-label="Phlorea introduction" />

        <section className="rounded-section rounded-section--stone">
          <p className="section-label">Objects for becoming</p>
          <OrbitButton>View the work</OrbitButton>
        </section>

        <section className="image-section" aria-label="Featured work">
          <article className="image-panel image-panel--portrait">
            <div className="image-panel__shade" />
            <OrbitButton>Meet the maker</OrbitButton>
          </article>
          <article className="image-panel image-panel--beads">
            <div className="image-panel__shade" />
            <OrbitButton>View the work</OrbitButton>
          </article>
        </section>

        <section className="rounded-section rounded-section--warm">
          <p className="section-label">Adornment with a life of its own</p>
          <OrbitButton>Stay in orbit</OrbitButton>
        </section>
      </main>

      <footer id="contact">
        <a href="mailto:hello@phlorea.com">hello@phlorea.com</a>
        <span>Columbus, Ohio</span>
        <a href="https://instagram.com" rel="noreferrer">Instagram</a>
      </footer>
    </>
  )
}

export default App
