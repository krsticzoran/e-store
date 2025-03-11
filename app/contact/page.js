"use client";

import { sendingEmail } from "@/action/sending-email-action";
import FormButton from "@/components/ui/form-button";
import { useFormState } from "react-dom";
import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [state, formAction] = useFormState(sendingEmail.bind(null, "contact"), {
    message: "",
  });
  const [message, setMessage] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    setMessage(state.message);
    if (state.message == "Thank you for your message. It has been sent.") {
      ref.current.reset();
    }
  }, [state]);

  const handleInputFocus = () => {
    setMessage("");
  };

  return (
    <div className="py-40">
      <form action={formAction} ref={ref}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onFocus={handleInputFocus}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="subject"
          onFocus={handleInputFocus}
          required
        />
        <input
          type="text"
          name="message"
          placeholder="message"
          onFocus={handleInputFocus}
          required
        />
        <FormButton />
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
