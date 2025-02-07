import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

export default function PointsScreen() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setPoints((prev) => (prev < 100 ? prev + 1 : prev));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.title}>
        ¡Tus Puntos!
      </Animatable.Text>
      <Animatable.Text animation="fadeInUp" duration={2000} style={styles.points}>
        {points}
      </Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5E6472",
    marginBottom: 20,
  },
  points: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#B8F2E6",
  },
});
