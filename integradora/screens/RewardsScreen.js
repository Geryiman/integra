import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function RewardsScreen({ route }) {
  const { claimedRewards } = route.params || { claimedRewards: [] };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎁 Recompensas Adquiridas</Text>

      {claimedRewards.length === 0 ? (
        <Text style={styles.noRewardsText}>Aún no has canjeado ninguna recompensa.</Text>
      ) : (
        <FlatList
          data={claimedRewards}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <View style={styles.rewardItem}>
              <Text style={styles.rewardText}>🏅 {item.name}</Text>
              <Text style={styles.rewardPoints}>✨ {item.points} pts</Text>
            </View>
          )}
        />
      )}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  noRewardsText: {
    color: "#B8F2E6",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  rewardItem: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#33FF99",
  },
  rewardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  rewardPoints: {
    color: "#B8F2E6",
    fontSize: 14,
    marginTop: 5,
  },
});
