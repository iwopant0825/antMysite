import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import Section1 from "./OverComponents/Section1";
import Section2 from "./OverComponents/Section2";
import Section3 from "./OverComponents/Section3";
import Section4 from "./OverComponents/Section4";
import Section5 from "./OverComponents/Section5";

export default function Over({setSceneAn,setScrollTest}) {
    const scroll = useScroll();
    const test1 = useRef(null);
    const test2 = useRef(null);
    const test3 = useRef(null);
    const test4 = useRef(null);
    const test5 = useRef(null);
    const [page, setpage] = useState(1);
  
    const scrollToSection = (elementRef) => {
      scroll.el.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "auto",
      });
    };
  
    useFrame(() => {
      let offset = scroll.offset;
      offset = Math.max(0, Math.min(1, offset));
      const scrollData = (Math.round(offset * 100) / 100) * 4 + 1;
      setScrollTest(scrollData)
      if (page == 1) {
        if (scrollData >= page + 0.0001 && scrollData < page + 0.8) {
          setSceneAn(2)
          scrollToSection(test2);
        }
      } else if (page == 2) {
        if (scrollData >= page + 0.0001 && scrollData < page + 0.8) {
          setSceneAn(3)
          scrollToSection(test3);
        } else if (scrollData <= page - 0.0001 && scrollData > page - 0.8) {
          setSceneAn(1)
          scrollToSection(test1);
        }
      } else if (page == 3) {
        if (scrollData >= page + 0.0001 && scrollData < page + 0.8) {
          setSceneAn(4)
          scrollToSection(test4);
        } else if (scrollData <= page - 0.0001 && scrollData > page - 0.8) {
          setSceneAn(2)
          scrollToSection(test2);
        }
      } else if (page == 4) {
        if (scrollData >= page + 0.0001 && scrollData < page + 0.8) {
          setSceneAn(5)
          scrollToSection(test5);
        } else if (scrollData <= page - 0.0001 && scrollData > page - 0.8) {
          setSceneAn(3)
          scrollToSection(test3);
        }
      } else if (page == 5) {
        if (scrollData <= page - 0.0001 && scrollData > page - 0.8) {
          setSceneAn(4)
          scrollToSection(test4);
        }
      }
  
      if (scrollData == 1) {
        setpage(1);
      } else if (scrollData == 2) {
        setpage(2);
      } else if (scrollData == 3) {
        setpage(3);
      } else if (scrollData == 4) {
        setpage(4);
      } else if (scrollData == 5) {
        setpage(5);
      }
  
      if (
        scrollData !== 1 &&
        scrollData !== 2 &&
        scrollData !== 3 &&
        scrollData !== 4 &&
        scrollData !== 5
      ) {
        scroll.el.style.overflow = "hidden";
      } else {
        scroll.el.style.overflow = "auto";
      }
    });
  
    return (
      <>
        <div ref={test1} style={{ height: "100dvh", width: "100%" }}>
          <Section1/>
        </div>
        <div ref={test2} style={{ height: "100dvh", width: "100%" }}>
          <Section2/>
        </div>
        <div ref={test3} style={{ height: "100dvh", width: "100%" }}>
          <Section3/>
        </div>
        <div ref={test4} style={{ height: "100dvh", width: "100%" }}>
          <Section4/>
        </div>
        <div ref={test5} style={{ height: "100dvh", width: "100%" }}>
          <Section5/>
        </div>
      </>
    );
  }