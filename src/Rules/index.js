const Roles = (login, password) => {
  /**regex de verificar email by https://medium.com/codespace69/how-to-validate-textinput-values-in-react-native-365619e96107*/
  const validateEmail = (login) => {
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(login);
  };

  /**regex de verificar senha by https://rubular.com/r/UAwoaPM0Ji */
  //   const validatePassword = (password) => {
  //     var re = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
  //     return re.test(password);
  //   };

  if (!validateEmail(login)) {
    alert("Email Inválido");
    return;
  }

  //   if (!validatePassword(password)) {
  //     alert(
  //       "A senha tem que ter ao menos uma letra minuscula, uma letra maiuscula, um caractere especial, um numero e maior que 8 digitos"
  //     );
  //     return;
  //   }

  return "Verificado";
};

export default Roles;
