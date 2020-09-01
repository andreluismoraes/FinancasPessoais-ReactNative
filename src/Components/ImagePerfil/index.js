import React, { useContext } from "react";
import { Image } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function ImagePerfil() {
  const { photoPerfil } = useContext(AuthContext);

  return (
    <Image
      source={
        photoPerfil !== ""
          ? { uri: photoPerfil }
          : require("../../../assets/logo.jpg")
      }
      style={{ width: 85, height: 85 }}
      resizeMode="contain"
    />
  );
}
