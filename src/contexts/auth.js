import React, { createContext, useState, useEffect } from "react";
import firebase from "../services/firebaseConnection";
import AsyncStorage from "@react-native-community/async-storage";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoPerfil, setPhotoPerfil] = useState("");

  async function loadStorage() {
    const storage_User = await AsyncStorage.getItem("Auth_user");

    if (storage_User) {
      setUser(JSON.parse(storage_User));
      setLoading(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadStorage();
  }, [photoPerfil]);

  //logar usuario
  const signIn = async (email, password) => {
    setLoading(true);
    const value = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const snapshot = await firebase
      .database()
      .ref("users")
      .child(value.user.uid)
      .once("value");

    const data = {
      uid: value.user.uid,
      email: value.user.email,
      nome: snapshot.val().nome,
      /**adicionando campo photo */
      foto: "data:image/jpg;base64," + snapshot.val().foto,
    };
    setUser(data);
    setPhotoPerfil(data.foto);
    setLoading(false);
  };

  //cadastrar Usuario
  const signUp = async (email, password, nome) => {
    setLoading(true);
    const value = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await firebase
      .database()
      .ref("users")
      .child(value.user.uid)
      .set({ saldo: 0, nome: nome, foto: "" });

    const data = {
      uid: value.user.uid,
      email: value.user.email,
      nome: nome,
      foto: "",
    };

    async function storageUser(data) {
      await AsyncStorage.setItem("Auth_user", Json.stringify(data));
    }

    storageUser(data);
    setUser(data);

    setLoading(false);
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        photoPerfil,
        setPhotoPerfil,
        signUp,
        signIn,
        signOut,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
