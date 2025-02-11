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
          uri: "https://salud-magenes.sfo2.digitaloceanspaces.com/imagenes/alarmas/12345678901_1738562077756.jpg",
        }}
        style={styles.profileImage}
      />
      <Animatable.Text animation="fadeInUp" duration={1500} style={styles.title}>
        Usuario: Sofia Hernandez
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" duration={2000} style={styles.text}>
        Correo: Sofi@gmail.com
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" duration={2500} style={styles.text}>
        Carrera: Enfermería
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: "#00FFFF",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#B8F2E6",
    marginBottom: 5,
    textAlign: "center",
  },
});
