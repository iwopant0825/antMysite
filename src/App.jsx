import { Suspense, useEffect, useState, lazy } from "react";
import Loading from "./components/Loading";
import CursorGlass from "./components/CursorGlass";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const Profile = lazy(() => import("./components/Profile"));
const Skills = lazy(() => import("./components/Skills"));
const Timeline = lazy(() => import("./components/Timeline"));
const Projects = lazy(() => import("./components/Projects"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // 고정 1초 로딩
    const t = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <CursorGlass />
      <Loading done={loaded} />
      {loaded && (
        <Suspense fallback={null}>
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
        </Suspense>
      )}
    </>
  );
}
