import React from "react";
import AuthForm from "../components/AuthForm";

const Registration: React.FC = () => {
  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      linkText="Уже есть аккаунт?"
      linkTo="/iknt/signIn"
      isRegister={true}
    />
  );
};

export default Registration;
