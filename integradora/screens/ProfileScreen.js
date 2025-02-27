import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator 
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.27:3000"; // Cambia esto según tu backend

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false); // Estado para forzar actualización

  useEffect(() => {
    fetchUserData();
  }, [refresh]); // Se ejecuta cuando cambia `refresh`

  // ✅ Obtener los datos del usuario desde el backend
  const fetchUserData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/usuarios/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error al obtener usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Función para seleccionar y subir una nueva imagen de perfil
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  // ✅ Enviar imagen al backend
  const uploadImage = async (imageUri) => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) return;

    let formData = new FormData();
    formData.append("profileImage", {
      uri: imageUri,
      name: `profile_${userId}.jpg`,
      type: "image/jpeg",
    });

    try {
      const response = await fetch(`${API_URL}/usuarios/${userId}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      if (data.profileImage) {
        setUser((prevUser) => ({
          ...prevUser,
          profileImage: `${API_URL}/${data.profileImage}`,
        }));
        setRefresh((prev) => !prev); // ✅ Forzar actualización de la pantalla
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };

  // ✅ Determinar el rango según los puntos
  const getRank = () => {
    if (!user) return "";
    if (user.puntos_totales >= 0 && user.puntos_totales <= 99) return "🟢 Aprendiz del Reciclaje";
    if (user.puntos_totales >= 100 && user.puntos_totales <= 299) return "🔵 Recolector Novato";
    if (user.puntos_totales >= 300 && user.puntos_totales <= 599) return "🟣 Eco-Explorador";
    if (user.puntos_totales >= 600 && user.puntos_totales <= 999) return "🟠 Guardián del PET";
    if (user.puntos_totales >= 1000 && user.puntos_totales <= 1499) return "🟡 Reciclador Experto";
    if (user.puntos_totales >= 1500 && user.puntos_totales <= 2499) return "⚪ Eco-Héroe";
    if (user.puntos_totales >= 2500 && user.puntos_totales <= 3999) return "🟤 Embajador del Reciclaje";
    if (user.puntos_totales >= 4000 && user.puntos_totales <= 5999) return "🏆 Maestro del PET";
    return "🏅 Leyenda Verde";
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#33FF99" />
      ) : user ? (
        <>
          {/* Imagen de Perfil */}
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={{
              uri: user.profileImage || "https://via.placeholder.com/150",
            }}
            style={styles.profileImage}
          />

          {/* Botón para cambiar imagen */}
          <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
            <Text style={styles.changeImageText}>
              {user.profileImage ? "Editar Foto" : "Subir Foto"}
            </Text>
          </TouchableOpacity>

          {/* Tarjeta de Perfil */}
          <Animatable.View animation="fadeInUp" duration={2000} style={styles.profileCard}>
            <Text style={styles.profileTitle}>Perfil de Usuario</Text>
            <Text style={styles.profileText}>👤 {user.nombre}</Text>
            <Text style={styles.profileText}>📧 {user.email}</Text>
            <Text style={styles.profileRank}>🏅 {getRank()}</Text>
            <Text style={styles.profilePoints}>⭐ {user.puntos_totales} Puntos</Text>
          </Animatable.View>
        </>
      ) : (
        <Text style={styles.errorText}>No se pudo cargar la información del usuario.</Text>
      )}
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
    marginBottom: 10,
  },
  changeImageButton: {
    backgroundColor: "#33FF99",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  changeImageText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
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
  errorText: {
    color: "#FF3333",
    fontSize: 16,
    textAlign: "center",
  },
});

