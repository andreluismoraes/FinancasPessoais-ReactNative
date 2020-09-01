import React, { useContext } from "react";
import { View, Text } from "react-native";
import ImagePerfil from "../ImagePerfil";

import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props) {
  const { user, signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <ImagePerfil />

        <Text style={{ color: "#fff", fontSize: 18, marginTop: 5 }}>
          Bem Vindo
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: "bold",
            paddingBottom: 25,
          }}
        >
          {user.nome}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        {...props}
        label="Sair do app"
        inactiveBackgroundColor="#c62c36"
        onPress={() => signOut()}
      />
    </DrawerContentScrollView>
  );
}
