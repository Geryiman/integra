import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://ecopet-r77q7.ondigitalocean.app/api";

export default function PointsScreen({ navigation }) {
  const [userPoints, setUserPoints] = useState(null);
  const [nextRank, setNextRank] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState([]);

  const ranks = [
    { id: "1", name: "🟢 Aprendiz del Reciclaje", min: 0, max: 99, color: "#00FF00" },
    { id: "2", name: "🔵 Recolector Novato", min: 100, max: 299, color: "#0099FF" },
    { id: "3", name: "🟣 Eco-Explorador", min: 300, max: 599, color: "#9900FF" },
    { id: "4", name: "🟠 Guardián del PET", min: 600, max: 999, color: "#FF9900" },
    { id: "5", name: "🟡 Reciclador Experto", min: 1000, max: 1499, color: "#FFFF00" },
    { id: "6", name: "⚪ Eco-Héroe", min: 1500, max: 2499, color: "#FFFFFF" },
    { id: "7", name: "🟤 Embajador del Reciclaje", min: 2500, max: 3999, color: "#8B4513" },
    { id: "8", name: "🏆 Maestro del PET", min: 4000, max: 5999, color: "#FFD700" },
    { id: "9", name: "🏅 Leyenda Verde", min: 6000, max: Infinity, color: "#32CD32" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) return;

        const userResponse = await fetch(`${API_URL}/usuarios/${userId}`);
        const userData = await userResponse.json();
        setUserPoints(userData.puntos_totales);

        const rewardsResponse = await fetch(`${API_URL}/api/premios`);
        const rewardsData = await rewardsResponse.json();
        setRewards(rewardsData);

        const currentRankIndex = ranks.findIndex(r =>
          userData.puntos_totales >= r.min && userData.puntos_totales <= r.max
        );

        if (currentRankIndex !== -1 && currentRankIndex < ranks.length - 1) {
          setNextRank(ranks[currentRankIndex + 1]);
          setProgress(
            (userData.puntos_totales - ranks[currentRankIndex].min) /
            (ranks[currentRankIndex + 1].min - ranks[currentRankIndex].min)
          );
        } else {
          setNextRank(null);
          setProgress(1);
        }
      } catch (err) {
        console.error("❌ Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const redeemReward = async (id_recompensa) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await fetch(`${API_URL}/api/premios/canjear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: userId, id_premio: id_recompensa }),
      });

      const data = await response.json();
      alert(data.mensaje || data.error || "Respuesta inesperada");
    } catch (err) {
      alert("Error al canjear recompensa");
    }
  };

  const currentRank = ranks.find(rank => userPoints >= rank.min && userPoints <= rank.max);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>Puntos TTY</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" />
        ) : (
          <>
            <Text style={[styles.rankText, { color: currentRank?.color }]}>
              {currentRank?.name}
            </Text>
            {nextRank && (
              <Text style={styles.rankProgressText}>
                {nextRank.min - userPoints} puntos para alcanzar {nextRank.name}
              </Text>
            )}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.pointsText}>{userPoints} pts</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("History")}>
              <Text style={styles.buttonText}>📜 Historial</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonAlt} onPress={() => navigation.navigate("Ranks")}>
              <Text style={styles.buttonText}>🥇 Ver Rangos</Text>
            </TouchableOpacity>

            <Text style={styles.rewardsTitle}>🎁 Recompensas disponibles</Text>
            <FlatList
              data={rewards}
              keyExtractor={item => item.id_recompensa.toString()}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.rewardCard}>
                  <Text style={styles.rewardName}>{item.nombre}</Text>
                  <Text style={styles.rewardPoints}>{item.puntos_necesarios} pts</Text>
                  <TouchableOpacity onPress={() => redeemReward(item.id_recompensa)} style={styles.rewardButton}>
                    <Text style={styles.rewardButtonText}>Canjear</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}
      </View>

      {/* ✅ NAVBAR */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Home")}>
          <Icon name="home" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Profile")}>
          <Icon name="person" size={24} color="#FFFFFF" />
          <Text style={styles.navText}>Perfil</Text>
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
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  content: { flex: 1, padding: 20 },
  title: { color: "#FFF", fontSize: 24, fontWeight: "bold", textAlign: "center" },
  rankText: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 5 },
  rankProgressText: { color: "#FFF", textAlign: "center", marginBottom: 5 },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
  },
  progressBar: { height: "100%", backgroundColor: "#FFD700" },
  pointsText: {
    color: "#32CD32",
    fontSize: 36,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonAlt: {
    backgroundColor: "#5E6472",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: { textAlign: "center", fontWeight: "bold" },
  rewardsTitle: { color: "#FFF", fontSize: 18, marginVertical: 10 },
  rewardCard: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
  },
  rewardName: { color: "#FFF", fontSize: 14 },
  rewardPoints: { color: "#FFF", fontSize: 12 },
  rewardButton: {
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  rewardButtonText: { color: "#000", fontWeight: "bold" },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333333",
    paddingVertical: 12,
  },
  navButton: { alignItems: "center", justifyContent: "center" },
  navText: { fontSize: 12, color: "#FFFFFF", marginTop: 5 },
});
