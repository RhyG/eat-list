import { StyleSheet, useWindowDimensions } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Text, View } from "@/components/Themed";

import { places } from "@/constants/places";
import { PlaceAutoCompleteInput } from "@/components/PlaceAutoCompleteInput";
import { Dispatch, SetStateAction, useState } from "react";

const defaultRegion: Region = {
  latitude: -37.8136,
  longitude: 144.9631,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function TabOneScreen() {
  const [region, setRegion] = useState<Region>(defaultRegion);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        {places.map((marker, index) => (
          <Marker key={`${marker.name}-${index}`} coordinate={marker.latLng} title={marker.name} />
        ))}
        <OverlayComponent setRegion={setRegion} />
      </MapView>
    </View>
  );
}

function OverlayComponent({ setRegion }: { setRegion: Dispatch<SetStateAction<Region>> }) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 5,
        position: "absolute",
        top: 20,
        width: 300,
        left: width / 2 - 150,
      }}
    >
      <PlaceAutoCompleteInput
        placeSelected={(details) =>
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.006,
            longitudeDelta: 0.002,
          })
        }
      />
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
