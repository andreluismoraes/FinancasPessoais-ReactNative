import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Header from "../../Components/Header";
import { TouchableOpacity } from "react-native";

import { Container, Nome, NewLink, NewText, Logout, LogoutText } from "./style";
import ImagePerfil from "../../Components/ImagePerfil";

import { AuthContext } from "../../contexts/auth";

export default function Profile() {
  const navigation = useNavigation();
  const { user, signOut } = useContext(AuthContext);

  return (
    <Container>
      <Header />

      <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
        <ImagePerfil />
      </TouchableOpacity>

      <Nome>{user && user.nome}</Nome>

      <NewLink onPress={() => navigation.navigate("Registrar")}>
        <NewText>Registrar Gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}
