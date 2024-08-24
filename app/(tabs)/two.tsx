import { FlatList, ListRenderItem, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { places } from "@/constants/places";
import { Link, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo, useState } from "react";

type Filter = "visited" | "not-visited" | "all";

export default function TabTwoScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
    });
  });

  const [filter, setFilter] = useState<Filter>("all");

  const filteredList = useMemo(() => {
    if (filter === "all") {
      return places;
    }
    return places.filter((place) => (filter === "visited" ? place.visited : !place.visited));
  }, [filter]);

  const renderItem: ListRenderItem<(typeof places)[number]> = ({ item }) => {
    return (
      <Link
        href={{
          pathname: "/places/[place]",
          params: { name: item.name, latitude: item.latLng.latitude, longitude: item.latLng.longitude },
        }}
      >
        <View style={styles.item}>
          <View style={{ gap: 3 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="map-pin" size={14} color="#626268" />
              <Text style={{ color: "#626268", marginLeft: 5, fontSize: 12 }}>{item.address}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View>{item.visited ? <Rating rating={item.rating} /> : null}</View>
            <View>{item.visited ? <Feather name="check-circle" size={22} color="#22c55e" /> : null}</View>
          </View>
        </View>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 22 }}>All Places</Text>
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 8, paddingTop: 10 }}
        ListHeaderComponent={<FilterHeader setFilter={setFilter} currentFilter={filter} />}
      />
    </View>
  );
}

function FilterHeader({ setFilter, currentFilter }: { setFilter: (filter: Filter) => void; currentFilter: Filter }) {
  return (
    <View style={{ flexDirection: "row", paddingBottom: 10, backgroundColor: "transparent", gap: 10 }}>
      <Pressable
        onPress={() => setFilter("all")}
        style={[styles.filterButton, { backgroundColor: currentFilter === "all" ? "#3983f7" : "white" }]}
      >
        <Text style={{ color: currentFilter === "all" ? "white" : "black" }}>All</Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("visited")}
        style={[styles.filterButton, { backgroundColor: currentFilter === "visited" ? "#3983f7" : "white" }]}
      >
        <Text style={{ color: currentFilter === "visited" ? "white" : "black" }}>Visited</Text>
      </Pressable>
      <Pressable
        onPress={() => setFilter("not-visited")}
        style={[styles.filterButton, { backgroundColor: currentFilter === "not-visited" ? "#3983f7" : "white" }]}
      >
        <Text style={{ color: currentFilter === "not-visited" ? "white" : "black" }}>Not Visited</Text>
      </Pressable>
    </View>
  );
}

function Rating({ rating }: { rating: number }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        backgroundColor: "#fdf9c2",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 12,
      }}
    >
      <Feather name="star" size={14} color="#eab208" />
      <Text style={{ color: "#eab208", marginLeft: 5, fontWeight: "bold", fontSize: 12 }}>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#f4f4f6",
    paddingHorizontal: 10,
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderRadius: 8,
  },
  filterButton: {
    borderRadius: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
