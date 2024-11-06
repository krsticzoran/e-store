import { sendingEmail } from "@/lib/action";

export default function Contact() {
  return (
    <>
      <form action={sendingEmail}>
        <input type="email" name="email" placeholder="email" />
        <input type="text" name="subject" placeholder="subject" />
        <input type="text" name="message" placeholder="message" />
        <button>Submit</button>
      </form>
    </>
  );
}
