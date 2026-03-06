/* ── Neural constellation — 2D canvas, no dependencies ── */

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const NODE_COUNT = 60
const CONNECTION_DIST = 180
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST
const DRIFT_SPEED = 0.3
const MOUSE_RADIUS = 250
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS

export function initNeuralSwarm(container: HTMLElement): () => void {
  const canvas = document.createElement('canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.display = 'block'
  container.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  let w = 0
  let h = 0
  let nodes: Node[] = []
  let animId = 0
  const mouse = { x: -9999, y: -9999 }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2)
    w = container.offsetWidth
    h = container.offsetHeight
    if (w === 0 || h === 0) return
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function seed() {
    nodes = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * DRIFT_SPEED,
        vy: (Math.random() - 0.5) * DRIFT_SPEED,
        radius: Math.random() * 1.5 + 1,
      })
    }
  }

  function draw() {
    animId = requestAnimationFrame(draw)
    if (w === 0 || h === 0) { resize(); seed(); return }

    ctx!.clearRect(0, 0, w, h)

    // update positions
    for (const n of nodes) {
      n.x += n.vx
      n.y += n.vy
      // wrap around edges with padding
      if (n.x < -20) n.x = w + 20
      if (n.x > w + 20) n.x = -20
      if (n.y < -20) n.y = h + 20
      if (n.y > h + 20) n.y = -20
    }

    // draw connections
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i]
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const distSq = dx * dx + dy * dy
        if (distSq < CONNECTION_DIST_SQ) {
          const alpha = 1 - Math.sqrt(distSq) / CONNECTION_DIST

          // brighter near mouse
          let boost = 0
          const mx = (a.x + b.x) / 2 - mouse.x
          const my = (a.y + b.y) / 2 - mouse.y
          if (mx * mx + my * my < MOUSE_RADIUS_SQ) {
            boost = 0.08
          }

          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.strokeStyle = `rgba(79,209,197,${alpha * 0.12 + boost})`
          ctx!.lineWidth = 0.5
          ctx!.stroke()
        }
      }
    }

    // draw nodes
    for (const n of nodes) {
      // glow near mouse
      const mdx = n.x - mouse.x
      const mdy = n.y - mouse.y
      const nearMouse = mdx * mdx + mdy * mdy < MOUSE_RADIUS_SQ

      ctx!.beginPath()
      ctx!.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
      ctx!.fillStyle = nearMouse
        ? 'rgba(79,209,197,0.6)'
        : 'rgba(79,209,197,0.25)'
      ctx!.fill()
    }
  }

  function onMouseMove(e: MouseEvent) {
    const rect = container.getBoundingClientRect()
    mouse.x = e.clientX - rect.left
    mouse.y = e.clientY - rect.top
  }

  function onMouseLeave() {
    mouse.x = -9999
    mouse.y = -9999
  }

  function onResize() {
    resize()
    seed()
  }

  resize()
  seed()
  animId = requestAnimationFrame(draw)

  window.addEventListener('resize', onResize)
  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('mouseleave', onMouseLeave)

  return () => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', onResize)
    container.removeEventListener('mousemove', onMouseMove)
    container.removeEventListener('mouseleave', onMouseLeave)
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
  }
}
