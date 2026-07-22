import { buildSpiralLetters, SPIRAL_COPY } from './spiral'

function Spiral() {
  const points = buildSpiralLetters()

  return (
    <div className="spiral" aria-label={SPIRAL_COPY} role="img">
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

function App() {
  return (
    <main className="page">
      <Spiral />
    </main>
  )
}

export default App
