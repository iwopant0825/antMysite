import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Title1({ position }) {
  const { viewport } = useThree();
  return (
    <Text
      position={position}
      color={'black'}
      fontSize={viewport.width > 6 ? viewport.width / 20 : viewport.width / 12}
      anchorX="center"
      anchorY="middle"
      font={"/font/Pretendard-Light.otf"}
    >
      FE DEVELOPER
    </Text>
  );
}
