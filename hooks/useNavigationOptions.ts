import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export function useNavigationOptions(options: Partial<{}>) {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions(options);
  });
}
