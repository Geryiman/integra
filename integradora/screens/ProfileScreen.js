import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Animatable from "react-native-animatable";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={{
          uri: "https://salud-magenes.sfo2.digitaloceanspaces.com/usuario/06160335342/perfil.jpg", // Imagen temporal de perfil
        }}
        style={styles.profileImage}
      />
      <Animatable.Text animation="fadeInUp" duration={1500} style={styles.title}>
        Usuario: Sofia hernandez
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" duration={2000} style={styles.text}>
        Correo: Sofi@gmail.com
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" duration={2500} style={styles.text}>
        Carrera: Enfermeria
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#AED9E0",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5E6472",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#5E6472",
    marginBottom: 5,
  },
});
