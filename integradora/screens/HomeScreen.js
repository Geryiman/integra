// ✅ Importar la nueva pantalla de escaneo
import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, 
  SafeAreaView, FlatList, ActivityIndicator 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

// ✅ IP de tu backend
const API_URL = "http://192.168.1.27:3000";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/api/tareas`)
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando tareas:", error);
        setMessage("No se pudieron cargar las tareas.");
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>Bienvenido a Ecopet</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}

        {loading ? <ActivityIndicator size="large" color="#33FF99" /> : (
          <>
            <TouchableOpacity style={styles.fullTaskButton} onPress={() => navigation.navigate("Tasks")}>
              <Text style={styles.fullTaskButtonText}>📋 Ver Todas las Tareas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.completedTaskButton} onPress={() => navigation.navigate("CompletedTasks", { completedTasks })}>
              <Text style={styles.completedTaskButtonText}>✅ Ver Tareas Completadas</Text>
            </TouchableOpacity>

            <Text style={styles.subTitle}>Tareas para obtener puntos:</Text>
            {tasks.length === 0 ? (
              <Text style={styles.noTasks}>No hay tareas disponibles.</Text>
            ) : (
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id_tarea.toString()}
                renderItem={({ item }) => (
                  <View style={[styles.taskCard, item.completada ? styles.completedTask : null]}>
                    <Text style={styles.taskText}>{item.descripcion}</Text>
                    <Text style={styles.pointsText}>+{item.puntos} pts</Text>
                  </View>
                )}
              />
            )}
          </>
        )}
      </View>

      {/* 🔥 Barra de navegación con "Escanear" */}
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

// ✅ Estilos
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000000" },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 20 },
  subTitle: { fontSize: 18, color: "#B8F2E6", marginBottom: 10, fontWeight: "bold" },
  message: { color: "#FFD700", fontSize: 16, textAlign: "center", marginBottom: 10, fontWeight: "bold" },
  noTasks: { color: "#B8F2E6", textAlign: "center", fontSize: 16, marginVertical: 20 },
  taskCard: { backgroundColor: "#5E6472", padding: 15, marginVertical: 8, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  completedTask: { backgroundColor: "#2E8B57" },
  taskText: { color: "#FFFFFF", fontSize: 16, flex: 1 },
  pointsText: { backgroundColor: "#B8F2E6", color: "#000000", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 5, fontWeight: "bold", fontSize: 14 },
  navbar: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#333333", paddingVertical: 12 },
  navButton: { alignItems: "center", justifyContent: "center" },
  navText: { fontSize: 12, color: "#FFFFFF", marginTop: 5 },
});

export default HomeScreen;
