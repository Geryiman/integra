import React, { useEffect, useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  SafeAreaView, FlatList, ActivityIndicator
} from "react-native";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ URL del backend
const API_URL = "https://ecopet-r77q7.ondigitalocean.app/api";

const HomeScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_URL}/videos`);
        setVideos(response.data);
      } catch (error) {
        console.error("❌ Error cargando videos:", error);
        setMessage("No se pudieron cargar los videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoWatched = async (id_video) => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      alert("Debes iniciar sesión para ganar puntos.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/videos/visto`, {
        id_usuario: userId,
        id_video: id_video
      });

      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Error registrando el video.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a Ecopet</Text>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity style={styles.fullTaskButton} onPress={() => navigation.navigate("Tasks")}>
          <Text style={styles.fullTaskButtonText}>📋 Ver Tareas pendientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.completedTaskButton} onPress={() => navigation.navigate("CompletedTasks")}>
          <Text style={styles.completedTaskButtonText}>✅ Ver Tareas Completadas</Text>
        </TouchableOpacity>

        <Text style={styles.subTitle}>🎥 Ver videos para obtener puntos:</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#33FF99" />
        ) : (
          videos.length === 0 ? (
            <Text style={styles.noVideos}>No hay videos disponibles.</Text>
          ) : (
            <FlatList
              data={videos}
              keyExtractor={(item) => item.id_video.toString()}
              renderItem={({ item }) => (
                <View style={styles.videoCard}>
                  <Text style={styles.videoTitle}>{item.titulo}</Text>
                  <WebView
                    style={styles.videoPlayer}
                    source={{ uri: item.url_video.replace("watch?v=", "embed/") }}
                    originWhitelist={['*']}
                    allowsFullscreenVideo={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                  />
                  <Text style={styles.videoDescription}>{item.descripcion}</Text>
                  <Text style={styles.pointsText}>🎯 {item.puntos} puntos</Text>
                  <TouchableOpacity style={styles.watchButton} onPress={() => handleVideoWatched(item.id_video)}>
                    <Text style={styles.watchButtonText}>✔️ Marcar como visto y ganar puntos</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )
        )}
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Profile")}>
          <Icon name="person" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Points")}>
          <Icon name="star" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Puntos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Scan")}>
          <Icon name="qr-code-scanner" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Escanear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Settings")}>
          <Icon name="settings" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000000" },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 20 },
  subTitle: { fontSize: 18, color: "#B8F2E6", marginBottom: 10, fontWeight: "bold" },
  noVideos: { color: "#B8F2E6", textAlign: "center", fontSize: 16, marginVertical: 20 },

  videoCard: {
    backgroundColor: "#5E6472",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    alignItems: "center"
  },
  videoTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  videoDescription: { color: "#B8F2E6", textAlign: "center", fontSize: 12, marginVertical: 5 },
  videoPlayer: { width: "90%", height: 150, borderRadius: 10 },
  pointsText: {
    backgroundColor: "#B8F2E6",
    color: "#000000",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5
  },
  watchButton: {
    backgroundColor: "#33FF99",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 10
  },
  watchButtonText: { color: "#000000", fontSize: 12, fontWeight: "bold" },

  fullTaskButton: {
    backgroundColor: "#33FF99",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10
  },
  fullTaskButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },

  completedTaskButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20
  },
  completedTaskButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333333",
    paddingVertical: 12
  },
  navButton: { alignItems: "center", justifyContent: "center" },
  navText: { fontSize: 12, color: "#FFFFFF", marginTop: 5 }
});

export default HomeScreen;
