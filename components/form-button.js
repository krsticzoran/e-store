"use client";
import { useFormStatus } from "react-dom";

export default function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="bg-gray-500 p-1">
      {pending ? "Sending..." : "Send"}
    </button>
  );
}
