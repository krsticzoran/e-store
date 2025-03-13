"use client";
import { useFormState } from "react-dom";
import { useRef, useEffect, useState } from "react";

export default function useFormHandler(action) {
  const [state, formAction] = useFormState(action, { message: "" });

  const [message, setMessage] = useState();
  const ref = useRef(null);

  useEffect(() => {
    if (state.success) {
      ref.current.reset();
    }
    setMessage(state.message);
  }, [state]);

  const handleInputFocus = () => {
    setMessage("");
  };
  return { ref, message, handleInputFocus, formAction };
}
