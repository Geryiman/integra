import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const checkLoginStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigation.replace("Home"); // Si está autenticado, lo lleva a Home
    } else {
      navigation.replace("Login"); // Si no, lo envía a Login
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#33FF99" />
      <Text>Verificando sesión...</Text>
    </View>
  );
};

export default SplashScreen;
