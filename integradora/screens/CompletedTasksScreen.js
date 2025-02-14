import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function CompletedTasksScreen({ route, navigation }) {
  const { completedTasks } = route.params || { completedTasks: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Tareas Completadas</Text>

      {completedTasks.length === 0 ? (
        <Text style={styles.noTasksText}>Aún no has completado ninguna tarea.</Text>
      ) : (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskText}>{item.description}</Text>
              <Text style={styles.pointsText}>+{item.points} pts</Text>
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
  noTasksText: { color: "#B8F2E6", textAlign: "center", fontSize: 16, marginTop: 10 },
  taskCard: { backgroundColor: "#5E6472", padding: 15, marginVertical: 8, borderRadius: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  taskText: { color: "#FFFFFF", fontSize: 16, flex: 1 },
  pointsText: { backgroundColor: "#B8F2E6", color: "#000000", paddingVertical: 4, paddingHorizontal: 10, borderRadius: 5, fontWeight: "bold", fontSize: 14 },
  backButton: { backgroundColor: "#33FF99", paddingVertical: 10, borderRadius: 10, alignItems: "center", marginTop: 20 },
  backButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
});
