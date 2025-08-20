import { useGLTF } from '@react-three/drei'

export function LogoModel(props) {
  const { scene } = useGLTF('/LogoModel.glb')
  return <primitive object={scene} {...props} />
}

useGLTF.preload('/LogoModel.glb')


