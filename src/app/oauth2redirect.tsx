// app/oauth2redirect.tsx
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function OAuth2Redirect() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={styles.text}>Procesando inicio de sesión... En Athena</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: "500",
    },
});
