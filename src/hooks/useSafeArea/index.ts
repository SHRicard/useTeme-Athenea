import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export const useSafeArea = () => {
    const insets = useSafeAreaInsets();

    const safeArea = StyleSheet.create({
        horizontal: {
            paddingRight: insets.right,
            paddingLeft: insets.left,
        },
        vertical: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        },
        all: {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        },
    });

    return safeArea;
};
