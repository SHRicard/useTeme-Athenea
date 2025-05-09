import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';



export const TempleSignup = () => {

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={{ marginBottom: 16 }}>Crear Cuenta</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        gap: 8,
    },
    input: {
        marginBottom: 8,
    },
    error: {
        color: 'red',
        marginBottom: 4,
        marginLeft: 4,
    },
});
