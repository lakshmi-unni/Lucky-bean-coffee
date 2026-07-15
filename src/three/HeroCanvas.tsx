import { Canvas } from '@react-three/fiber'
import CoffeeBean from './CoffeeBean'

interface HeroCanvasProps {
  /** Narrow/portrait screens: the bean needs a size and vertical-position
   * adjustment so it doesn't render too small or through the stacked text. */
  compact?: boolean
}

export default function HeroCanvas({ compact = false }: HeroCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <CoffeeBean compact={compact} />
    </Canvas>
  )
}
