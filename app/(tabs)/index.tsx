import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Text, View } from "@/components/Themed";

import { places } from "@/constants/places";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {places.map((marker, index) => (
          <Marker key={`${marker.name}-${index}`} coordinate={marker.latLng} title={marker.name} />
        ))}
        <OverlayComponent />
      </MapView>
    </View>
  );
}

function OverlayComponent() {
  return (
    <View style={{ backgroundColor: "white", padding: 10, borderRadius: 5, position: "absolute", bottom: 50 }}>
      <View>
        <Text style={{ fontWeight: "bold" }}>Overlay Component</Text>
        <Text>This is an overlay component.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
