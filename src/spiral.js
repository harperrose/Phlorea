export const SPIRAL_COPY =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'

export function buildSpiralPath({
  cx = 200,
  cy = 200,
  turns = 4.5,
  spacing = 14,
  points = 360,
} = {}) {
  const maxAngle = turns * Math.PI * 2
  let path = ''

  for (let index = 0; index <= points; index += 1) {
    const progress = index / points
    const angle = progress * maxAngle - Math.PI / 2
    const radius = spacing * progress * turns * 1.55
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    path += `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)} `
  }

  return path.trim()
}

export function buildSpiralLetters(copy = SPIRAL_COPY) {
  const characters = [...copy]
  const turns = 4.5
  const spacing = 14
  const maxAngle = turns * Math.PI * 2

  return characters.map((character, index) => {
    const progress = index / Math.max(characters.length - 1, 1)
    const angle = progress * maxAngle - Math.PI / 2
    const radius = spacing * progress * turns * 1.55

    return {
      character,
      x: 50 + (Math.cos(angle) * radius * 100) / 400,
      y: 50 + (Math.sin(angle) * radius * 100) / 400,
      angle: (angle * 180) / Math.PI + 90,
      delay: `${index * 38}ms`,
    }
  })
}
