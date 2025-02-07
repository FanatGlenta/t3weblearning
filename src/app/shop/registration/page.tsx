import React from "react";
import AuthForm from "~/components/AuthForm";

const Register: React.FC = () => {
  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      linkText="Уже есть аккаунт?"
      linkTo="/shop/login"
      isRegister={true}
    />
  );
};

export default Register;
