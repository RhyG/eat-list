import { Place } from "@/types";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Storage } from "@/modules/storage";

const PlacesContext = createContext<{
  places: { [key: string]: Place };
  updatePlace: (id: string, place: Place) => void;
}>({ places: {}, updatePlace: (id: string, place: Place) => {} });

export function PlacesProvider({ children }: React.PropsWithChildren<{}>) {
  const [places, setPlaces] = useState<{ [key: string]: Place }>({});

  useEffect(function loadPlacesFromStorage() {
    const storedPlaces = Storage.getItem<{ [key: string]: Place }>("places") || {};

    setPlaces(storedPlaces);
  }, []);

  const updatePlace = useCallback(
    function updatePlace(id: string, place: Place) {
      const updatedPlaces = { ...places, [id]: place };
      setPlaces(updatedPlaces);

      Storage.setItem("places", updatedPlaces);
    },
    [places]
  );

  const contextValue = useMemo(() => {
    return { places, updatePlace };
  }, [places, updatePlace]);

  return <PlacesContext.Provider value={contextValue}>{children}</PlacesContext.Provider>;
}

export function usePlacesContext() {
  return useContext(PlacesContext);
}
