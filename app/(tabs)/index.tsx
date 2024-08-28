import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import MapView, { Callout, Marker, Region } from "react-native-maps";
import Feather from "@expo/vector-icons/Feather";

import { Text, View } from "@/components/Themed";
import { places } from "@/constants/places";
import { PlaceAutoCompleteInput } from "@/components/PlaceAutoCompleteInput";
import { Place } from "@/types";

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
      <MapView style={styles.map} region={region} initialRegion={defaultRegion}>
        <>
          {places.map((marker, index) => (
            <CustomMarker
              name={marker.name}
              address={marker.address}
              latLng={marker.latLng}
              key={`${marker.name}-${marker.latLng.latitude}`}
              visited={marker.visited}
            />
          ))}
          <CustomMarker latLng={region} name={region.name} address={region.description} visited={false} />
        </>
        <OverlayComponent setRegion={setRegion} />
      </MapView>
    </View>
  );
}

function CustomMarker({ name, latLng, address, visited }: Pick<Place, "name" | "latLng" | "address" | "visited">) {
  return (
    <Marker coordinate={latLng} title={name}>
      <Callout>
        <View style={{ flexDirection: "row", padding: 5, alignItems: "center", gap: 5 }}>
          <View style={{ gap: 5 }}>
            <Text style={{ fontWeight: "bold" }}>{name}</Text>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <Feather name="map-pin" size={14} color="#626268" />
              <Text>{address}</Text>
            </View>
          </View>
          <View>{visited ? <Feather name="check-circle" size={14} color="#22c55e" /> : null}</View>
        </View>
      </Callout>
    </Marker>
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
