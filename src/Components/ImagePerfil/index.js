import React, { useContext, useEffect } from "react";
import { Image } from "react-native";
import { AuthContext } from "../../contexts/auth";

export default function ImagePerfil() {
  const { photoPerfil, setPhotoPerfil } = useContext(AuthContext);

  useEffect(() => {
    if (photoPerfil === "") {
      setPhotoPerfil("data:image/jpg;base64,");
    }
  });

  return (
    <Image
      source={
        photoPerfil !== "data:image/jpg;base64,"
          ? { uri: photoPerfil }
          : require("../../../assets/logo.jpg")
      }
      style={{ width: 85, height: 85 }}
      resizeMode="contain"
    />
  );
}
