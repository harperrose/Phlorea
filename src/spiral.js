export const SPIRAL_COPY = `1 the celebration of culture, nature and fantasy through craft
2 the study of adornment; as it relates to the space we inhabit (e.g., body or home)
3 the rejection of minimalist design through lavish ornamentation
4 the desire to highlight the beauty, synchronicity, and wonder of divine creation`

const CHAR_DELAY_MS = 100
const VIEWBOX = 400

export function buildSpiralLetters(copy = SPIRAL_COPY) {
  const characters = [...copy.replace(/\n+/g, ' ')]
  const spacing = 3.1
  const b = 0.84
  let theta = 0
  let arc = 0

  return characters.map((character, index) => {
    if (index > 0) {
      const radius = Math.max(b * theta, 1)
      const step = spacing / Math.hypot(radius, b)
      theta += step
      arc += spacing
    }

    const radius = Math.max(b * theta, 1)
    const x = VIEWBOX / 2 + Math.cos(theta - Math.PI / 2) * radius
    const y = VIEWBOX / 2 + Math.sin(theta - Math.PI / 2) * radius
    const tangent = theta + Math.PI / 2

    return {
      character,
      x: (x / VIEWBOX) * 100,
      y: (y / VIEWBOX) * 100,
      angle: (tangent * 180) / Math.PI,
      delay: `${(index + 1) * CHAR_DELAY_MS}ms`,
    }
  })
}
