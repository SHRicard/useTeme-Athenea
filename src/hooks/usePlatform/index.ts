import { Platform } from "react-native";

export const usePlatform = (): boolean => {
    return Platform.OS === "web";
};
