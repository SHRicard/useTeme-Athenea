import { View, Text, StyleSheet } from 'react-native';
import React from 'react'

export const TempleNotificationsUser = () => {

    return (
        <View style={styles.container}>
            <Text>Notifications</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
