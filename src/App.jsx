import Hero from "./components/Hero";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Immersion from "./components/Immersion";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // 고정 2초 로딩
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <Loading done={loaded} />
      {loaded && (
        <>
          <Header />
          <Hero />
          <Profile />
          {/* <Immersion /> */}
          <Skills />
          <Timeline />
          <Projects />
          <Footer />
        </>
      )}
    </>
  );
}
