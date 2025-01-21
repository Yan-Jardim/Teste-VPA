"use client";

import React, { ReactNode, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  icon,
  iconPosition = "right",
  children,
  onClose,
}) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded-lg shadow-lg p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`flex items-center ${
              iconPosition === "left" ? "flex-row-reverse" : ""
            }`}
          >
            {icon && <span className="ml-2">{icon}</span>}{" "}
            <span className="text-xl font-bold">{title}</span>
          </div>
          <AiOutlineClose
            className="cursor-pointer text-gray-500 w-6 h-6"
            onClick={handleClose}
          />
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
