// app/(public)/index.tsx
import { Text, View } from "react-native";

export default function PublicHome() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Bienvenido a la página pública</Text>
        </View>
    );
}
