/* eslint-disable react/no-unknown-property */
import { Box, Scroll } from "@react-three/drei";
import Test3D from "./Over3D/Test";
import { useThree } from "@react-three/fiber";

export default function Over3D() {
  const { viewport } = useThree();
  return (
    <Scroll>
      <group position={[0, 0, 0]}>
        <Box position={[0, 0, 0]}></Box>
        <Test3D />
      </group>
      <group position={[0, -viewport.height, 0]}>
        <Box position={[0, 0, 0]}></Box>
        <Test3D />
      </group>
      <group position={[0, -viewport.height * 2, 0]}>
        <Box position={[0, 0, 0]}></Box>
        <Test3D />
      </group>
      <group position={[0, -viewport.height * 3, 0]}>
        <Box position={[0, 0, 0]}></Box>
        <Test3D />
      </group>
      <group position={[0, -viewport.height * 4, 0]}>
        <Box position={[0, 0, 0]}></Box>
        <Test3D />
      </group>
    </Scroll>
  );
}
