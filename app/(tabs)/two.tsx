import { FlatList, ListRenderItem, StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Text, View } from "@/components/Themed";

import { Link, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo, useState } from "react";
import { usePlacesContext } from "@/providers/PlacesProvider";

type Filter = "visited" | "not-visited" | "all";

export default function TabTwoScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
    });
  });

  const { places } = usePlacesContext();

  const [filter, setFilter] = useState<Filter>("all");

  const filteredList = useMemo(() => {
    const placesArr = Object.keys(places).map((key) => places[key]);
    const sorted = placesArr.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    if (filter === "all") {
      return sorted;
    }
    return sorted.filter((place) => (filter === "visited" ? place.visited : !place.visited));
  }, [filter, places]);

  const renderItem: ListRenderItem<(typeof places)[number]> = ({ item }) => {
    return (
      <Link
        href={{
          pathname: "/places/[place]",
          params: { name: item.name, visited: String(item.visited), id: item.id },
        }}
      >
        <View style={styles.item}>
          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather name="map-pin" size={14} color="#626268" />
              <Text style={{ color: "#626268", marginLeft: 5, fontSize: 12 }}>{item.address}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              {(places[item.id]?.categories ?? []).map((category) => (
                <View
                  style={{ backgroundColor: "#f4f4f6", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 115 }}
                >
                  <Text style={{ fontSize: 12 }}>{category}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View>{item.rating ? <Rating rating={item.rating} /> : null}</View>
            <View>{item.visited ? <Feather name="check-circle" size={22} color="#22c55e" /> : null}</View>
          </View>
        </View>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 22, paddingBottom: 10 }}>All Places</Text>
      <FlatList
        data={filteredList}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 8 }}
        ListHeaderComponent={<FilterHeader setFilter={setFilter} currentFilter={filter} />}
      />
    </View>
  );
}

function FilterHeader({ setFilter, currentFilter }: { setFilter: (filter: Filter) => void; currentFilter: Filter }) {
  const { places } = usePlacesContext();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = useMemo(() => {
    const categories = new Set<string>();

    Object.keys(places).forEach((key) => {
      const place = places[key];
      (place.categories ?? []).forEach((category) => {
        if (!categories.has(category)) {
          categories.add(category);
        }
      });
    });

    return Array.from(categories);
  }, [places]);

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View style={{ flexDirection: "row", paddingBottom: 10, backgroundColor: "transparent", gap: 10 }}>
        <Pressable
          onPress={() => setFilter("all")}
          style={[styles.filterButton, { backgroundColor: currentFilter === "all" ? "#3983f7" : "white" }]}
        >
          <Text style={{ fontSize: 14, color: currentFilter === "all" ? "white" : "black" }}>All</Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("visited")}
          style={[styles.filterButton, { backgroundColor: currentFilter === "visited" ? "#3983f7" : "white" }]}
        >
          <Text style={{ fontSize: 14, color: currentFilter === "visited" ? "white" : "black" }}>Visited</Text>
        </Pressable>
        <Pressable
          onPress={() => setFilter("not-visited")}
          style={[styles.filterButton, { backgroundColor: currentFilter === "not-visited" ? "#3983f7" : "white" }]}
        >
          <Text style={{ fontSize: 14, color: currentFilter === "not-visited" ? "white" : "black" }}>Not Visited</Text>
        </Pressable>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Filter by Tags:</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          backgroundColor: "transparent",
          width: "100%",
          flexWrap: "wrap",
          paddingBottom: 10,
        }}
      >
        {filteredCategories.map((tag) => (
          <Pressable
            key={tag}
            onPress={() => {
              if (selectedCategories.includes(tag)) {
                setSelectedCategories((tags) => tags.filter((t) => t !== tag));
              } else {
                setSelectedCategories((tags) => [...tags, tag]);
              }
            }}
            style={[styles.filterButton, { backgroundColor: selectedCategories.includes(tag) ? "#22c55e" : "white" }]}
          >
            <Text style={{ fontSize: 14, color: selectedCategories.includes(tag) ? "white" : "black" }}>{tag}</Text>
          </Pressable>
        ))}
      </View>
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
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
