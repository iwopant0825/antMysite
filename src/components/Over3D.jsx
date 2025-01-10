/* eslint-disable react/no-unknown-property */
import { Box, Scroll } from "@react-three/drei";
import Title1 from "./Over3D/Title1";
import { useThree } from "@react-three/fiber";
import Title2 from "./Over3D/Title2";

export default function Over3D() {
  const { viewport } = useThree();
  return (
    <Scroll>
      <group position={[0, 0, 0]}>
        {/* <group position={[0, -viewport.height+8.5, 0]}>
          <Title1 position={[-4.3, 0, 0]}/>
          <Title2 position={[4.3, 0, 0]}/>
        </group> */}
      </group>
      {/* <group position={[0, -viewport.height, 0]}>
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
      </group> */}
    </Scroll>
  );
}
