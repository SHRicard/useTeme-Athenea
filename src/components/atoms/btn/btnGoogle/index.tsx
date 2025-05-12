import {
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    View,
    Alert,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from 'expo-auth-session';
import { useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { useAppTheme, usePlatform } from "@/hooks";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {
    ANDROID_ID,
    WEB_ID,
    REDIRECT_URI_WEB,
    REDIRECT_URI_ANDROID
} = Constants.expoConfig?.extra ?? {};

const ASYNC_STORAGE_CODE_VERIFIER_KEY = 'googleAuthCodeVerifier';

WebBrowser.maybeCompleteAuthSession();

export const BtnGoogle = ({
    onWebSuccess,
}: {
    onWebSuccess?: (token: string) => void;
}) => {
    const isWebPlatform = usePlatform();
    const theme = useAppTheme();
    const googleImage = require("@/assets/images/google.png");
    const redirectUriForAuthHook = isWebPlatform
        ? REDIRECT_URI_WEB
        : AuthSession.makeRedirectUri({ native: REDIRECT_URI_ANDROID });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_ID,
        webClientId: WEB_ID,
        redirectUri: redirectUriForAuthHook,
        scopes: ['openid', 'profile', 'email'],
    });

    useEffect(() => {
        if (!isWebPlatform && request?.codeVerifier) {
            AsyncStorage.setItem(ASYNC_STORAGE_CODE_VERIFIER_KEY, request.codeVerifier)
                .catch(err => console.error("BtnGoogle: Error al guardar codeVerifier en AsyncStorage", err));
        }
    }, [request, isWebPlatform]);

    useEffect(() => {
        if (isWebPlatform) {
            if (response?.type === "success") {
                const token = response.authentication?.accessToken;
                if (token) {
                    if (onWebSuccess) {
                        onWebSuccess(token);
                    }
                }
            } else if (response?.type === "error") {
                Alert.alert("Error de Autenticación Web", response.error?.message || "Ocurrió un error desconocido durante el inicio de sesión con Google.");
            }
        }
    }, [response, isWebPlatform, onWebSuccess, router]);

    const handleLoginPress = async () => {
        if (!request) {
            Alert.alert("Error de Configuración", "La autenticación no está lista. Por favor, intenta de nuevo en unos momentos.");
            return;
        }
        try {
            await promptAsync();
        } catch (error: any) {
            Alert.alert("Error de Autenticación", `No se pudo iniciar el proceso de autenticación: ${error.message}`);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.textOnPrimary, borderColor: theme.colors.backgroundColorPrimary }]}
            disabled={!request} // Deshabilitar si la configuración de la solicitud no está lista
            onPress={handleLoginPress}
        >
            <View style={styles.buttonContent}>
                <Image source={googleImage} style={styles.logo} />
                <Text style={[styles.text, { color: theme.colors.text }]}>Iniciar sesión con Google</Text>
            </View>
            {!request && <Text style={{ color: 'gray', fontSize: 10, marginTop: 4 }}>Configurando autenticación...</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: { flexDirection: "row", borderWidth: 1, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: "center", justifyContent: "center" },
    buttonContent: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    logo: { width: 40, height: 40, marginRight: 12 },
    text: { fontSize: 16, fontWeight: "600" },
});
