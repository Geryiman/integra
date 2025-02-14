import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PointsScreen({ navigation }) {
  const [points, setPoints] = useState(166);
  const nextLevel = 772;
  const level = "Embajador del reciclaje";
  const [claimedRewards, setClaimedRewards] = useState([]);

  const rewards = [
    { id: "1", name: "🎟 Boleto para una rifa de útiles escolares", points: 10 },
    { id: "2", name: "🍬 Dulce o snack pequeño en la cooperativa", points: 15 },
    { id: "3", name: "✏ Lápiz o pluma con diseño especial", points: 20 },
    { id: "4", name: "📓 Pegatinas ecológicas o educativas", points: 25 },
    { id: "5", name: "🎫 Pase para escuchar música en clase", points: 30 },
  ];

  // Función para canjear una recompensa
  const redeemReward = (reward) => {
    if (points >= reward.points) {
      setPoints(points - reward.points);
      setClaimedRewards([...claimedRewards, reward]);
      navigation.navigate("Rewards", { claimedRewards: [...claimedRewards, reward] });
    } else {
      alert("No tienes suficientes puntos");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Icon name="arrow-back" size={28} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Puntos TTY</Text>
        <Icon name="more-vert" size={28} color="#FFFFFF" />
      </View>

      {/* Nivel y progreso */}
      <Text style={styles.level}>{level}</Text>
      <Text style={styles.subText}>Ganarás puntos por cada acción ecológica.</Text>
      <Text style={styles.progressText}>{nextLevel - points} puntos hasta el nivel Plata</Text>

      {/* Barra de progreso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(points / nextLevel) * 100}%` }]} />
      </View>

      {/* Animación de puntos */}
      <Animatable.Text animation="fadeInUp" duration={2000} style={styles.points}>
        {points}
      </Animatable.Text>

      {/* Botón para ver el historial de recompensas */}
      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("History")}>
        <Text style={styles.historyButtonText}>📜 Ver Historial de Recompensas</Text>
      </TouchableOpacity>

      {/* Botón para ver los rangos disponibles */}
      <TouchableOpacity style={styles.ranksButton} onPress={() => navigation.navigate("Ranks")}>
        <Text style={styles.ranksButtonText}>🏅 Ver Rangos Disponibles</Text>
      </TouchableOpacity>

      <Text style={styles.rewardsTitle}>Recompensas disponibles</Text>

      {/* Lista de recompensas */}
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.rewardCard}>
            <Text style={styles.rewardText}>{item.name}</Text>
            <Text style={styles.rewardPoints}>{item.points} pts</Text>
            <TouchableOpacity style={styles.claimButton} onPress={() => redeemReward(item)}>
              <Text style={styles.claimButtonText}>Canjear</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 20, color: "#FFFFFF", fontWeight: "bold" },
  level: { fontSize: 28, fontWeight: "bold", color: "#FFA726", textAlign: "center", marginBottom: 5 },
  subText: { color: "#FFFFFF", textAlign: "center", marginBottom: 10 },
  progressText: { color: "#FFFFFF", textAlign: "center", fontSize: 14, marginBottom: 10 },
  progressBarContainer: { height: 10, backgroundColor: "#333333", borderRadius: 5, overflow: "hidden", marginBottom: 20 },
  progressBar: { height: "100%", backgroundColor: "#33FF99" },
  points: { fontSize: 64, fontWeight: "bold", color: "#33FF99", textAlign: "center", marginBottom: 20 },
  historyButton: { backgroundColor: "#FFD700", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 10 },
  historyButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
  ranksButton: { backgroundColor: "#5E6472", padding: 10, borderRadius: 5, alignItems: "center", marginBottom: 20 },
  ranksButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  rewardsTitle: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF", marginBottom: 10 },
  rewardCard: { backgroundColor: "#1E1E1E", borderRadius: 10, padding: 10, marginRight: 10, alignItems: "center", width: 180 },
  rewardText: { color: "#FFFFFF", fontSize: 14, textAlign: "center" },
  rewardPoints: { color: "#B8F2E6", fontSize: 12, marginVertical: 5 },
  claimButton: { backgroundColor: "#5E6472", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, marginTop: 5 },
  claimButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
});

