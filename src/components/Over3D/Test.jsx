import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Test3D({ position }) {
  const { viewport } = useThree();
  return (
    <Text
      position={position}
      color={'black'}
      fontSize={viewport.width > 6 ? viewport.width / 14 : viewport.width / 12}
      anchorX="center"
      anchorY="middle"
    >
      TEST.TEXT
    </Text>
  );
}
