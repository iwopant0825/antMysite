import { Box, OrbitControls, Shape, Sphere } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import { LogoModel } from "./LogoModel";
import { useFrame, useThree } from "@react-three/fiber";

export default function Scene({ sceneAn }) {
  const { viewport } = useThree();
  if (viewport && viewport.width > 6) {
    useFrame(({ mouse, camera }) => {
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        mouse.x * 1,
        0.03
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        mouse.y * 1,
        0.01
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        Math.max(4, Math.abs(mouse.x * mouse.y * 4)),
        0.01
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        mouse.x * -Math.PI * 0.025,
        0.001
      );
    });
  }
  const modelSpring = useSpring({
    rotation:
      sceneAn == 2
        ? [1, 1, 1]
        : sceneAn == 3
        ? [2, 2, 2]
        : sceneAn == 4
        ? [3, 3, 3]
        : sceneAn == 5
        ? [4, 4, 4]
        : [0, 0, 0],
    position:
      sceneAn == 2
        ? [0, 100, 0]
        : sceneAn == 3
        ? [0, 100, 0]
        : sceneAn == 4
        ? [0, 100, 0]
        : sceneAn == 5
        ? [0, 100, 0]
        : [0, 1, 0],
  });

  return (
    <>
      <OrbitControls enableZoom={false}/>
      <animated.mesh position={modelSpring.position} rotation={modelSpring.rotation}>
        <LogoModel />
      </animated.mesh>
    </>
  );
}
