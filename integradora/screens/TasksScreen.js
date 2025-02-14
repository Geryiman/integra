import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function TasksScreen({ navigation }) {
  const tasks = [
    { id: "1", description: "Depositar una botella de PET en el contenedor inteligente", points: 5 },
    { id: "2", description: "Entregar 10 botellas de plástico en el punto de reciclaje", points: 10 },
    { id: "3", description: "Separar basura reciclable en casa por una semana", points: 15 },
    { id: "4", description: "Llevar cartón y papel al centro de reciclaje", points: 20 },
    { id: "5", description: "Participar en una jornada de recolección de basura", points: 25 },
    { id: "6", description: "Usar una botella reutilizable en lugar de comprar agua embotellada", points: 5 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Lista Completa de Tareas</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskText}>{item.description}</Text>
            <Text style={styles.pointsText}>+{item.points} pts</Text>
          </View>
        )}
      />
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
