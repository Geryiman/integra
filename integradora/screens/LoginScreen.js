import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "https://ecopet-r77q7.ondigitalocean.app/api/usuarios/login";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      const storedUserId = await AsyncStorage.getItem("userId");

      if (isLoggedIn === "true" && storedUserId) {
        navigation.replace("Home");
      }
    };

    checkLoginStatus();
  }, []);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    if (!email || !password) {
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

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.error || "Error al iniciar sesión.");
        return;
      }

      // Guardar sesión
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userId", data.usuario.id_usuario.toString());

      setSuccessMessage(`Bienvenido ${data.usuario.nombre}`);
      setLoading(false);

      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }, 500);
    } catch (error) {
      setLoading(false);
      console.error("Error de conexión:", error);
      setError("Error de conexión con el servidor. Verifica tu red.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="#333333"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Contraseña"
            placeholderTextColor="#333333"
            secureTextEntry={hidePassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#333"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#33FF99" />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000000" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center"
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
    color: "#000000"
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  loginButton: {
    backgroundColor: "#33FF99",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold"
  },
  registerText: {
    color: "#33FF99",
    marginTop: 10,
    fontSize: 14
  },
  errorText: {
    color: "#FF3333",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center"
  },
  successText: {
    color: "#33FF99",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold"
  }
});
