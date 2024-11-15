import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'

export function MacBook({open}) {
  const { nodes, materials, scene } = useGLTF('/mac.glb')
  const modelRef=useRef()

  const spring = useSpring({
    rotation : open? [-3.8, 0, 0] : [-1.925, 0, 0] 
  })


  return (
    <group scale={1.4} dispose={null}>
      <animated.group position={[0, 0.1, -1.012]} rotation={spring.rotation} ref={modelRef}>
        <group rotation={[1.931, 0, 0]}>
          <mesh castShadow geometry={nodes.Object_11_1.geometry} material={materials['Material.003']} />
          <mesh castShadow geometry={nodes.Object_11_2.geometry} material={materials['Material.007']} />
          <mesh castShadow geometry={nodes.Object_11_3.geometry} material={materials['Material.005']} />
          <mesh castShadow geometry={nodes.Object_11_4.geometry} material={materials['Material.008']} />
          <mesh castShadow geometry={nodes.Object_11_5.geometry} material={materials['Material.017']} />
        </group>
      </animated.group>
      <mesh castShadow geometry={nodes.Object_10.geometry} material={materials['Material.002']} />
      <mesh castShadow geometry={nodes.Object_11.geometry} material={materials['Material.002']} />
      <mesh castShadow geometry={nodes.Object_12.geometry} material={materials['Material.009']} />
      <mesh castShadow geometry={nodes.Object_13.geometry} material={materials['Material.009']} />
      <mesh castShadow geometry={nodes.Object_4.geometry} material={materials['Material.003']} />
      <mesh castShadow geometry={nodes.Object_5.geometry} material={materials['Material.013']} />
      <mesh castShadow geometry={nodes.Object_6.geometry} material={materials['Material.016']} />
      <mesh castShadow geometry={nodes.Object_7.geometry} material={materials['Material.004']} />
      <mesh castShadow geometry={nodes.Object_8.geometry} material={materials['Material.002']} />
      <mesh castShadow geometry={nodes.Object_9.geometry} material={materials['Material.002']} />
      <mesh castShadow geometry={nodes.Object_15.geometry} material={materials['Material.011']} position={[-1.454, 0.086, -0.566]} />
      <mesh castShadow geometry={nodes.Object_28.geometry} material={materials['Material.010']} position={[-1.485, 0.086, -0.761]} rotation={[0, 0, -Math.PI / 2]} scale={-0.005} />
      <mesh castShadow geometry={nodes.Object_25.geometry} material={materials['Material.003']} />
      <mesh castShadow geometry={nodes.Object_26.geometry} material={materials['Material.014']} />
    </group>
  )
}

useGLTF.preload('/mac.glb')