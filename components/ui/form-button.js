"use client";
import { useFormStatus } from "react-dom";

export default function FormButton({ className, children }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? "Sending..." : children}
    </button>
  );
}
