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
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  points: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#33FF99",
    textShadowColor: "#00FFFF",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
