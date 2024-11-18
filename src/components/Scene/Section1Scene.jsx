import { Html } from "@react-three/drei";

export default function Section1Scene() {
  return (
    <Html
      style={{ backgroundColor: "#161616" }}
      center
      transform
      occlude="blending"
      position={[0, 0, -10]}
      zIndexRange={[0, 1]}
    >
      <div style={{ color: "white", fontSize: "300px", marginBottom: "80px" }}>
        <div
          style={{
            fontSize: "50px",
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
