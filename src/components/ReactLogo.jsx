/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/reactLogo.glb -o ./src/components/ReactLogo.jsx 
Author: xenadus (https://sketchfab.com/xenadus)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/react-logo-76174ceeba96487f9863f974636f641e
Title: React logo
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function ReactLogo(props) {
  const { nodes, materials } = useGLTF('/reactLogo.glb')
  return (
    <group position={[0,0,-20]} {...props} dispose={null}>
      <group scale={0.1}>
        <mesh geometry={nodes['React-Logo_Material002_0'].geometry} position={[0, 7.935, 18.102]} rotation={[0, 0, -Math.PI / 2]} scale={[39.166, 39.166, 52.734]} />
        
      </group>
    </group>
  )
}

useGLTF.preload('/reactLogo.glb')