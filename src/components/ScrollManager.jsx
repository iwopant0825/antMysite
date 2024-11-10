import { useScroll } from "@react-three/drei";

export default function ScrollManager() {
  const data = useScroll();
  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  return null;
}