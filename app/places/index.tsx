import { Text } from "@/components/Themed";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";

export default function Page() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();

  // console.log("Local:", local.user, "Global:", glob.user);

  return <Text>Places</Text>;
}
