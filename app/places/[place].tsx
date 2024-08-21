import { useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";

export default function ItemDetail() {
  const { name, latitude, longitude } = useLocalSearchParams<{ name: string; latitude: string; longitude: string }>();

  return (
    <View>
      <Text>{name}</Text>
      <Text>
        {latitude}, {longitude}
      </Text>
    </View>
  );
}
