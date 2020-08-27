import React, { useState, useContext } from "react";
import firebase from "../../services/firebaseConnection";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import Header from "../../Components/Header";

import { Background, SubmitButton, Input, SubmitText } from "./style";

import Picker from "../../Components/Picker";

export default function New() {
  const navigation = useNavigation();
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState(null);
  const { user: usuario, setLoading } = useContext(AuthContext);

  const handleAdd = async () => {
    setLoading(true);
    const uid = usuario.uid;

    const Key = await firebase.database().ref("historico").child(uid).push()
      .key;
    await firebase
      .database()
      .ref("historico")
      .child(uid)
      .child(Key)
      .set({
        tipo: tipo,
        valor: parseFloat(valor),
        date: format(new Date(), "dd/MM/yy"),
      });

    //atulizando Saldo
    const user = firebase.database().ref("users").child(uid);
    await user.once("value").then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === "despesa"
        ? (saldo -= parseFloat(valor))
        : (saldo += parseFloat(valor));

      user.child("saldo").set(saldo);
    });
    setLoading(false);
    Keyboard.dismiss();
    setValor("");
    navigation.navigate("Home");
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (isNaN(parseFloat(valor)) || tipo === null || tipo === "") {
      alert("Preencha todos os campos!");
      return;
    }
    Alert.alert("Confirmando dados", `${tipo} - Valor: ${parseFloat(valor)}`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Continuar", onPress: () => handleAdd() },
    ]);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />

        <SafeAreaView style={{ alignItems: "center" }}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={valor}
            onChangeText={(text) => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
