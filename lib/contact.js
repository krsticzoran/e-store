"use server";

export async function handleContactForm(formData) {
  const subject = formData.get("subject");
  const email = formData.get("email");
  const message = formData.get("message");

  console.log("Subject:", subject);
  console.log("Email:", email);
  console.log("Message:", message);
}
