import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Scene() {
  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 1, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 1, 0.03)
    camera.lookAt(0, 0, 0)
  })
  return null
}


