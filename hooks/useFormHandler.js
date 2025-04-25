import { useFormState } from "react-dom";
import { useRef, useEffect, useState } from "react";

export default function useFormHandler(action) {
  const [state, formAction] = useFormState(action, { message: "" });

  // Local state for displaying form messages/errors
  const [message, setMessage] = useState();

  // Ref to access the form DOM element
  const ref = useRef(null);

  useEffect(() => {
    // If submission was successful, reset the form
    if (state.success) {
      ref.current?.reset(); // Safe optional chaining
    }
    // Update message from form submission response
    setMessage(state.message);
  }, [state]);

  // Clears message when user focuses on an input
  const handleInputFocus = () => {
    setMessage("");
  };
  return { ref, message, handleInputFocus, formAction };
}
