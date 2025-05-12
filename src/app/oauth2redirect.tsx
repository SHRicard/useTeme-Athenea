import { View, Text, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { processGoogleToken } from "../services";
import { useUserStore } from "../store";
import { APP_ROUTES } from "../navigation";



const { ANDROID_ID, REDIRECT_URI_ANDROID } = Constants.expoConfig?.extra ?? {};
const ASYNC_STORAGE_CODE_VERIFIER_KEY = 'googleAuthCodeVerifier';
const googleDiscoveryDocument = AuthSession.fetchDiscoveryAsync('https://accounts.google.com');

export default function OAuth2RedirectScreen() {
    const { setUser, hydrate } = useUserStore();
    const router = useRouter();
    const urlParams = useLocalSearchParams<{ code?: string; state?: string; error?: string; error_description?: string }>();
    const hasProcessed = useRef(false);
    const [statusMessage, setStatusMessage] = useState("Procesando inicio de sesión...");


    useEffect(() => {
        hydrate();
    }, [])

    useEffect(() => {
        if (hasProcessed.current) {
            return;
        }
        hasProcessed.current = true;
        const { code: authCodeFromUrl, error: errorFromUrl, error_description: errorDescriptionFromUrl } = urlParams;

        if (errorFromUrl) {
            Alert.alert("Error de Autenticación", `Google reportó un error: ${errorDescriptionFromUrl || errorFromUrl}. Por favor, intenta de nuevo.`);
            router.replace(APP_ROUTES.PUBLIC.LOGIN);
            return;
        }

        if (!authCodeFromUrl) {
            Alert.alert("Error de Autenticación", "No se recibió el código de autorización de Google. Por favor, intenta de nuevo.");
            router.replace(APP_ROUTES.PUBLIC.LOGIN);
            return;
        }

        const performFullAuthentication = async () => {
            let codeVerifier: string | null = null;
            try {
                setStatusMessage("Verificando con Google...");
                codeVerifier = await AsyncStorage.getItem(ASYNC_STORAGE_CODE_VERIFIER_KEY);
                if (!codeVerifier) throw new Error("Verificador de código (codeVerifier) no encontrado.");
                await AsyncStorage.removeItem(ASYNC_STORAGE_CODE_VERIFIER_KEY);

                const discoveryDoc = await googleDiscoveryDocument;
                if (!discoveryDoc) throw new Error("No se pudo cargar el discovery document de Google.");
                if (!ANDROID_ID) throw new Error("ANDROID_ID no está configurado.");

                const exchangeConfig: AuthSession.AccessTokenRequestConfig = {
                    clientId: ANDROID_ID,
                    code: authCodeFromUrl,
                    redirectUri: AuthSession.makeRedirectUri({ native: REDIRECT_URI_ANDROID }),
                    extraParams: { code_verifier: codeVerifier },
                };
                const tokenResponse = await AuthSession.exchangeCodeAsync(exchangeConfig, discoveryDoc);
                const { accessToken: googleAccessToken } = tokenResponse;
                if (!googleAccessToken) throw new Error("Token de acceso de Google no encontrado.");
                setStatusMessage("Validando con nuestro servidor...");
                const backendResponse = await processGoogleToken(googleAccessToken);
                if (!backendResponse || !backendResponse.isAuthenticated || !backendResponse.user) {
                    throw new Error("No se pudo verificar el usuario con el backend o la autenticación falló.");
                }
                const { user: userData } = backendResponse;
                const storeUser = {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    lastName: userData.surname,
                    nationality: userData.nationality || "Mexicana",
                    gender: userData.gender || "Masculino",
                    phone: userData.phone || "+52 123 456 7890",
                    avatar: userData.avatar,
                    role: userData.role
                };
                setUser(storeUser);
                const href = APP_ROUTES.PRIVATE.DASHBOARD[userData.role as keyof typeof APP_ROUTES.PRIVATE.DASHBOARD];
                router.push(href);

            } catch (error: any) {
                let detailedMessage = "No se pudo completar el inicio de sesión.";
                if (error.message) detailedMessage += ` Detalles: ${error.message}`;
                const errorData = error.response?.data;
                if (errorData) {
                    if (errorData.message) detailedMessage += ` Backend: ${errorData.message}`;
                    else if (typeof errorData === 'string') detailedMessage += ` Backend: ${errorData}`;
                }
                Alert.alert("Error de Autenticación", detailedMessage);
                router.replace(APP_ROUTES.PUBLIC.LOGIN);
            }
        };

        performFullAuthentication();

    }, [urlParams, router]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.text}>{statusMessage}</Text>
            <Text style={styles.subtext}>Serás redirigido en breve.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: '#f5f5f5' },
    text: { marginTop: 20, fontSize: 18, fontWeight: "600", color: '#333', textAlign: 'center' },
    subtext: { marginTop: 8, fontSize: 14, color: '#555', textAlign: 'center' },
});
