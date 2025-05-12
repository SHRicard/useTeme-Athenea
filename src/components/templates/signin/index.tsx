import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Image, } from 'react-native';
import { useUserStore } from '@/store';
import { BtnGoogle, Loading, Label } from '../../atoms';
import { useAppTheme } from '@/hooks';
import { processGoogleToken } from '@/services';
import { Redirect } from 'expo-router';
import { APP_ROUTES } from '../../../navigation';
import { useRouter } from 'expo-router'; // o 'next/router'


export const TempleSignin = () => {
    const { setUser, hydrate } = useUserStore();
    const [loading, setLoading] = useState(false);
    const theme = useAppTheme();
    const router = useRouter();

    useEffect(() => {
        hydrate();
    }, [])

    const handleGoogleAuth = async (token: string) => {

        try {
            setLoading(true);
            const { user: userData } = await processGoogleToken(token);

            const storeUser = {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                lastName: userData.surname,
                nationality: "Mexicana",
                gender: "Masculino",
                phone: "+52 123 456 7890",
                avatar: userData.avatar,
                role: userData.role
            };
            setUser(storeUser);

            const href = APP_ROUTES.PRIVATE.DASHBOARD[userData.role as keyof typeof APP_ROUTES.PRIVATE.DASHBOARD];
            router.push(href);

        } catch (error) {
            console.error("Error al procesar token de Google:", error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <ScrollView
            contentContainerStyle={[
                styles.scrollContainer,
                { backgroundColor: theme.colors.backgroundColorPrimary },
            ]}
            keyboardShouldPersistTaps="handled"
        >
            <View style={[styles.card, { backgroundColor: "#1B4B66" }]}>
                <Image
                    source={require('../../../assets/images/LOGO_ATENEA.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.textContainer}>
                    <Label
                        text="Bienvenido a Atenea"
                        type="primary"
                        size={24}
                        color={theme.colors.textOnPrimary}
                        style={styles.title}
                    />

                    <Label
                        text="Tu acceso comienza con Google. Así de simple."
                        size={16}
                        color={theme.colors.textOnPrimary}
                        style={styles.subtitle}
                    />
                    <View style={styles.featureContainer}>
                        <Label
                            text="✓ En Atenea mejoramos tu experiencia"
                            size={14}
                            color={theme.colors.textOnPrimary}
                            style={styles.featureText}
                        />
                        <Label
                            text="✓ Olvídate de recordar contraseñas"
                            size={14}
                            color={theme.colors.textOnPrimary}
                            style={styles.featureText}
                        />
                        <Label
                            text="✓ Nos enfocamos en hacer tu viaje más fácil"
                            size={14}
                            color={theme.colors.textOnPrimary}
                            style={styles.featureText}
                        />
                        <Label
                            text="✓ Acceso seguro con tu cuenta existente"
                            size={14}
                            color={theme.colors.textOnPrimary}
                            style={styles.featureText}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {loading ? <Loading /> : <BtnGoogle onWebSuccess={handleGoogleAuth} />}
                </View>
                <Label
                    text="Al continuar aceptas nuestros Términos y Política de Privacidad"
                    size={12}
                    color={theme.colors.textOnPrimary}
                    style={styles.footerText}
                />
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 16,
    },
    card: {
        width: '100%',
        maxWidth: 500,
        minWidth: 350,
        alignSelf: 'center',
        borderRadius: 8,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logo: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        marginBottom: 25,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    title: {
        fontWeight: '700',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
        opacity: 0.9,
    },
    featureContainer: {
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: 10,
    },
    featureText: {
        fontWeight: '400',
        marginBottom: 8,
        lineHeight: 20,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 20,
    },
    footerText: {
        textAlign: 'center',
        marginTop: 15,
        opacity: 0.7,
    },
});


