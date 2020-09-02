import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

/**paginas ou drawers */
import AppRoutes from "./app.routes";
import Camera from "../pages/CameraComponent";

const NormalStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={AppRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NormalStack;
