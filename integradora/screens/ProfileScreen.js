import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ URL del backend en producción
const API_URL = "https://ecopet-r77q7.ondigitalocean.app/api";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        Alert.alert("Error", "No se encontró el usuario.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/usuarios/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la información del usuario.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso requerido", "Se necesita acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;

      const fileName = uri.split("/").pop() || `profile_${Date.now()}.jpg`;
      const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";

      const formData = new FormData();
      formData.append("profileImage", {
        uri,
        name: fileName,
        type: fileType,
      });

      setUploading(true);

      const response = await fetch(`${API_URL}/usuarios/${userId}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json", // No incluir Content-Type
        },
      });

      const data = await response.json();

      if (data.profileImage) {
        Alert.alert("Imagen actualizada", "La foto de perfil se actualizó con éxito.");
        fetchUserData(); // Recargar perfil
      } else {
        Alert.alert("Error", "No se recibió la URL de la imagen.");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const getRank = () => {
    if (!user) return "";
    const p = user.puntos_totales;
    if (p <= 99) return "🟢 Aprendiz del Reciclaje";
    if (p <= 299) return "🔵 Recolector Novato";
    if (p <= 599) return "🟣 Eco-Explorador";
    if (p <= 999) return "🟠 Guardián del PET";
    if (p <= 1499) return "🟡 Reciclador Experto";
    if (p <= 2499) return "⚪ Eco-Héroe";
    if (p <= 3999) return "🟤 Embajador del Reciclaje";
    if (p <= 5999) return "🏆 Maestro del PET";
    return "🏅 Leyenda Verde";
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#33FF99" />
      ) : user ? (
        <>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={{
              uri: user.profileImage || "https://via.placeholder.com/150",
            }}
            style={styles.profileImage}
          />

          <TouchableOpacity style={styles.changeImageButton} onPress={pickImage}>
            <Text style={styles.changeImageText}>
              {user.profileImage ? "Editar Foto" : "Subir Foto"}
            </Text>
          </TouchableOpacity>

          {uploading && <ActivityIndicator size="small" color="#33FF99" />}

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
    marginBottom: 10,
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
