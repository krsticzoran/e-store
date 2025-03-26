"use client";
import ReactDOM from "react-dom";

export default function ModalWrapper({ children, className, isOpen }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={className}>{children}</div>,

    document.getElementById("reusablePortal"),
  );
}
