"use client";
import { useState } from "react";
import { sendingEmail } from "@/lib/action";

export default function Contact() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const message = await sendingEmail(formData);

    if (message) {
      setResponseMessage(message);
    } else {
      setResponseMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="email" />
        <input type="text" name="subject" placeholder="subject" />
        <input type="text" name="message" placeholder="message" />
        <button type="submit">Submit</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </>
  );
}
