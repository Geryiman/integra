import React from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importamos AsyncStorage

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  // ✅ Función para cerrar sesión correctamente
  const handleLogout = async () => {
    try {
      // ✅ Eliminar los datos de sesión
      await AsyncStorage.removeItem("isLoggedIn");
      await AsyncStorage.removeItem("userEmail");

      // ✅ Redirigir a la pantalla de Login
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInUp" duration={1500} style={styles.title}>
        Ajustes
      </Animatable.Text>

      <View style={styles.option}>
        <Text style={styles.optionText}>Notificaciones</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: "#777777", true: "#33FF99" }}
          thumbColor={notifications ? "#00FFFF" : "#990033"}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Modo Oscuro</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#777777", true: "#333333" }}
          thumbColor={darkMode ? "#FFFFFF" : "#990033"}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// 📌 **Estilos**
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
    marginBottom: 20,
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
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

