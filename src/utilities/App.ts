import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } =
  Dimensions.get("window");

export const saveToStorage = (key: string, value: string) => {
  AsyncStorage.setItem(key, value);
};

export const getValueFromStorage = (key: string) => AsyncStorage.getItem(key);
