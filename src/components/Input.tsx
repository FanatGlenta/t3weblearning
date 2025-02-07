import React from "react";

interface InputProps {
  type: string;
  name: string; // Добавлено имя, чтобы можно было правильно обновлять `useState`
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; // Добавил поддержку `required`
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  return (
    <input
      type={type}
      name={name} // Добавлено имя
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required} // Поддержка `required`
      className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default Input;
