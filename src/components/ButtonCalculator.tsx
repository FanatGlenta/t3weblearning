import React from "react";

interface NumberPadProps {
  onClick: (digit: string) => void;
  fromBase: number;
}

const NumberPad: React.FC<NumberPadProps> = ({ onClick, fromBase }) => {
  // Разрешенные символы для выбранной системы счисления
  const digits = "0123456789ABCDEF".slice(0, fromBase);

  return (
    <div className="mt-4 grid grid-cols-4 gap-2">
      {Array.from("0123456789ABCDEF").map((digit) => (
        <button
          key={digit}
          disabled={!digits.includes(digit)}
          className={`rounded p-4 ${
            digits.includes(digit)
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
          onClick={() => onClick(digit)}
        >
          {digit}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;
