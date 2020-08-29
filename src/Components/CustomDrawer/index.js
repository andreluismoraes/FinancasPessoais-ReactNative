import React, { useContext } from "react";
import { View, Text, Image } from "react-native";

import {
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props) {
  const { user, signOut, photoPerfil } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <Image
          source={
            photoPerfil !== null
              ? { uri: photoPerfil }
              : require("../../../assets/favicon.png")
          }
          style={{ width: 85, height: 85 }}
          resizeMode="contain"
        />

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
