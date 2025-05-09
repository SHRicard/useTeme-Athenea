import 'dotenv/config';
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "useTeam-Athenea",
    slug: "useteam-athenea",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    scheme: "athenea",
    newArchEnabled: true,
    splash: {
        image: "./assets/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.useteam.athenea"
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/adaptive-icon.png",
            backgroundColor: "#ffffff"
        },
        edgeToEdgeEnabled: true,
        package: "com.useteam.athenea"
    },
    web: {
        favicon: "./assets/favicon.png"
    },
    plugins: ["expo-router"],
    extra: {
        ANDROID_ID: process.env.EXPO_PUBLIC_ANDROID_ID,
        WEB_ID: process.env.EXPO_PUBLIC_WEB_ID,
        REDIRECT_URI: process.env.EXPO_PUBLIC_REDIRECT_URI,
        API_URL_BACK: process.env.EXPO_PUBLIC_API_URL_BACK,
        DESARROLLAR_ANDROID: process.env.EXPO_PUBLIC_DESARROLLAR_ANDROID,
        PROJECT_ID: process.env.PROJECT_ID,
        eas: {
            projectId: "d0145a5a-2764-462f-a46b-d9cff4ddb5f8"
        },
    },
    owner: "sonwokong"
});
