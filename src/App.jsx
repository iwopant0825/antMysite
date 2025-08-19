import { Canvas } from '@react-three/fiber'
import { OrbitControls, ScrollControls } from '@react-three/drei'
import Scene from '@/components/Scene'

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[1, 2, 3]} intensity={1.2} />
        <OrbitControls enableZoom={false} />
        <ScrollControls pages={3} damping={0.3}>
          <Scene />
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App
