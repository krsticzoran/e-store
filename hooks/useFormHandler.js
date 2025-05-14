import { useFormState } from "react-dom";
import { useRef, useEffect, useState } from "react";

export default function useFormHandler(action) {
  const [state, formAction] = useFormState(action, { message: "" });

  // Local state for displaying form messages/errors
  const [message, setMessage] = useState();

  // Tracks whether form was successfully submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ref to access the form DOM element
  const ref = useRef(null);

  useEffect(() => {
    if (state.success) {
      // Reset form fields when submission succeeds
      ref.current?.reset();
      // Set submission flag for UI feedback
      setIsSubmitted(true);
    } else {
      // Ensure submission flag is reset on errors
      setIsSubmitted(false);
    }
    // Update displayed message (success or error)
    setMessage(state.message);
  }, [state]);

  // Clears message when user focuses on an input
  const handleInputFocus = () => {
    setMessage("");
    setIsSubmitted(false);
  };
  return { ref, message, handleInputFocus, formAction, isSubmitted };
}
