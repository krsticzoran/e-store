"use client";

import FormButton from "../ui/form-button";
import { useFormState } from "react-dom";
import { updateUserAction } from "@/action/update-user-action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountForm({ user, id }) {
  // Use useFormState to manage server state and bind user ID to the action
  const [state, formAction] = useFormState(updateUserAction.bind(null, id), {
    success: null,
    message: "",
  });

  const router = useRouter();

  // Local message state for displaying feedback client-side
  const [clientMessage, setClientMessage] = useState("");

  // Clear client message on input focus
  const handleFocus = () => {
    if (clientMessage) {
      setClientMessage(""); // Clear message on focus
    }
  };

  // Sync client message with server state message
  useEffect(() => {
    setClientMessage(state.message || "");
    if (state?.success) {
      router.refresh(); // Refreshes server components on success
    }
  }, [state, router]);

  return (
    <>
      <form action={formAction} className="mt-10 text-primary">
        <div className="flex flex-col">
          <h2 className="mb-5 font-youngSerif text-2xl leading-8">
            Personal Information (required)
          </h2>

          <label className="text-primary text-opacity-50" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={user.email || ""}
            disabled
            className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
            aria-label="Email address"
          />
          <div className="flex gap-x-3">
            <div className="flex flex-col">
              <label
                htmlFor="first_name"
                className="text-primary text-opacity-50"
              >
                First name
              </label>
              <input
                id="first_name"
                type="text"
                name="first_name"
                defaultValue={user.first_name || ""}
                className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                onFocus={handleFocus}
                aria-label="First name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="last_name"
                className="text-primary text-opacity-50"
              >
                Last name
              </label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                defaultValue={user.last_name || ""}
                className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                onFocus={handleFocus}
                aria-label="Last name"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="mb-5 mt-8 font-youngSerif text-2xl leading-8">
            Billing Information
          </h2>
          <div className="flex gap-x-3">
            <div className="flex flex-col">
              <label htmlFor="address" className="text-primary text-opacity-50">
                Address
              </label>
              <input
                id="address"
                type="text"
                name="address"
                defaultValue={user.billing.address_1 || ""}
                className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                onFocus={handleFocus}
                aria-label="Street address"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-primary text-opacity-50">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                defaultValue={user.billing.city || ""}
                className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                onFocus={handleFocus}
                aria-label="City"
              />
            </div>
          </div>
          <label htmlFor="country" className="text-primary text-opacity-50">
            Country
          </label>
          <input
            id="country"
            type="text"
            name="country"
            defaultValue={user.billing.country || ""}
            className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
            onFocus={handleFocus}
            aria-label="Country"
          />

          <label htmlFor="phone" className="text-primary text-opacity-50">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            defaultValue={user.billing.phone || ""}
            className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
            onFocus={handleFocus}
            aria-label="Phone number"
          />
        </div>
        <FormButton className="mt-6 w-full bg-primary py-4 text-sm font-bold uppercase tracking-[1px] text-white duration-500 hover:bg-secondary">
          Save Changes
        </FormButton>
      </form>
      {/* Display server response message */}
      {clientMessage && (
        <p className="mt-4 text-sm text-secondary" role="alert">
          {clientMessage}
        </p>
      )}
    </>
  );
}
