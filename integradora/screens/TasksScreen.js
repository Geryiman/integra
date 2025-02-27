import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";

export default function TasksScreen({ navigation }) {
  const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga

  // URL del backend (ajusta si es necesario)
  const API_URL = "http://192.168.1.27:3000/api/tareas";

  // Función para obtener tareas desde el backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data); // Almacena las tareas en el estado
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setLoading(false); // Desactiva el indicador de carga
    }
  };

  // Cargar tareas al montar la pantalla
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lista Completa de Tareas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#B8F2E6" />
      ) : tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No hay tareas disponibles</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id_tarea.toString()} // Ajustado según la BD
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>{item.descripcion}</Text>
              <Text style={styles.pointsText}>+{item.puntos} pts</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
  },
  noTasksText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
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
  taskText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
  },
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
  backButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
