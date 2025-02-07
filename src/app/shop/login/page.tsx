import React from "react";
import AuthForm from "~/components/AuthForm";

const Login: React.FC = () => {
  return (
    <AuthForm
      title="Вход в аккаунт"
      buttonText="Войти"
      linkText="Нет аккаунта?"
      linkTo="/shop/registration"
      isRegister={false} // Включаем режим входа
    />
  );
};

export default Login;
