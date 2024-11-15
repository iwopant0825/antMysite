import {
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import ScrollManager from "./components/ScrollManager";
import Scene from "./components/Scene";
import Over from "./components/Over";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import styled from "styled-components";

export default function App() {
  const [sceneAn, setSceneAn] = useState(1)
  return (
    <Layout>
      <Canvas style={{ position: "absolute" }}>
        <directionalLight shadow-mapSize={4096} castShadow position={[-4, 11, 4]} intensity={6} />
        <ambientLight intensity={1}/>
        <color attach={'background'} args={['#161616']}/>
        <ScrollControls pages={5} damping={0.2}>
          <ScrollManager />
          <Scene sceneAn={sceneAn}/>
          <Scroll html style={{ width: "100%" }}>
            <Over setSceneAn={setSceneAn}/>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </Layout>
  );
}

const Layout = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
`;