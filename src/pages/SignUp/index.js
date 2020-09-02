import React, { useState, useContext } from "react";

import { Platform } from "react-native";

import { AuthContext } from "../../contexts/auth";

import Roles from "../../Rules";

import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
} from "../SignIn/styles";

export default function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSignUp = () => {
    if (Roles(email, password) === "Verificado") {
      signUp(email, password, nome);
    }
    return;
  };

  return (
    <Background>
      <Container bahavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <Logo source={require("../../../assets/logo.jpg")} />

        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorret={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </AreaInput>

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

        <SubmitButton onPress={handleSignUp}>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}
