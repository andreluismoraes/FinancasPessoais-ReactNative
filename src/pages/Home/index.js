import React, { useContext, useState, useEffect } from "react";
import HistoricoList from "../../Components/HistoricoList";
import firebase from "../../services/firebaseConnection";
import { format, isPast } from "date-fns";
import { Alert, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DatePicker from "../../Components/DatePicker";

import { AuthContext } from "../../contexts/auth";
import Header from "../../Components/Header";

import { Background, Container, Nome, Saldo, Title, List, Area } from "./style";

export default function Home() {
  const { user, setLoading } = useContext(AuthContext);
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [newDate, setNewData] = useState(format(new Date(), "dd/MM/yy"));
  const [show, setShow] = useState(false);

  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref("users")
        .child(uid)
        .on("value", (snapshot) => {
          setSaldo(snapshot.val().saldo);
        });

      await firebase
        .database()
        .ref("historico")
        .child(uid)
        .orderByChild("date")
        // .equalTo(format(new Date(), "dd/MM/yy"))
        .equalTo(newDate)
        .limitToLast(10)
        .on("value", (snapshot) => {
          setHistorico([]);

          snapshot.forEach((childItem) => {
            const list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem
                .val()
                .valor.toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."),
              date: childItem.val().date,
            };

            setHistorico((oldArray) => [...oldArray, list].reverse());
          });
        });
    }

    loadList();
  }, [newDate]);

  const handleDeleteSuccess = async (data) => {
    setLoading(true);
    await firebase
      .database()
      .ref("historico")
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let saldoAtual = saldo;
        data.tipo === "despesa"
          ? (saldoAtual += parseFloat(data.valor))
          : (saldoAtual -= parseFloat(data.valor));

        await firebase
          .database()
          .ref("users")
          .child(uid)
          .child("saldo")
          .set(saldoAtual);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  const handleDelete = (data) => {
    if (isPast(new Date(data.date))) {
      // se a data do registro já passou vai entrar aqui
      alert("Você não pode excluir um registro antigo!");
      return;
    }
    Alert.alert(
      "Cuidado Atenção!",
      `Você deseja exluir ${data.tipo} - Valor ${data.valor}`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Continuar", onPress: () => handleDeleteSuccess(data) },
      ]
    );
  };

  const handleShowPicker = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const onChange = (date) => {
    setShow(Platform.OS === "ios");
    let setDate = format(date, "dd/MM/yy");
    setNewData(setDate);
  };

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>
          R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
        </Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" color="#fff" size={30} />
        </TouchableOpacity>
        <Title> Ultimas movimentações </Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <HistoricoList data={item} deleteItem={handleDelete} />
        )}
      />

      {show && (
        <DatePicker
          onClose={handleClose}
          date={new Date()}
          onChange={onChange}
        />
      )}
    </Background>
  );
}
