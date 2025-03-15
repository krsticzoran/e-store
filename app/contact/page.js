"use client";

import { sendingEmail } from "@/action/sending-email-action";
import FormButton from "@/components/ui/form-button";

import useFormHandler from "@/hooks/useFormHandler";

export default function Contact() {
  const { ref, message, formAction, handleInputFocus } = useFormHandler(
    sendingEmail.bind(null, "contact"),
  );

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
        <FormButton className="rounded bg-blue-500 p-2 text-white">
          Submit
        </FormButton>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
