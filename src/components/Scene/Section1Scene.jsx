import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Section1Scene() {
  const { viewport } = useThree();
  return (
    <Html
      style={{ backgroundColor: "transparent" }}
      center
      transform
      occlude="blending"
      position={[0, 0, -10]}
      zIndexRange={[0, 1]}
      scale={viewport.width>6? viewport.width / 14 : viewport.width / 12}
    >
      <div style={{ color: "white", fontSize: "300px", marginBottom: "80px" }}>
        <div
          style={{
            fontSize: viewport.width>6? "50px":'150px',
            color: "#b4b4b4",
            marginLeft: "15px",
            display: "flex",
            alignItems: "flex-end",
            padding: "0",
            fontWeight: 100,
          }}
        >
          FE
          <div style={{ color: "#ffffff", marginLeft: "10px" }}>Cha Ho Rim</div>
        </div>
        Developer
      </div>
    </Html>
  );
}
