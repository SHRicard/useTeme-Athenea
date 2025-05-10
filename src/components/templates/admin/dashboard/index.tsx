import { View, Text, StyleSheet } from 'react-native';

export const DashboardAdmin = () => {
    return (
        <View style={styles.container}>
            <Text>TempleDashboardAdmin</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
