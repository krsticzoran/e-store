"use client";
import { useFormStatus } from "react-dom";

export default function FormButton({ className, children }) {
  // Hook to track form submission status (pending/not pending)
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      aria-label={pending ? "Submitting form" : "Submit form"} // Dynamic ARIA label
      aria-disabled={pending}
    >
      {pending ? "Sending..." : children}
    </button>
  );
}
