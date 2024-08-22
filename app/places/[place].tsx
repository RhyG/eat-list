import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useLayoutEffect, useState } from "react";
import { Pressable } from "react-native";

export default function ItemDetail() {
  const { name, latitude, longitude } = useLocalSearchParams<{ name: string; latitude: string; longitude: string }>();
  console.log({ latitude, longitude });

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerBackTitle: "Places",
      headerShadowVisible: false,
    });
  });

  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 22 }}>{name}</Text>
      <Text style={{ fontSize: 16, color: "#626268" }}>123 Main St, Brisbane QLD</Text>
      <Ratings />
    </View>
  );
}

function Ratings() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const ratings = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <View>
      <Text style={{ fontWeight: "500", marginBottom: 10 }}>Your Rating</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
        {ratings.map((i) => (
          <Rating key={i} index={i} selected={selectedRating === i} setSelected={setSelectedRating} />
        ))}
      </View>
    </View>
  );
}

function Rating({
  index,
  selected,
  setSelected,
}: {
  index: number;
  selected: boolean;
  setSelected: (index: number) => void;
}) {
  return (
    <Pressable
      onPress={() => setSelected(index)}
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#d1d1db",
        padding: 10,
        borderRadius: 5,
        height: 50,
        width: 50,
        backgroundColor: selected ? "#18181a" : "transparent",
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, color: selected ? "white" : "#18181a" }}>{index}</Text>
    </Pressable>
  );
}
