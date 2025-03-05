import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.1.27:3000";

const ScanScreen = () => {
  const [codigo, setCodigo] = useState("");

  const handleScan = () => {
    if (!codigo) {
      Alert.alert("Error", "Por favor ingresa un código QR.");
      return;
    }

    axios.post(`${API_URL}/api/qr/canjear`, { codigo, id_usuario: 1 })
      .then(response => {
        Alert.alert("✅ Éxito", response.data.message);
        setCodigo(""); // Limpia el input
      })
      .catch(error => {
        Alert.alert("❌ Error", error.response?.data?.message || "Error al canjear el código.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresar Código QR</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe el código QR aquí..."
        placeholderTextColor="#888"
        value={codigo}
        onChangeText={setCodigo}
      />
      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Text style={styles.scanButtonText}>📤 Canjear Código</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Estilos
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  title: { fontSize: 22, color: "#B8F2E6", marginBottom: 20, fontWeight: "bold" },
  input: { width: "80%", backgroundColor: "#FFF", padding: 10, borderRadius: 8, fontSize: 16, marginBottom: 20, color: "#000" },
  scanButton: { backgroundColor: "#33FF99", padding: 12, borderRadius: 8 },
  scanButtonText: { color: "#000", fontSize: 16, fontWeight: "bold" }
});

export default ScanScreen;
