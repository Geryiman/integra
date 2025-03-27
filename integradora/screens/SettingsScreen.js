import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Cerrar sesión y limpiar almacenamiento
  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove([
        "isLoggedIn",
        "userEmail",
        "userId",
        "userName",
      ]);

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInUp" duration={1500} style={styles.title}>
        Ajustes
      </Animatable.Text>

      {/* 🔔 Notificaciones */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Notificaciones</Text>
        <Switch
          value={notifications}
          onValueChange={(value) => {
            setNotifications(value);
            // Aquí podrías guardar en AsyncStorage o activar notificaciones reales
          }}
          trackColor={{ false: "#777777", true: "#33FF99" }}
          thumbColor={notifications ? "#00FFFF" : "#990033"}
        />
      </View>

      {/* 🌙 Modo oscuro */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Modo Oscuro</Text>
        <Switch
          value={darkMode}
          onValueChange={(value) => {
            setDarkMode(value);
            // Aquí podrías guardar en AsyncStorage y aplicar el tema globalmente
          }}
          trackColor={{ false: "#777777", true: "#333333" }}
          thumbColor={darkMode ? "#FFFFFF" : "#990033"}
        />
      </View>

      {/* 🔓 Cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center",
  },
  option: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  logoutButton: {
    backgroundColor: "#990033",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
