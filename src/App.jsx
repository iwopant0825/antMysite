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
import OverHeader from "./components/OverComponents/Header";

export default function App() {
  const [sceneAn, setSceneAn] = useState(1)
  return (
    <Layout>
      <OverHeader/>
      <Canvas style={{ position: "absolute" }}>
        <directionalLight shadow-mapSize={4096} castShadow position={[-4, 11, 4]} intensity={6} />
        <ambientLight intensity={1}/>
        <color attach={'background'} args={['#161616']}/>
        <ScrollControls pages={5} damping={0.3}>
          <ScrollManager />
          <Scene sceneAn={sceneAn}/>
          <Scroll html style={{ width: "100%",zIndex:10 }}>
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