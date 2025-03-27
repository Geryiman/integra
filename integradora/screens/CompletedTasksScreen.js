import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://ecopet-r77q7.ondigitalocean.app/api";

export default function CompletedTasksScreen({ navigation }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          setError("No se encontró el ID del usuario.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_BASE_URL}/tareas/tareas/completadas/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener las tareas completadas.");
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Respuesta inesperada del servidor.");
        }

        setCompletedTasks(data);
      } catch (err) {
        console.error("❌ Error:", err.message);
        setError("No se pudieron cargar las tareas completadas.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTasks();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.taskCard,
        item.tipo === "Especial" && styles.specialTaskCard,
      ]}
    >
      <Text style={styles.taskText}>{item.descripcion || "Tarea sin descripción"}</Text>
      <Text style={styles.pointsText}>+{item.puntos || 0} pts</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Tareas Completadas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#B8F2E6" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : completedTasks.length === 0 ? (
        <Text style={styles.noTasksText}>🎯 Aún no has completado ninguna tarea.</Text>
      ) : (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id_tarea?.toString() || Math.random().toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: { color: "#FF4444", textAlign: "center", fontSize: 16, marginTop: 10 },
  noTasksText: {
    color: "#B8F2E6",
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  taskCard: {
    backgroundColor: "#5E6472",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  specialTaskCard: {
    backgroundColor: "#A10041",
  },
  taskText: { color: "#FFFFFF", fontSize: 16, flex: 1 },
  pointsText: {
    backgroundColor: "#B8F2E6",
    color: "#000000",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 14,
  },
  backButton: {
    backgroundColor: "#33FF99",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
});
