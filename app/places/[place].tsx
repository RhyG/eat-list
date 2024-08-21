import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Text } from "@/components/Themed";

export default function ItemDetail() {
  const local = useLocalSearchParams();

  return <Text>{local.name}</Text>;
}
