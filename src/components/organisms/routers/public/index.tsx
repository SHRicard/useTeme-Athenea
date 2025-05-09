import { Redirect } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useUserStore } from "@/store";

interface IPublicRoute {
    children: React.ReactNode;
}

export const PublicRoute = ({ children }: IPublicRoute) => {
    const { user } = useUserStore();

    if (user) {
        return <Redirect href="/" />;
    }

    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
