"use client";

import { sendingEmail } from "@/lib/action";
import FormButton from "@/components/form-button";
import { useFormState } from "react-dom";

export default function Contact() {
  const [state, formAction] = useFormState(sendingEmail, { message: "" });

  return (
    <>
      <form action={formAction}>
        <input type="email" name="email" placeholder="email" />
        <input type="text" name="subject" placeholder="subject" />
        <input type="text" name="message" placeholder="message" />
        <FormButton />
      </form>
      {state.message}
    </>
  );
}
