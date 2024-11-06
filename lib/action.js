"use server";

const formId = process.env.FORM_ID;
const url = process.env.WP_CONTACT_API_BASE_URL;

export async function sendingEmail(formData) {
  const collectedData = {
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const data = new FormData();

  data.append("your-em", collectedData.email); // Email field
  data.append("your-subject", collectedData.subject); // Subject field
  data.append("your-message", collectedData.message); // Message field
  data.append("_wpcf7_unit_tag", formId);
  try {
    const res = await fetch(`${url}/${formId}/feedback`, {
      method: "POST",
      body: data,
    });

    // Check if the response is okay (HTTP status 200-299)
    if (res.ok) {
      const data = await res.json();
      console.log("Response from server:", data);
      // Check for a success message in the response
      if (data.status === "mail_sent") {
        console.log("Form submitted successfully!");
      } else {
        console.log("Form submission failed:", data.message);
      }
    } else {
      console.error("Network response was not ok:", res.status, res.statusText);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}
