import { Box } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

export default function Scene({ sceneAn }) {
  const { rotation } = useSpring({
    rotation: sceneAn==2 ? [1,1,1] : 
              sceneAn==3 ? [2,2,2] : 
              sceneAn==4 ? [3,3,3] : 
              sceneAn==5 ? [4,4,4] : 
              [0,0,0] ,
  });

  return (
    <>
      <animated.mesh rotation={rotation}>
        <Box args={[1, 1, 1]}>
          <meshNormalMaterial/>
        </Box>
      </animated.mesh>
    </>
  );
}