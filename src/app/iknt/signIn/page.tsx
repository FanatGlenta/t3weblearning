import React from "react";
import AuthForm from "../components/AuthForm";

const SignIn: React.FC = () => {
  return (
    <AuthForm
      title="Вход в аккаунт"
      buttonText="Войти"
      linkText="Нет аккаунта?"
      linkTo="/iknt/registration"
      isRegister={false}
    />
  );
};

export default SignIn;
