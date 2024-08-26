import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const PlaceAutoCompleteInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(JSON.stringify({ data, details }));
        console.log(details?.geometry.location);
      }}
      query={{
        key: process.env.EXPO_PUBLIC_PLACES_API,
        language: "en",
      }}
      styles={{
        container: { flex: 1 },
        textInputContainer: { flex: 1 },
        textInput: { flex: 1 },
      }}
      fetchDetails
    />
  );
};
