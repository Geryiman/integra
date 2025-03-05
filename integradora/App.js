import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useEffect, useState } from "react";

// Importamos las pantallas
import SplashScreen from "./screens/SplashScreen"; 
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PointsScreen from "./screens/PointsScreen";
import RewardsScreen from "./screens/RewardsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import RanksScreen from "./screens/RanksScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TasksScreen from "./screens/TasksScreen";
import CompletedTasksScreen from "./screens/CompletedTasksScreen";
import ScanScreen from "./screens/ScanScreen";
	

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState("Splash");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      setInitialRoute(isLoggedIn === "true" ? "Home" : "Login"); 
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Points" component={PointsScreen} />
        <Stack.Screen name="Rewards" component={RewardsScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Ranks" component={RanksScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Tasks" component={TasksScreen} />
        <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
