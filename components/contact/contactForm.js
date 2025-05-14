"use client";
import { useState, useEffect } from "react";
import { sendingEmail } from "@/action/sending-email-action";
import FormButton from "@/components/ui/form-button";
import useFormHandler from "@/hooks/useFormHandler";

export default function ContactForm() {
  // Custom hook for form handling (submission, validation, etc.)
  const { ref, message, formAction, handleInputFocus, isSubmitted } =
    useFormHandler(sendingEmail.bind(null, "contact"));

  // State for managing the consent checkbox
  const [checked, setChecked] = useState(false);

  // Toggle checkbox state
  const handleChange = () => {
    setChecked(!checked);
  };

  // Set checkbox state to false if form is submitted
  useEffect(() => {
    if (isSubmitted) {
      setChecked(false);
    }
  }, [isSubmitted]);

  return (
    <div className="my-[70px] px-5 lg:px-0">
      {/* Main contact form */}
      <form
        action={formAction}
        ref={ref}
        className="mx-auto flex max-w-[696px] flex-col text-primary"
        aria-label="Contact form"
      >
        {/* Email input field */}
        <label htmlFor="email" className="mb-[5px] font-bold">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          onFocus={handleInputFocus}
          required
          className="mb-5 border bg-white px-5 py-3 outline-none"
          aria-required="true"
          aria-label="Your email address"
        />

        {/* Subject input field */}
        <label htmlFor="subject" className="mb-[5px] font-bold">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          placeholder="Your Subject"
          onFocus={handleInputFocus}
          required
          className="mb-5 border px-5 py-3 outline-none"
          aria-required="true"
          aria-label="Email subject"
        />

        {/* Message textarea */}
        <label htmlFor="message" className="mb-[5px] font-bold">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Type your message here..."
          onFocus={handleInputFocus}
          className="mb-7 border px-5 py-3 outline-none"
          required
          rows="7"
          aria-required="true"
          aria-label="Your message"
        />

        {/* Consent checkbox with custom styling */}
        <div className="relative mb-7 flex items-start">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              id="consent"
              checked={checked}
              required
              onChange={handleChange}
              className="h-[22px] w-[22px] cursor-pointer appearance-none rounded border border-[#E8E8EB] bg-[#E8E8EB] text-black checked:border-[#E8E8EB] checked:bg-[#E8E8EB] focus:ring-0"
              aria-required="true"
              aria-checked={checked}
              aria-label="Consent to data processing"
            />
            {/* Custom checkmark icon */}
            <svg
              className={`pointer-events-none absolute left-[1px] top-[1px] h-5 w-5 font-bold ${checked ? "block" : "hidden"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <label htmlFor="consent" className="ml-2 text-sm leading-5">
            I explicitly provide consent to OchaHouse Ltd and any associated
            companies to store and process personal data for providing service.
          </label>
        </div>

        {/* Submit button */}
        <FormButton
          className="mx-auto rounded bg-[#E8E8EB] p-2 px-9 py-4 text-sm font-bold uppercase duration-500 hover:bg-accent"
          aria-label="Send message"
        >
          send message
        </FormButton>
      </form>

      {/* Display form submission status message */}
      {message && (
        <div
          className="mt-5 flex justify-center text-secondary"
          role="status" // Indicates this is a status message
        >
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
