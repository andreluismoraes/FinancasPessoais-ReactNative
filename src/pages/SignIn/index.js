import React, { useState, useContext } from "react";
import Roles from "../../Rules";

import { Platform } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/auth";

import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText,
} from "./styles.js";

export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const handleLogin = () => {
    if (Roles(email, password) === "Verificado") {
      signIn(email, password);
    }
    return;
  };

  return (
    <Background>
      <Container bahavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <Logo source={require("../../../assets/logo.jpg")} />

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorret={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorret={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </AreaInput>

        <SubmitButton onPress={handleLogin}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Criar uma conta</LinkText>
        </Link>

        <Link onPress={() => navigation.navigate("PasswordRecovery")}>
          <LinkText>Esqueceu a Senha</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
