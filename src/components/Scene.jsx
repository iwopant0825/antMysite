import { Box, Html, OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { MacBook } from "./Macbook";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Section1Scene from "./Scene/Section1Scene";
import { ReactLogo } from "./ReactLogo";

export default function Scene({ sceneAn }) {
  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.5,
      0.03
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.8,
      0.01
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      Math.max(4, Math.abs(mouse.x * mouse.y * 8)),
      0.01
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      mouse.x * -Math.PI * 0.025,
      0.001
    );
  });

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sceneAn == 2) {
      setOpen(true);
    } else if (sceneAn == 1) {
      setOpen(false);
    }
  }, [sceneAn]);

  const animationMac = useSpring({
    rotation:
      sceneAn == 2
        ? [0.5, 0.6, 0.3]
        : sceneAn == 3
        ? [0, 0, 0]
        : sceneAn == 4
        ? [0, 0, 0]
        : sceneAn == 5
        ? [0, 0, 0]
        : [0, 0, 0], // <----sceneAn==1

    position:
      sceneAn == 2
        ? [1.3, -0.5, 0]
        : sceneAn == 3
        ? [0, 0, 0]
        : sceneAn == 4
        ? [0, 0, 0]
        : sceneAn == 5
        ? [0, 0, 0]
        : [0, -1, 0], // <----sceneAn==1
  });
  console.log(animationMac.position);

  return (
    <>
      <animated.mesh
        rotation={animationMac.rotation}
        position={animationMac.position}
      >
        <MacBook open={open} />
      </animated.mesh>
      <Section1Scene/>
    
    </>
  );
}
