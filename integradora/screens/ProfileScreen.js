import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Animatable from "react-native-animatable";

export default function ProfileScreen() {
  const user = {
    name: "Sofía Hernández",
    email: "Sofi@gmail.com",
    career: "Enfermería",
    points: 166, // Puntos actuales del usuario
    profileImage: "https://salud-magenes.sfo2.digitaloceanspaces.com/tty/WhatsApp%20Image%202025-02-14%20at%2010.11.38_673269f3.jpg",
  };

  // Determinar el rango según los puntos
  const getRank = () => {
    if (user.points >= 0 && user.points <= 99) return "🟢 Aprendiz del Reciclaje";
    if (user.points >= 100 && user.points <= 299) return "🔵 Recolector Novato";
    if (user.points >= 300 && user.points <= 599) return "🟣 Eco-Explorador";
    if (user.points >= 600 && user.points <= 999) return "🟠 Guardián del PET";
    if (user.points >= 1000 && user.points <= 1499) return "🟡 Reciclador Experto";
    if (user.points >= 1500 && user.points <= 2499) return "⚪ Eco-Héroe";
    if (user.points >= 2500 && user.points <= 3999) return "🟤 Embajador del Reciclaje";
    if (user.points >= 4000 && user.points <= 5999) return "🏆 Maestro del PET";
    return "🏅 Leyenda Verde";
  };

  return (
    <View style={styles.container}>
      {/* Imagen de Perfil */}
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={{ uri: user.profileImage }}
        style={styles.profileImage}
      />

      {/* Tarjeta de Perfil */}
      <Animatable.View animation="fadeInUp" duration={2000} style={styles.profileCard}>
        <Text style={styles.profileTitle}>Perfil de Usuario</Text>
        <Text style={styles.profileText}>👤 {user.name}</Text>
        <Text style={styles.profileText}>📧 {user.email}</Text>
        <Text style={styles.profileText}>🎓 {user.career}</Text>
        <Text style={styles.profileRank}>🏅 {getRank()}</Text>
        <Text style={styles.profilePoints}>⭐ {user.points} Puntos</Text>
      </Animatable.View>
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
  profileCard: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B8F2E6",
    marginBottom: 10,
  },
  profileText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  profileRank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginTop: 10,
  },
  profilePoints: {
    fontSize: 16,
    color: "#33FF99",
    marginTop: 5,
  },
});
