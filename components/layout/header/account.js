"use client";
import { useState, useEffect, useRef } from "react";
import ModalWrapper from "@/components/ui/modal-wrapper";
import { getNavLinksClass } from "@/utils/utils";
import useEscapeKey from "@/hooks/useEscapeKey";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { auth } from "@/action/auth-action";

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

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [isOpen, mode, pathname, router, searchParams]);

  // Toggle modal open/close
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Close modal on Escape key press
  useEscapeKey(() => setIsOpen(false));

  // Reset form if submission was successful
  useEffect(() => {
    if (state.success) ref.current?.reset();
  }, [state]);

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
      <button aria-label="Open account modal" onClick={toggleModal}>
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
          <>
            <form action={formAction} className="text-primary" ref={ref}>
              <div className="relative mb-10 flex w-full justify-center">
                <h4 className="font-youngSerif text-2xl leading-8">
                  {mode === "login" ? "Login" : "Register"}
                </h4>
                {/* close button */}
                <div className="absolute right-0">
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close modal"
                  >
                    <i
                      className="fa-solid fa-xmark text-xl text-primary opacity-75"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>

              {/* Email */}
              <input
                className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                type="email"
                placeholder="Email"
                name="email"
                required
                aria-label="Email"
                onChange={handleInputChange}
              />

              {/* Username only for signup */}
              {mode === "signup" && (
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                  required
                  aria-label="Username"
                  onChange={handleInputChange}
                />
              )}

              {/* Password */}
              <input
                className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                type="password"
                placeholder="Password"
                name="password"
                required
                aria-label="Password"
                onChange={handleInputChange}
              />

              {/* Confirm password only for signup */}
              {mode === "signup" && (
                <input
                  className="mb-5 w-full bg-[#F4F4F4] px-4 py-2 text-lg focus:outline-none focus:ring-0"
                  type="password"
                  placeholder="Confirm password"
                  name="confirm"
                  required
                  onChange={handleInputChange}
                />
              )}

              {/* Submit button - login & signup */}
              <button
                type="submit"
                className="mt-6 w-full bg-primary py-4 text-sm font-bold uppercase tracking-[1px] text-white duration-500 hover:bg-secondary"
                aria-label={mode === "login" ? "Login" : "Sign up"}
              >
                {mode === "login" ? "Login" : "Sign up"}
              </button>
            </form>

            {/* Switch to login & signup form */}
            <p
              onClick={
                mode === "login"
                  ? () => switchMode("signup")
                  : () => switchMode("login")
              }
              className="mb-7 mt-[18px] cursor-pointer text-sm"
              aria-label={`Switch to ${mode === "login" ? "signup" : "login"} form`}
            >
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <span className="font-bold">Sign up</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="font-bold">Login</span>
                </>
              )}
            </p>
          </>

          {/* Display server response message */}
          {localMessage && (
            <p className="mt-4 text-sm text-secondary" role="alert">
              {localMessage}
            </p>
          )}
        </div>
      </ModalWrapper>
    </>
  );
}
