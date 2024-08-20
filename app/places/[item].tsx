import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { Text } from "@/components/Themed";

export default function ItemDetail() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  console.log("Local:", local.user, "Global:", glob.user);

  return <Text>Item</Text>;
}
