import React, { useState, useContext } from "react";

import { Platform } from "react-native";

import { AuthContext } from "../../contexts/auth";

import { useNavigation } from "@react-navigation/native";

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

export default function PassordRecovery() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const { sendEmail } = useContext(AuthContext);

  const sendemail = () => {
    if (Roles(email) === "Verificado") {
      sendEmail(email);
      alert("Senha enviada com Sucesso");
      navigation.navigate("SignIn");
    }
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

        <SubmitButton onPress={sendemail}>
          <SubmitText>Enviar</SubmitText>
        </SubmitButton>
      </Container>
    </Background>
  );
}
