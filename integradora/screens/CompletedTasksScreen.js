import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definir la URL del backend
const API_BASE_URL = "http://192.168.1.27:3000/api";

export default function CompletedTasksScreen({ navigation }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");

        if (!storedUserId) {
          setError("No se encontró el ID del usuario.");
          setLoading(false);
          return;
        }

        setUserId(storedUserId);
        fetchCompletedTasks(storedUserId);
      } catch (error) {
        console.error("❌ Error al obtener el ID del usuario:", error);
        setError("Error al recuperar el usuario.");
        setLoading(false);
      }
    };

    fetchUserId();
  }, []);

  const fetchCompletedTasks = async (id_usuario) => {
    try {
      console.log(`📡 Consultando API: ${API_BASE_URL}/tareas/completadas/${id_usuario}`);
      
      const response = await fetch(`${API_BASE_URL}/tareas/completadas/${id_usuario}`);

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}: No se pudieron obtener las tareas completadas.`);
      }

      const data = await response.json();
      console.log("✅ Datos recibidos:", data);

      if (!Array.isArray(data)) {
        throw new Error("Formato de datos incorrecto. Se esperaba un array.");
      }

      setCompletedTasks(data);
    } catch (error) {
      console.error("❌ Error en la API:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Tareas Completadas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#B8F2E6" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : completedTasks.length === 0 ? (
        <Text style={styles.noTasksText}>Aún no has completado ninguna tarea.</Text>
      ) : (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id_tarea?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View 
              style={[
                styles.taskCard, 
                item.tipo === "Especial" ? styles.specialTaskCard : {} // Color especial si la tarea es especial
              ]}
            >
              <Text style={styles.taskText}>{item.descripcion || "Sin descripción"}</Text>
              <Text style={styles.pointsText}>+{item.puntos || 0} pts</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>🔙 Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 15 },
  errorText: { color: "#FF5555", textAlign: "center", fontSize: 16, marginTop: 10 },
  noTasksText: { color: "#B8F2E6", textAlign: "center", fontSize: 16, marginTop: 10 },

  // Estilos de tareas normales
  taskCard: { 
    backgroundColor: "#5E6472", 
    padding: 15, 
    marginVertical: 8, 
    borderRadius: 10, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },

  //Estilos de tareas especiales (color rojo oscuro)
  specialTaskCard: { 
    backgroundColor: "#A10041"  
  },

  taskText: { color: "#FFFFFF", fontSize: 16, flex: 1 },
  pointsText: { 
    backgroundColor: "#B8F2E6", 
    color: "#000000", 
    paddingVertical: 4, 
    paddingHorizontal: 10, 
    borderRadius: 5, 
    fontWeight: "bold", 
    fontSize: 14 
  },

  backButton: { 
    backgroundColor: "#33FF99", 
    paddingVertical: 10, 
    borderRadius: 10, 
    alignItems: "center", 
    marginTop: 20 
  },
  
  backButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
});
