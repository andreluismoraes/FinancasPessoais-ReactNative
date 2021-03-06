import React, { useState, useEffect, useContext } from "react";
import { Text, View, Modal, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../contexts/auth";
import * as FileSystem from "expo-file-system";
import firebase from "../../services/firebaseConnection";

import {
  Container,
  Preview,
  Button,
  ButtonText,
  ModalView,
  FlipView,
  ButtonFlip,
  FlipBack,
} from "./style";

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const navigation = useNavigation();
  const { setPhotoPerfil, user } = useContext(AuthContext);

  useEffect(() => {
    /**acessar a camera */
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    /**acessar ao album */
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>'Não tem acesso para a câmera'</Text>;
  }

  const takePicture = async () => {
    const options = { quality: 0.5, base64: true };
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync(options);
      setCapturedPhoto(photo.uri);
      setOpen(true);
    }
  };

  const handleSavePicture = async (photo) => {
    const base64 = await FileSystem.readAsStringAsync(photo, {
      encoding: "base64",
    });
    alert("Foto cadastrada com sucesso");
    setOpen(false);
    await firebase.database().ref("users").child(user.uid).update({
      foto: base64,
    });
    setPhotoPerfil("data:image/jpg;base64," + base64);
  };

  const handleOpenAlbum = () => {
    const options = {
      mediaTypes: "Images",
    };

    ImagePicker.launchImageLibraryAsync(options).then((response) => {
      setCapturedPhoto(response.uri);
      setOpen(true);
    });
  };

  const handleClickBack = () => {
    navigation.navigate("Home");
  };

  return (
    <Container style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={(ref) => setCameraRef(ref)}>
        <FlipBack>
          <FlipView>
            <ButtonFlip onPress={() => handleClickBack()}>
              <ButtonText>Voltar</ButtonText>
            </ButtonFlip>
          </FlipView>

          <FlipView>
            <ButtonFlip
              onPress={() =>
                type === Camera.Constants.Type.front
                  ? setType(Camera.Constants.Type.back)
                  : setType(Camera.Constants.Type.front)
              }
            >
              <ButtonText>Virar</ButtonText>
            </ButtonFlip>
          </FlipView>
        </FlipBack>

        <Preview>
          <Button onPress={() => takePicture()}>
            <ButtonText>Tirar Foto</ButtonText>
          </Button>
          <Button onPress={() => handleOpenAlbum()}>
            <ButtonText>Album</ButtonText>
          </Button>
        </Preview>
      </Camera>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <ModalView>
            <Button onPress={() => handleSavePicture(capturedPhoto)}>
              <ButtonText>Salvar a Foto</ButtonText>
            </Button>
            <Button onPress={() => setOpen(false)}>
              <ButtonText>Fechar</ButtonText>
            </Button>

            <Image
              resizeMode="contain"
              style={{ width: 350, height: 450, borderRadius: 15 }}
              source={{ uri: capturedPhoto }}
            />
          </ModalView>
        </Modal>
      )}
    </Container>
  );
}
