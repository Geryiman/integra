import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

export default function RanksScreen({ navigation }) {
  const userPoints = 166; // Cambia esto para probar distintos rangos

  const ranks = [
    { id: "1", name: "🟢 Aprendiz del Reciclaje", range: "0 - 99 pts", min: 0, max: 99, color: "#00FF00" },
    { id: "2", name: "🔵 Recolector Novato", range: "100 - 299 pts", min: 100, max: 299, color: "#0099FF" },
    { id: "3", name: "🟣 Eco-Explorador", range: "300 - 599 pts", min: 300, max: 599, color: "#9900FF" },
    { id: "4", name: "🟠 Guardián del PET", range: "600 - 999 pts", min: 600, max: 999, color: "#FF9900" },
    { id: "5", name: "🟡 Reciclador Experto", range: "1,000 - 1,499 pts", min: 1000, max: 1499, color: "#FFFF00" },
    { id: "6", name: "⚪ Eco-Héroe", range: "1,500 - 2,499 pts", min: 1500, max: 2499, color: "#FFFFFF" },
    { id: "7", name: "🟤 Embajador del Reciclaje", range: "2,500 - 3,999 pts", min: 2500, max: 3999, color: "#8B4513" },
    { id: "8", name: "🏆 Maestro del PET", range: "4,000 - 5,999 pts", min: 4000, max: 5999, color: "#FFD700" },
    { id: "9", name: "🏅 Leyenda Verde", range: "6,000+ pts", min: 6000, max: Infinity, color: "#32CD32" },
  ];

  // Encontrar el rango actual del usuario
  const currentRank = ranks.find(rank => userPoints >= rank.min && userPoints <= rank.max);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏅 Rangos Disponibles</Text>

      {/* Mostrar el rango actual */}
      <View style={[styles.currentRankBox, { backgroundColor: currentRank.color }]}>
        <Text style={styles.currentRankText}>Tu Rango Actual: {currentRank.name}</Text>
        <Text style={styles.currentRankRange}>({currentRank.range})</Text>
      </View>

      {/* Lista de Rangos */}
      <FlatList
        data={ranks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.rankItem, { borderColor: item.color }]}>
            <Text style={styles.rankName}>{item.name}</Text>
            <Text style={styles.rankRange}>{item.range}</Text>
          </View>
        )}
      />

      {/* Botón para volver a Puntos */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Points")}>
        <Text style={styles.backButtonText}>🔙 Volver a Puntos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 20 },
  currentRankBox: { padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  currentRankText: { fontSize: 18, fontWeight: "bold", color: "#000000" },
  currentRankRange: { fontSize: 14, color: "#000000" },
  rankItem: { backgroundColor: "#1E1E1E", padding: 10, borderRadius: 10, marginBottom: 10, borderWidth: 2 },
  rankName: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  rankRange: { color: "#B8F2E6", fontSize: 14 },
  backButton: { backgroundColor: "#5E6472", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 20 },
  backButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
