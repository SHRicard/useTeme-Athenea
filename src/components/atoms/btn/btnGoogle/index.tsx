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
import { useAppTheme, usePlatform } from "@/hooks";

const {
    ANDROID_ID,
    WEB_ID,
    REDIRECT_URI_WEB,
    REDIRECT_URI_ANDROID
} = Constants.expoConfig?.extra ?? {};

WebBrowser.maybeCompleteAuthSession();


export const BtnGoogle = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
    const platform = usePlatform();
    const IS_PLATFORM = platform ? REDIRECT_URI_WEB : REDIRECT_URI_ANDROID

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_ID,
        webClientId: WEB_ID,
        redirectUri: IS_PLATFORM,
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






// import {
//     TouchableOpacity,
//     Text,
//     Image,
//     StyleSheet,
//     View,
// } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import { useEffect } from "react";
// import * as WebBrowser from 'expo-web-browser';
// import Constants from 'expo-constants';
// import { useAppTheme, usePlatform } from "@/hooks";

// const {
//     ANDROID_ID,
//     WEB_ID,
//     REDIRECT_URI_WEB,
//     REDIRECT_URI_ANDROID
// } = Constants.expoConfig?.extra ?? {};

// WebBrowser.maybeCompleteAuthSession();


// export const BtnGoogle = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
//     const platform = usePlatform();
//     const IS_PLATFORM = platform ? REDIRECT_URI_WEB : REDIRECT_URI_ANDROID

//     const [request, response, promptAsync] = Google.useAuthRequest({
//         androidClientId: ANDROID_ID,
//         webClientId: WEB_ID,
//         redirectUri: IS_PLATFORM,
//         scopes: ['profile', 'email'],

//     });
//     const theme = useAppTheme()

//     const google = require("@/assets/images/google.png");

//     useEffect(() => {
//         if (response?.type === "success") {
//             console.log("useEffect se ejecutó. Response:", response);
//             const token = response.authentication?.accessToken;
//             if (token) {
//                 console.log("Token recibido:", token);
//                 onSuccess(token);
//             } else {
//                 console.error("Token no disponible");
//             }
//         }
//     }, [response]);


//     if (response?.type === "success" && response.params?.code) {
//         const authCode = response.params.code;

//         console.log("Código de autorización:", authCode);

//         // Llama a tu backend con ese código
//         fetch(`${process.env.EXPO_PUBLIC_API_URL_BACK}/auth/google`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ code: authCode }),
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log("Respuesta del backend:", data);
//                 // Maneja aquí el login exitoso (guardar token, redirigir, etc.)
//             })
//             .catch(err => {
//                 console.error("Error al hacer login con el backend:", err);
//             });
//     }


//     return (
//         <TouchableOpacity
//             style={[styles.button, { backgroundColor: theme.colors.textOnPrimary, borderColor: theme.colors.backgroundColorPrimary }]}
//             disabled={!request}
//             onPress={() => {
//                 promptAsync()
//                     .then((res) => {
//                         console.log("Flujo iniciado");
//                         console.log("Respuesta completa de promptAsync:", res);
//                     })
//                     .catch((e) => {
//                         console.error("Error en el login", e);
//                     });
//             }}
//         >
//             <View style={styles.buttonContent}>
//                 <Image source={google} style={styles.logo} />
//                 <Text style={[styles.text, { color: theme.colors.text }]}>Iniciar sesión con Google</Text>
//             </View>
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     button: {
//         flexDirection: "row",
//         borderWidth: 1,
//         paddingVertical: 12,
//         paddingHorizontal: 16,
//         borderRadius: 8,
//         alignItems: "center",
//         justifyContent: "center",

//     },
//     buttonContent: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     logo: {
//         width: 40,
//         height: 40,
//         marginRight: 12,
//     },
//     text: {
//         fontSize: 16,
//         fontWeight: "600",
//     },
// });
