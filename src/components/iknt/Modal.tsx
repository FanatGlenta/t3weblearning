import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-1/3 rounded bg-white p-6">
        <button className="absolute right-2 top-2" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}
