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
      <form action={formAction} className="mt-20 flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          defaultValue={user.email || ""}
          disabled
          className="rounded border px-2 py-1"
          aria-label="Email address"
        />

        <label htmlFor="first_name">First name</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          defaultValue={user.first_name || ""}
          className="rounded border px-2 py-1"
          onFocus={handleFocus}
          aria-label="First name"
        />

        <label htmlFor="last_name">Last name</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          defaultValue={user.last_name || ""}
          className="rounded border px-2 py-1"
          onFocus={handleFocus}
          aria-label="Last name"
        />

        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          defaultValue={user.billing.address_1 || ""}
          className="rounded border px-2 py-1"
          onFocus={handleFocus}
          aria-label="Street address"
        />

        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          name="city"
          defaultValue={user.billing.city || ""}
          className="rounded border px-2 py-1"
          onFocus={handleFocus}
          aria-label="City"
        />

        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          name="country"
          defaultValue={user.billing.country || ""}
          className="rounded border px-2 py-1"
          onFocus={handleFocus}
          aria-label="Country"
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          defaultValue={user.billing.phone || ""}
          className="rounded border px-2 py-1"
          onFocus={handleFocus}
          aria-label="Phone number"
        />

        <FormButton>Save Changes</FormButton>
      </form>
      {clientMessage && <p role="alert">{clientMessage}</p>}
    </>
  );
}
