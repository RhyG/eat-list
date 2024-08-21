import { FlatList, ListRenderItem, StyleSheet, Pressable } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

import { places } from "@/constants/places";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  const renderItem: ListRenderItem<(typeof places)[number]> = ({ item }) => {
    return (
      <Link
        style={styles.item}
        href={{
          pathname: "/places/[place]",
          params: { name: item.name, latitude: item.latLng.latitude, longitude: item.latLng.longitude },
        }}
      >
        <Text>{item.name}</Text>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={places} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
