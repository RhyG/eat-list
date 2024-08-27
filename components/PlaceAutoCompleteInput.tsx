import React from "react";
import { GooglePlaceDetail, GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const PlaceAutoCompleteInput = ({ placeSelected }: { placeSelected: (detail: GooglePlaceDetail) => void }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(_, details = null) => {
        if (!details) return;

        placeSelected(details);
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
