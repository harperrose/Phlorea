export const SPIRAL_COPY = Array.from(
  { length: 32 },
  () => 'phlorea',
).join(' ')

const CHAR_DELAY_MS = 100
const VIEWBOX = 400

export function buildSpiralWords(copy = SPIRAL_COPY) {
  const words = copy.replace(/\n+/g, ' ').split(' ')
  const b = 6
  let theta = 0
  let characterIndex = 0

  return words.map((word, index) => {
    if (index > 0) {
      const radius = Math.max(b * theta, 1)
      const advance = word.length * 18 + 28
      const step = advance / Math.hypot(radius, b)
      theta += step
    }

    const radius = Math.max(b * theta, 1)
    const x = VIEWBOX / 2 - Math.cos(theta - Math.PI / 2) * radius
    const y = VIEWBOX / 2 + Math.sin(theta - Math.PI / 2) * radius

    const result = {
      word,
      x: (x / VIEWBOX) * 100,
      y: (y / VIEWBOX) * 100,
      characters: [...word].map((character, characterOffset) => ({
        character,
        delay: `${(characterIndex + characterOffset + 1) * CHAR_DELAY_MS}ms`,
      })),
    }

    characterIndex += word.length + 1
    return result
  })
}
