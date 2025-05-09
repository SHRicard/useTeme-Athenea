import {
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    View,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { useAppTheme } from "@/hooks";

const {
    ANDROID_ID,
    WEB_ID,
    REDIRECT_URI
} = Constants.expoConfig?.extra ?? {};

WebBrowser.maybeCompleteAuthSession();

export const BtnGoogle = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_ID,
        webClientId: WEB_ID,
        redirectUri: REDIRECT_URI,
        scopes: ['profile', 'email'],
    });
    const theme = useAppTheme()

    const google = require("@/assets/images/google.png");

    useEffect(() => {
        if (response?.type === "success") {
            const token = response.authentication?.accessToken;
            if (token) {
                onSuccess(token);
            } else {
                console.error("Token no disponible");
            }
        }
    }, [response]);

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.textOnPrimary, borderColor: theme.colors.backgroundColorPrimary }]}
            disabled={!request}
            onPress={() => {
                promptAsync()
                    .then(() => console.log("Flujo iniciado"))
                    .catch((e) => console.error("Error en el login", e));
            }}
        >
            <View style={styles.buttonContent}>
                <Image source={google} style={styles.logo} />
                <Text style={[styles.text, { color: theme.colors.text }]}>Iniciar sesión con Google</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",

    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
});
