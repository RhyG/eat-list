import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Link } from "expo-router";

import { Text, View } from "@/components/Themed";
import { usePlacesContext } from "@/providers/PlacesProvider";
import { Place } from "@/types";
import { useNavigationOptions } from "@/hooks/useNavigationOptions";

type Filter = "visited" | "not-visited" | "all";

export default function TabTwoScreen() {
  useNavigationOptions({
    headerShown: false,
    headerTransparent: true,
  });

  const { places } = usePlacesContext();

  const [filter, setFilter] = useState<Filter>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const sortedPlaces = useMemo(() => {
    return Object.values(places).sort((a, b) => a.name.localeCompare(b.name));
  }, [places]);

  const filteredList = useMemo(() => {
    // Early return for no filtering
    if (filter === "all" && selectedCategories.length === 0) {
      return sortedPlaces;
    }

    return sortedPlaces.filter((place) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        (place.categories && selectedCategories.every((category) => place.categories.includes(category)));

      const matchesVisited = filter === "all" || (filter === "visited" ? place.visited : !place.visited);

      return matchesCategory && matchesVisited;
    });
  }, [filter, places, selectedCategories, sortedPlaces]);

  const renderItem: ListRenderItem<Place> = ({ item }) => {
    const categories = places[item.id]?.categories ?? [];
    const showExtraCategoryIndicator = categories.length > 3;

    const categoriesToRender = categories.slice(0, 3);

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
              {categoriesToRender.map((category) => (
                <Category category={category} key={category} />
              ))}
              {showExtraCategoryIndicator ? (
                <View
                  style={{ backgroundColor: "#f4f4f6", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 115 }}
                >
                  <Text style={{ fontSize: 12 }}>+{categories.length - 3}</Text>
                </View>
              ) : null}
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
      <Text style={styles.allPlacesText}>All Places</Text>
      <FlashList
        data={filteredList}
        renderItem={renderItem}
        ListHeaderComponent={
          <FilterHeader
            setFilter={setFilter}
            currentFilter={filter}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        }
        estimatedItemSize={373}
      />
    </View>
  );
}

function Category({ category }: { category: string }) {
  return (
    <View style={{ backgroundColor: "#f4f4f6", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 115 }}>
      <Text style={{ fontSize: 12 }}>{category}</Text>
    </View>
  );
}

function FilterHeader({
  setFilter,
  currentFilter,
  selectedCategories,
  setSelectedCategories,
}: {
  setFilter: Dispatch<SetStateAction<Filter>>;
  currentFilter: Filter;
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
}) {
  const { places } = usePlacesContext();

  const allCategories = useMemo(() => {
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

  function selectCategory(tag: string) {
    if (selectedCategories.includes(tag)) {
      setSelectedCategories((tags) => tags.filter((t) => t !== tag));
    } else {
      setSelectedCategories((tags) => [...tags, tag]);
    }
  }

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
      <View style={styles.categoriesContainer}>
        {allCategories.map((tag) => (
          <FilterCategory
            key={tag}
            onPress={() => selectCategory(tag)}
            tag={tag}
            selected={selectedCategories.includes(tag)}
          />
        ))}
      </View>
    </View>
  );
}

function FilterCategory({ tag, selected, onPress }: { tag: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      key={tag}
      onPress={onPress}
      style={[styles.filterButton, { backgroundColor: selected ? "#22c55e" : "white" }]}
    >
      <Text style={{ fontSize: 14, color: selected ? "white" : "black" }}>{tag}</Text>
    </Pressable>
  );
}

function Rating({ rating }: { rating: number }) {
  return (
    <View style={styles.ratingContainer}>
      <Feather name="star" size={14} color="#eab208" />
      <Text style={styles.ratingText}>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
    marginBottom: 8,
  },
  filterButton: {
    borderRadius: 20,
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#fdf9c2",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: { color: "#eab208", marginLeft: 5, fontWeight: "bold", fontSize: 12 },
  allPlacesText: { fontWeight: "bold", fontSize: 22, paddingBottom: 10 },
  categoriesContainer: {
    flexDirection: "row",
    gap: 4,
    backgroundColor: "transparent",
    width: "100%",
    flexWrap: "wrap",
    paddingBottom: 10,
  },
});
