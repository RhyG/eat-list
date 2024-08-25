import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View } from "@/components/Themed";
import { useLayoutEffect, useState } from "react";
import { Pressable, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Storage } from "@/modules/storage";

export default function ItemDetail() {
  const { name, id, visited: _visited } = useLocalSearchParams<{ name: string; id: string; visited: string }>();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerBackTitle: "Places",
      headerShadowVisible: false,
    });
  });

  const [visited, setVisited] = useState(_visited === "true" ? true : false);

  function handleSetVisitedPressed(visited: boolean) {
    setVisited(visited);

    if (!id) return;

    const storedPlaces =
      Storage.getItem<Record<string, { name: string; id: string; visited: boolean; rating: number }>>("places") || {};

    storedPlaces[id].visited = visited;

    Storage.setItem("places", storedPlaces);
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 50, gap: 30, paddingTop: 40 }}>
      <View>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 22 }} numberOfLines={2}>
          {name}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 16, color: "#626268" }} numberOfLines={2}>
          123 Main St, Brisbane QLD
        </Text>
      </View>
      <VisitedButtons setVisited={handleSetVisitedPressed} visited={visited} />
      {visited ? (
        <>
          <Ratings id={id!} />
          <Comments />
        </>
      ) : null}
    </View>
  );
}

function VisitedButtons({ setVisited, visited }: { setVisited: (visited: boolean) => void; visited: boolean }) {
  return (
    <View>
      <Text style={{ fontWeight: 500, textAlign: "center", marginBottom: 10 }}>Have you been here?</Text>
      <View
        style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 30, gap: 15 }}
      >
        <Pressable
          style={{
            backgroundColor: visited ? "#18181a" : "transparent",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#d1d1db",
            flex: 1,
          }}
          onPress={() => setVisited(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "transparent" }}>
            <Feather name="check" size={18} color={visited ? "white" : "#18181a"} backgroundColor={"transparent"} />
            <Text style={{ fontWeight: 500, color: visited ? "white" : "#18181a" }}>Yes</Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: !visited ? "#18181a" : "transparent",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#d1d1db",
            flex: 1,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => setVisited(false)}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "transparent" }}>
            <Feather name="x" size={18} color={!visited ? "white" : "#18181a"} />
            <Text style={{ fontWeight: 500, color: !visited ? "white" : "#18181a" }}>No</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

function Ratings({ id }: { id: string }) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const firstRatings = [1, 2, 3, 4, 5];
  const secondRatings = [6, 7, 8, 9, 10];

  function handleRatingPressed(rating: number) {
    setSelectedRating(rating);

    const storedPlaces =
      Storage.getItem<Record<string, { name: string; id: string; visited: boolean; rating: number }>>("places") || {};

    storedPlaces[id].rating = rating;

    Storage.setItem("places", storedPlaces);
  }

  return (
    <View>
      <Text style={{ fontWeight: "500", marginBottom: 10 }}>Your Rating</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        {firstRatings.map((i) => (
          <Rating key={i} index={i} selected={selectedRating === i} setSelected={handleRatingPressed} />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 10 }}>
        {secondRatings.map((i) => (
          <Rating key={i} index={i} selected={selectedRating === i} setSelected={handleRatingPressed} />
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
    <View style={{ width: "100%" }}>
      <Text style={{ fontWeight: "500", marginBottom: 10 }}>Comments</Text>
      <TextInput
        multiline
        textAlignVertical="top"
        style={{ borderWidth: 1, borderColor: "#d1d1db", padding: 10, borderRadius: 5, height: 200 }}
        numberOfLines={20}
        placeholder="Write a comment..."
      />
    </View>
  );
}
