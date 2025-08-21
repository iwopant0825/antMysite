import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'

export function LogoModel(props) {
  const { scene } = useGLTF('/LogoModel.glb')

  // Outline (cartoon edge) using a duplicated inverted mesh with flat white material
  const outlined = useMemo(() => {
    const group = new THREE.Group()
    const clone = scene.clone(true)
    group.add(clone)
    clone.traverse((obj) => {
      if (obj.isMesh) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((m) => {
          if (!m) return
          if (m.color) m.color = new THREE.Color(0x111111)
          if (typeof m.metalness === 'number') m.metalness = Math.min(0.2, m.metalness)
          if (typeof m.roughness === 'number') m.roughness = Math.max(0.85, m.roughness)
          m.side = THREE.FrontSide
          m.needsUpdate = true
        })
      }
    })

    const outline = scene.clone(true)
    outline.traverse((obj) => {
      if (obj.isMesh) {
        obj.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide })
        obj.scale.multiplyScalar(1.04) // slightly bigger to show as outline
      }
    })
    group.add(outline)
    return group
  }, [scene])

  return <primitive object={outlined} {...props} />
}

useGLTF.preload('/LogoModel.glb')


