import { Canvas } from '@react-three/fiber'
import CoffeeBean from './CoffeeBean'

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <CoffeeBean />
    </Canvas>
  )
}
