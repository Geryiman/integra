import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.27:3000"; // Cambia según tu backend

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
                if (!userId) {
                    console.warn("No hay usuario almacenado");
                    setLoading(false);
                    return;
                }

                // Obtener puntos del usuario
                const userResponse = await fetch(`${API_URL}/usuarios/${userId}`);
                const userData = await userResponse.json();
                setUserPoints(userData.puntos_totales);

                // Obtener recompensas disponibles
                const rewardsResponse = await fetch(`${API_URL}/api/premios`);
                const rewardsData = await rewardsResponse.json();
                setRewards(rewardsData);

                // Calcular el próximo rango
                const currentRankIndex = ranks.findIndex(rank => userData.puntos_totales >= rank.min && userData.puntos_totales <= rank.max);
                if (currentRankIndex !== -1 && currentRankIndex < ranks.length - 1) {
                    setNextRank(ranks[currentRankIndex + 1]);
                    const neededPoints = ranks[currentRankIndex + 1].min - userData.puntos_totales;
                    setProgress((userData.puntos_totales - ranks[currentRankIndex].min) / (ranks[currentRankIndex + 1].min - ranks[currentRankIndex].min));
                } else {
                    setNextRank(null);
                    setProgress(1);
                }
            } catch (error) {
                console.error("Error al obtener datos del usuario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Función para canjear un premio
    const redeemReward = async (rewardId) => {
        try {
            const userId = await AsyncStorage.getItem("userId");
            const response = await fetch(`${API_URL}/api/premios/canjear`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_usuario: userId, id_premio: rewardId }),
            });

            const data = await response.json();
            if (data.mensaje) {
                Alert.alert("¡Éxito!", data.mensaje);
            } else {
                Alert.alert("Error", data.error || "No se pudo canjear la recompensa");
            }
        } catch (error) {
            console.error("Error al canjear la recompensa:", error);
            Alert.alert("Error", "No se pudo procesar el canje");
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : (
                <>
                    <Text style={styles.title}>Puntos TTY</Text>
                    <Text style={[styles.rankText, { color: ranks.find(r => userPoints >= r.min && userPoints <= r.max)?.color }]}>
                        {ranks.find(r => userPoints >= r.min && userPoints <= r.max)?.name}
                    </Text>
                    <Text style={styles.rankSubtitle}>Ganarás puntos por cada acción ecológica.</Text>
                    {nextRank && (
                        <Text style={styles.rankProgressText}>
                            {nextRank.min - userPoints} puntos hasta el nivel {nextRank.name}
                        </Text>
                    )}
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
                    </View>
                    <Text style={styles.pointsText}>{userPoints}</Text>

                    <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("History")}>
                        <Text style={styles.buttonText}>📜 Ver Historial de Recompensas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ranksButton} onPress={() => navigation.navigate("Ranks")}>
                        <Text style={styles.buttonText}>🥇 Ver Rangos Disponibles</Text>
                    </TouchableOpacity>

                    <Text style={styles.rewardsTitle}>Recompensas disponibles</Text>
                    <FlatList
                        data={rewards}
                        keyExtractor={(item) => item.id_recompensa.toString()}
                        horizontal
                        renderItem={({ item }) => (
                            <View style={styles.rewardCard}>
                                <Text style={styles.rewardName}>{item.nombre}</Text>
                                <Text style={styles.rewardPoints}>{item.puntos_necesarios} pts</Text>
                                <TouchableOpacity
                                    onPress={() => redeemReward(item.id_recompensa)}
                                    style={styles.rewardButton}
                                >
                                    <Text style={styles.rewardButtonText}>Canjear</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", padding: 20 },
    title: { color: "#FFF", fontSize: 24, fontWeight: "bold", textAlign: "center" },
    rankText: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 5 },
    rankSubtitle: { color: "#FFF", textAlign: "center", marginBottom: 10 },
    rankProgressText: { color: "#FFF", textAlign: "center", marginBottom: 5 },
    progressBarContainer: { height: 10, backgroundColor: "#333", borderRadius: 5, overflow: "hidden", marginVertical: 5 },
    progressBar: { height: "100%", backgroundColor: "#FFD700" },
    pointsText: { color: "#32CD32", fontSize: 36, textAlign: "center", fontWeight: "bold", marginVertical: 10 },
    historyButton: { backgroundColor: "#FFD700", padding: 10, borderRadius: 5, marginBottom: 10 },
    ranksButton: { backgroundColor: "#5E6472", padding: 10, borderRadius: 5, marginBottom: 10 },
    buttonText: { textAlign: "center", fontWeight: "bold" },
    rewardsTitle: { color: "#FFF", fontSize: 18, marginVertical: 10 },
    rewardCard: { backgroundColor: "#222", padding: 15, marginRight: 10, borderRadius: 10 },
    rewardName: { color: "#FFF", fontSize: 14 },
    rewardPoints: { color: "#FFF", fontSize: 12 },
    rewardButton: { backgroundColor: "#FFD700", padding: 5, borderRadius: 5 },
    rewardButtonText: { color: "#000", fontWeight: "bold" },
});
