import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, } from 'react-native';
import { Link } from 'expo-router';

export const TempleLanding = () => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>¡Bienvenido a Atenea!</Text>
                <Link href="/signin" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/signup" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Crear cuenta</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/forms/userUpForm" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Formulario de usuario</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        marginBottom: 20,
    },

    button: {
        backgroundColor: '#FF5252',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
