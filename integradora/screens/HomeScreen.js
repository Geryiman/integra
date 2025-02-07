import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Contenido Principal */}
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a TTY</Text>
      </View>

      {/* Navbar en la Parte Inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="person" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Points")}
        >
          <Icon name="star" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Puntos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Icon name="settings" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5E6472",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#5E6472",
    paddingVertical: 10,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 5,
  },
});
