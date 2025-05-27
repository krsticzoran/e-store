"use client";
import { useState, useEffect, useRef } from "react";
import ModalWrapper from "@/components/ui/modal-wrapper";
import { getNavLinksClass } from "@/utils/utils";
import useEscapeKey from "@/hooks/useEscapeKey";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { auth } from "@/action/auth-action";
import AuthForm from "./auth-form";

export default function Account() {
  const [isOpen, setIsOpen] = useState(false); // Modal open/close state
  const [localMessage, setLocalMessage] = useState(""); // Local message state for temporary feedback

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode");
  const ref = useRef(null);

  // Form state connected to server action
  const [state, formAction] = useFormState(auth.bind(null, mode), {});

  // Switch between login and signup modes
  const switchMode = (mode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", mode);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  // Keep URL in sync with modal state and mode
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (isOpen) {
      params.set("mode", mode || "login");
    } else {
      params.delete("mode");
    }

    // Automatically close modal if user is already navigated to /account
    // This ensures the modal doesn't stay open after successful login/signup
    if (pathname.startsWith("/account")) setIsOpen(false);

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [isOpen, mode, pathname, router, searchParams]);

  // Function triggered when the user clicks the login/signup button
  async function handleAuthFlow() {
    try {
      // Send request to backend to validate the token
      const res = await fetch("/api/auth/validate");
      const { isValid } = await res.json();

      if (isValid) {
        // If the token is valid, redirect the user to the /account page
        router.replace("/account");
      } else {
        // If the token is invalid or missing, open the login/signup modal
        setIsOpen(true);
      }
    } catch (err) {
      // If an error occurs (e.g. network issue), also open the login/signup modal
      setIsOpen(true);
    }
  }

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Close modal on Escape key press
  useEscapeKey(() => setIsOpen(false));

  // Effect to handle successful form submission
  useEffect(() => {
    if (state.success) {
      // When form submission succeeds, reset the form fields
      ref.current?.reset();

      // Set a timeout to delay navigation by 1,5 second
      const timeoutId = setTimeout(() => {
        router.replace("/account");
      }, 1500);
      // Clear the timeout if the component unmounts or dependencies change
      return () => clearTimeout(timeoutId);
    }
  }, [state, router]);

  // Sync message from server state to local message
  useEffect(() => {
    if (state?.message) {
      setLocalMessage(state.message);
    }
  }, [state]);

  // Clear local message when user starts typing
  const handleInputChange = () => {
    if (localMessage) setLocalMessage("");
  };

  // Clear message when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setLocalMessage("");
    }
  }, [isOpen]);

  return (
    <>
      <button aria-label="Open account modal" onClick={handleAuthFlow}>
        <i
          className={`${getNavLinksClass(pathname)} fa fa-user`}
          aria-hidden="true"
        ></i>
      </button>
      <ModalWrapper
        isOpen={isOpen}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70"
          onClick={handleBackdropClick}
        />

        {/* Modal Content */}
        <div
          className="relative z-50 w-full max-w-[480px] bg-white px-7 py-9 shadow-xl"
          role="dialog"
          aria-modal="true"
        >
          {/* Login & Signup Modal */}

          <AuthForm
            ref={ref}
            mode={mode}
            formAction={formAction}
            localMessage={localMessage}
            handleInputChange={handleInputChange}
            onClose={() => setIsOpen(false)}
            switchMode={switchMode}
          />
        </div>
      </ModalWrapper>
    </>
  );
}
