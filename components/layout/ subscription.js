"use client";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useRef, useEffect, state, useState } from "react";

import email from "@/public/icons/mail.png";
import { sendingEmail } from "@/action/sending-email-action";

export default function Subscription() {
  const [state, formAction] = useFormState(
    sendingEmail.bind(null, "subscription"),
    { message: "" },
  );
  const [message, setMessage] = useState();
  const ref = useRef(null);

  useEffect(() => {
    if (state.message === "Thank you for your message. It has been sent.") {
      ref.current.reset();
      setMessage(state.message);
    }
  }, [state]);

  const handleInputFocus = () => {
    setMessage("");
  };

  return (
    <>
      <form
        action={formAction}
        className="subscription relative mt-8"
        ref={ref}
      >
        <input
          className="autofill:border-black-900 w-full border-b bg-primary pb-2 outline-none autofill:bg-primary"
          type="email"
          name="email"
          placeholder="Enter your email"
          onFocus={handleInputFocus}
          required
        />
        <button className="absolute bottom-3 right-2">
          <Image src={email} width={20} height={20} alt="email" />
        </button>
      </form>
      {message && (
        <p className="mt-2 border border-[#008000] py-1 text-center text-white">
          {message}
        </p>
      )}
    </>
  );
}
