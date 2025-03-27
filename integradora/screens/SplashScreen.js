import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      setTimeout(() => {
        if (isLoggedIn === "true") {
          navigation.replace("Home");
        } else {
          navigation.replace("Login");
        }
      }, 1500);
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.logo}>
        ♻️ EcoPet
      </Animatable.Text>
      <ActivityIndicator size="large" color="#33FF99" />
      <Text style={styles.loadingText}>Verificando sesión...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#B8F2E6",
    marginBottom: 20,
  },
  loadingText: {
    color: "#B8F2E6",
    marginTop: 10,
    fontSize: 16,
  },
});

export default SplashScreen;
