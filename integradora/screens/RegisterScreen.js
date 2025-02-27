import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importamos AsyncStorage

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 📌 Función para validar email
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    // ✅ Validaciones
    if (!nombre || !apellido || !email || !password) {
      setLoading(false);
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!isValidEmail(email)) {
      setLoading(false);
      setError("Ingrese un correo electrónico válido.");
      return;
    }

    if (password.length < 6) {
      setLoading(false);
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // ✅ Concatenar nombre y apellido en un solo campo
    const nombreCompleto = `${nombre.trim()} ${apellido.trim()}`;

    try {
      const response = await fetch("http://192.168.1.27:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nombreCompleto, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.error || "Error al registrar usuario.");
        return;
      }

      // ✅ Guardar toda la información del usuario en AsyncStorage
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userName", nombreCompleto);
      await AsyncStorage.setItem("userId", data.id.toString()); // Guardar el ID del usuario

      setSuccessMessage("Registro exitoso. Redirigiendo...");
      setLoading(false);

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }, 1500);
    } catch (error) {
      setLoading(false);
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        {/* ✅ Input para Nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#333333"
          value={nombre}
          onChangeText={setNombre}
        />

        {/* ✅ Input para Apellido */}
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#333333"
          value={apellido}
          onChangeText={setApellido}
        />

        {/* ✅ Input para Email */}
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#333333"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* ✅ Input para Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña (mínimo 6 caracteres)"
          placeholderTextColor="#333333"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#33FF99" />
          ) : (
            <>
              <TouchableOpacity style={styles.acceptButton} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 📌 **Estilos**
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flexGrow: 1,
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
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#333333",
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#33FF99",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#990033",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF3333",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  successText: {
    color: "#33FF99",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
