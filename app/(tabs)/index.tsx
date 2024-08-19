import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

const markers = [
  { name: "Navala Churrascaria", latLng: { latitude: -27.4669946, longitude: 153.0310738 } },
  { name: "Vizzeto Woodfire", latLng: { latitude: -27.535453, longitude: 153.0326009 } },
  { name: "Broken Hearts Burger Club", latLng: { latitude: -27.4858021, longitude: 153.0011157 } },
  { name: "Hanwoori", latLng: { latitude: -27.472049, longitude: 153.026819 } },
  { name: "Sankalp Indian", latLng: { latitude: -27.5122047, longitude: 153.0312011 } },
  { name: "Sovereign Tavern", latLng: { latitude: -20.0771255, longitude: 146.2632904 } },
];

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {markers.map((marker, index) => (
          <Marker key={`${marker.name}-${index}`} coordinate={marker.latLng} title={marker.name} />
        ))}
      </MapView>
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
