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

/** Heart-shaped bean body, extruded + beveled, then given an organic bumpy surface and mottled roast coloring. */
function useHeartGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape()
    // Traced bottom -> right lobe -> top notch -> left lobe -> bottom (CCW winding
    // so ExtrudeGeometry's computed face normals point outward, toward the camera).
    shape.moveTo(0, -0.95)
    shape.bezierCurveTo(0, -1.5, 1.1, -1.5, 1.1, -0.72)
    shape.bezierCurveTo(1.1, -0.05, 0.42, 0.32, 0, 0.82)
    shape.bezierCurveTo(-0.42, 0.32, -1.1, -0.05, -1.1, -0.72)
    shape.bezierCurveTo(-1.1, -1.5, 0, -1.5, 0, -0.95)

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.08,
      bevelSegments: 8,
      curveSegments: 24,
    })
    geometry.center()
    geometry.computeVertexNormals()

    // Bumpy, craggy roasted-bean surface: nudge each vertex along its normal by
    // small pseudo-random amounts instead of leaving a perfectly smooth CAD surface.
    const pos = geometry.attributes.position
    const norm = geometry.attributes.normal
    const colors = new Float32Array(pos.count * 3)
    const roastLight = new THREE.Color('#6b4226')
    const roastDark = new THREE.Color('#2b1810')
    const tmpColor = new THREE.Color()

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const nx = norm.getX(i)
      const ny = norm.getY(i)
      const nz = norm.getZ(i)

      const bump = (hashNoise(x * 9, y * 9, z * 9) - 0.5) * 0.045
      pos.setXYZ(i, x + nx * bump, y + ny * bump, z + nz * bump)

      // Mottled roast: blend two brown tones by a second, lower-frequency noise field.
      const mottle = hashNoise(x * 2.5, y * 2.5, z * 2.5)
      tmpColor.copy(roastDark).lerp(roastLight, mottle)
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

function useCreaseGeometry(baseRadius: number) {
  return useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.68, 0.34),
      new THREE.Vector3(0.03, 0.28, 0.4),
      new THREE.Vector3(-0.03, -0.15, 0.42),
      new THREE.Vector3(0.02, -0.5, 0.38),
      new THREE.Vector3(0, -0.88, 0.28),
    ])
    const geometry = new THREE.TubeGeometry(curve, 40, baseRadius, 10, false)
    // Irregular, torn-fissure look instead of a perfectly uniform tube.
    const pos = geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const jitter = 1 + (hashNoise(x * 14, y * 14, z * 14) - 0.5) * 0.5
      pos.setXYZ(i, x, y, z * jitter)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()
    return geometry
  }, [baseRadius])
}

function useSideCrack(points: [number, number, number][]) {
  return useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)))
    return new THREE.TubeGeometry(curve, 12, 0.014, 6, false)
  }, [points])
}

function BeanMesh() {
  const bodyGeometry = useHeartGeometry()
  const creaseGeometry = useCreaseGeometry(0.045)
  const leftCrack = useSideCrack([
    [-0.5, 0.3, 0.32],
    [-0.7, 0.15, 0.34],
    [-0.55, -0.05, 0.36],
  ])
  const rightCrack = useSideCrack([
    [0.45, -0.35, 0.28],
    [0.62, -0.5, 0.3],
    [0.5, -0.68, 0.32],
  ])

  return (
    <group>
      <mesh castShadow receiveShadow geometry={bodyGeometry}>
        <meshPhysicalMaterial
          vertexColors
          roughness={0.28}
          metalness={0.05}
          clearcoat={0.55}
          clearcoatRoughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh geometry={creaseGeometry}>
        <meshStandardMaterial color="#c9a26b" roughness={0.6} metalness={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={leftCrack}>
        <meshStandardMaterial color="#150c07" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={rightCrack}>
        <meshStandardMaterial color="#150c07" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default function CoffeeBean() {
  const groupRef = useRef<Group>(null)
  const { viewport } = useThree()

  // Canvas is now full-bleed across the hero; offset the bean itself toward the
  // right so the asymmetric composition still holds within the wider frame.
  const xOffset = viewport.width * 0.24

  useFrame((state) => {
    if (!groupRef.current) return
    // Continuous slow auto-rotation so the 3D-ness reads immediately on load,
    // not only once the visitor moves their cursor over it.
    const autoSpin = state.clock.elapsedTime * 0.18
    const targetY = 0.15 + autoSpin + (state.pointer.x * Math.PI) / 12
    const targetX = (-state.pointer.y * Math.PI) / 16
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
  })

  const scale = Math.min(viewport.width / 7, 1.75)

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#fff2df" castShadow />
      <pointLight position={[xOffset - 3, -1, 2]} intensity={0.8} color="#c97c3d" />
      <pointLight position={[xOffset + 2, -2, 3]} intensity={0.5} color="#fff8ec" />

      <group ref={groupRef} position={[xOffset, 0, 0]} scale={scale}>
        <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.8}>
          <group rotation={[0.05, 0.15, 0]}>
            <BeanMesh />
          </group>
        </Float>
      </group>

      <ContactShadows
        position={[xOffset, -1.15 * scale, 0]}
        opacity={0.4}
        scale={3.5 * scale}
        blur={2.6}
        far={1.6}
        color="#1a100a"
      />

      <Sparkles
        count={30}
        scale={[1.8 * scale, 2.6 * scale, 1.2 * scale]}
        position={[xOffset, 1.4 * scale, 0]}
        size={3}
        speed={0.25}
        opacity={0.5}
        color="#f7f1e8"
        noise={1.5}
      />
    </>
  )
}
