import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

console.disableYellowBox = true;

import AuthProvider from "./src/contexts/auth";

import Routes from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" style="light" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
