import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

/** Deterministic pseudo-random value noise — no deps, cheap enough for a one-time geometry pass. */
function hashNoise(x: number, y: number, z: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453
  return s - Math.floor(s)
}

/**
 * Realistic roasted-coffee-bean body: an elongated oval with the signature
 * center crease physically carved into the surface (vertices pushed inward
 * along a curved groove), not just a tube floating on top. Plus organic
 * bumpiness and mottled roast coloring so it doesn't read as a smooth CAD egg.
 */
function useBeanGeometry() {
  return useMemo(() => {
    const geometry = new THREE.SphereGeometry(1, 128, 128)
    geometry.scale(0.58, 1, 0.4) // real bean proportions: oval, flattened front-to-back

    const pos = geometry.attributes.position
    const norm = geometry.attributes.normal
    const colors = new Float32Array(pos.count * 3)
    const roastLight = new THREE.Color('#6b4226')
    const roastDark = new THREE.Color('#2b1810')
    const creaseColor = new THREE.Color('#3a2313')
    const tmpColor = new THREE.Color()

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i)
      let y = pos.getY(i)
      let z = pos.getZ(i)
      const nx = norm.getX(i)
      const ny = norm.getY(i)
      const nz = norm.getZ(i)

      // The crease runs down the front face, curving gently like a real bean's score.
      const creaseX = Math.sin(y * 2.1) * 0.05
      const distFromCrease = x - creaseX
      const frontFacing = Math.max(0, nz)
      const creaseFalloff = Math.exp(-(distFromCrease * distFromCrease) / 0.01)
      const grooveDepth = 0.17 * creaseFalloff * frontFacing

      // Physically carve the groove by pushing vertices inward along their normal.
      x -= nx * grooveDepth
      y -= ny * grooveDepth
      z -= nz * grooveDepth

      // Organic roasted bumpiness on top of the carved base.
      const bump = (hashNoise(x * 10, y * 10, z * 10) - 0.5) * 0.03
      x += nx * bump
      y += ny * bump
      z += nz * bump

      pos.setXYZ(i, x, y, z)

      // Mottled roast tone, darkening toward the base of the groove.
      const mottle = hashNoise(x * 2.5, y * 2.5, z * 2.5)
      tmpColor.copy(roastDark).lerp(roastLight, mottle)
      if (creaseFalloff > 0.25 && frontFacing > 0.25) {
        tmpColor.lerp(creaseColor, Math.min(1, creaseFalloff * frontFacing * 1.3))
      }
      colors[i * 3] = tmpColor.r
      colors[i * 3 + 1] = tmpColor.g
      colors[i * 3 + 2] = tmpColor.b
    }
    pos.needsUpdate = true
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.computeVertexNormals()
    return geometry
  }, [])
}

function BeanMesh() {
  const bodyGeometry = useBeanGeometry()

  return (
    <mesh castShadow receiveShadow geometry={bodyGeometry}>
      <meshPhysicalMaterial
        vertexColors
        roughness={0.3}
        metalness={0.05}
        clearcoat={0.6}
        clearcoatRoughness={0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

interface CoffeeBeanProps {
  /** Narrow/portrait viewports: the text stack takes the full width above
   * the fold instead of sharing it side-by-side, so the bean needs to sit
   * lower to avoid rendering through the paragraph — and viewport.width
   * (in Three.js world units) shrinks a lot in portrait aspect, so the
   * normal width-based scale would render it almost invisibly small. */
  compact?: boolean
}

export default function CoffeeBean({ compact = false }: CoffeeBeanProps) {
  const groupRef = useRef<Group>(null)
  const { viewport } = useThree()

  // Canvas is full-bleed across the hero; the background mug photo sits
  // almost dead-center horizontally (~51% of the hero width) once it's
  // cover-cropped into the wide/short hero box, so keep the bean nearly
  // centered too — just a touch right of the mug so it doesn't sit flush
  // on top of it — to read as "falling toward the cup" instead of floating
  // off to one side of it.
  const xOffset = viewport.width * 0.04
  // viewport.height is derived purely from camera fov/distance, so it stays
  // ~constant across screen sizes — a reliable anchor for nudging the bean
  // down below the stacked mobile text without touching the desktop layout.
  const yOffset = compact ? -viewport.height * 0.2 : 0

  useFrame((state) => {
    if (!groupRef.current) return
    // Gentle back-and-forth sweep (not a full 360° spin) so the bean's broad
    // oval face keeps facing the camera — a flattened bean nearly disappears
    // when it rotates edge-on, which a continuous one-direction spin would hit.
    const autoSweep = Math.sin(state.clock.elapsedTime * 0.3) * 0.55
    const targetY = 0.15 + autoSweep + (state.pointer.x * Math.PI) / 14
    const targetX = (-state.pointer.y * Math.PI) / 16
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
  })

  // Sized down from the previous pass — this should read as a nicely-proportioned
  // accent, not dominate the hero. Portrait/mobile aspect ratios shrink
  // viewport.width a lot even on a physically similar-sized screen, so give
  // that case a floor rather than letting the same formula render a speck.
  const scale = compact
    ? Math.min(Math.max(viewport.width / 11, 0.42), 1.15)
    : Math.min(viewport.width / 11, 1.15)

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#fff2df" castShadow />
      <pointLight position={[xOffset - 3, yOffset - 1, 2]} intensity={0.8} color="#c97c3d" />
      <pointLight position={[xOffset + 2, yOffset - 2, 3]} intensity={0.5} color="#fff8ec" />

      <group ref={groupRef} position={[xOffset, yOffset, 0]} scale={scale}>
        <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.8}>
          <group rotation={[0.05, 0.15, 0]}>
            <BeanMesh />
          </group>
        </Float>
      </group>

      <ContactShadows
        position={[xOffset, yOffset - 1.15 * scale, 0]}
        opacity={0.4}
        scale={3.5 * scale}
        blur={2.6}
        far={1.6}
        color="#1a100a"
      />

      <Sparkles
        count={30}
        scale={[1.8 * scale, 2.6 * scale, 1.2 * scale]}
        position={[xOffset, yOffset + 1.4 * scale, 0]}
        size={3}
        speed={0.25}
        opacity={0.5}
        color="#f7f1e8"
        noise={1.5}
      />
    </>
  )
}
