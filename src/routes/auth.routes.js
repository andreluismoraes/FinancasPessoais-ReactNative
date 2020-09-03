import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PasswordRecovery from "../pages/PassordRecovery";

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />

    <AuthStack.Screen
      name="PasswordRecovery"
      component={PasswordRecovery}
      options={{
        headerStyle: {
          backgroundColor: "#131313",
          borderBottomWidth: 1,
          borderBottomColor: "#00b94a",
        },
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerTitle: "Voltar",
      }}
    />

    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerStyle: {
          backgroundColor: "#131313",
          borderBottomWidth: 1,
          borderBottomColor: "#00b94a",
        },
        headerTintColor: "#fff",
        headerBackTitleVisible: false,
        headerTitle: "Voltar",
      }}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
