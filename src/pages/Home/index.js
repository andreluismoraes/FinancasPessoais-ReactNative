import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../../contexts/auth";

export default function Home() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Home</Text>
      <Text>{user && user.nome}</Text>
      <Text>{user && user.email}</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
