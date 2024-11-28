"use server";

const formId = process.env.FORM_ID;
const url = process.env.WP_CONTACT_API_BASE_URL;

export async function sendingEmail(prevState, formData) {
  const collectedData = {
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const data = new FormData();

  data.append("your-em", collectedData.email);
  data.append("your-subject", collectedData.subject);
  data.append("your-message", collectedData.message);
  data.append("_wpcf7_unit_tag", formId);
  try {
    const res = await fetch(`${url}/${formId}/feedback`, {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      const data = await res.json();
      return { message: data.message, success: true }; // Return success flag with message
    } else {
      const errorData = await res.json();
      return {
        message: errorData.message || "An error occurred.",
        success: false,
      };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      message: "Failed to submit form. Please try again later.",
      success: false,
    };
  }
}
