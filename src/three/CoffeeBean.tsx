import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

function BeanMesh() {
  const creaseGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.92, 0.28),
      new THREE.Vector3(0.1, -0.4, 0.36),
      new THREE.Vector3(-0.08, 0.05, 0.4),
      new THREE.Vector3(0.08, 0.45, 0.36),
      new THREE.Vector3(0, 0.92, 0.28),
    ])
    return new THREE.TubeGeometry(curve, 32, 0.075, 12, false)
  }, [])

  return (
    <group>
      {/* Bean body — flattened ellipsoid, less spherical than a plain egg */}
      <mesh castShadow receiveShadow scale={[0.74, 0.98, 0.4]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#5a3820" roughness={0.5} metalness={0.05} />
      </mesh>
      {/* Groove shadow — wider, soft-edged, sits just under the crease line */}
      <mesh scale={[0.78, 0.99, 0.41]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#150c07"
          roughness={0.9}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
      {/* Crease — curved tube tracing the bean's signature S-shaped groove */}
      <mesh geometry={creaseGeometry}>
        <meshStandardMaterial color="#0f0906" roughness={0.85} />
      </mesh>
    </group>
  )
}

export default function CoffeeBean() {
  const groupRef = useRef<Group>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (!groupRef.current) return
    const targetY = 0.2 + (state.pointer.x * Math.PI) / 10
    const targetX = (-state.pointer.y * Math.PI) / 12
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
  })

  const scale = Math.min(viewport.width / 6, 1.6)

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} color="#fff2df" castShadow />
      <pointLight position={[-3, -1, 2]} intensity={0.6} color="#c97c3d" />

      <group ref={groupRef} scale={scale}>
        <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
          <group rotation={[0.05, 0.2, -0.08]}>
            <BeanMesh />
          </group>
        </Float>
      </group>

      <Sparkles
        count={22}
        scale={[1.6 * scale, 2.4 * scale, 1.2 * scale]}
        position={[0, 1.4 * scale, 0]}
        size={3}
        speed={0.25}
        opacity={0.5}
        color="#f7f1e8"
        noise={1.5}
      />
    </>
  )
}
