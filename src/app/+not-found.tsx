import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NotFoundScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo Atenea */}
      <Image
        source={require("@/assets/images/LOGO_ATENEA.png")} // Usando alias @
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Mensaje principal */}
      <Text style={styles.title}>¡Ups! Página no encontrada</Text>

      {/* Mensaje secundario */}
      <Text style={styles.subtitle}>
        Lo sentimos, no pudimos encontrar lo que buscas.
      </Text>

      {/* Botón de acción */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff", // Si no tienes un tema, puedes poner un color de fondo fijo
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  title: {
    marginBottom: 16,
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    fontSize: 16,
    color: "#777", // Color más suave para el subtítulo
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#1B4B66",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
  },
});


