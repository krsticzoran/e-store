"use client";
import Image from "next/image";
import { useFormState } from "react-dom";

import email from "@/public/icons/mail.png";
import { sendingEmail } from "@/action/sending-email-action";

export default function Subscription() {
  const [state, formAction] = useFormState(
    (prevState, formData) => sendingEmail(prevState, formData, "subscription"),
    { message: "" },
  );
  return (
    <form action={formAction} className="relative mt-8">
      <input
        className="w-full border-b bg-primary pb-2 outline-none"
        type="email"
        name="email"
        placeholder="Enter your email"
      />
      <button className="absolute bottom-3 right-2">
        <Image src={email} width={20} height={20} alt="email" />
      </button>
    </form>
  );
}
