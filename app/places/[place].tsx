import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useLayoutEffect, useState } from "react";
import { Pressable, TextInput } from "react-native";

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
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 20, gap: 20, paddingTop: 20 }}>
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 22 }} numberOfLines={2}>
          {name}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, color: "#626268" }} numberOfLines={2}>
          123 Main St, Brisbane QLD
        </Text>
      </View>
      <Ratings />
      <Comments />
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

function Comments() {
  return (
    <View style={{ width: "80%" }}>
      <Text style={{ fontWeight: "500", marginBottom: 10 }}>Comments</Text>
      <TextInput
        multiline
        textAlignVertical="top"
        style={{ borderWidth: 1, borderColor: "#d1d1db", padding: 10, borderRadius: 5, height: 200 }}
        numberOfLines={20}
      />
    </View>
  );
}
