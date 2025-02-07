import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; // Добавлена поддержка `disabled`
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // Теперь кнопка может быть отключена
      className={`w-full rounded-md py-2 text-white transition ${
        disabled
          ? "cursor-not-allowed bg-gray-400"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
