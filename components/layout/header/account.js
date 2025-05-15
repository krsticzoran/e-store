"use client";
import { useState, useEffect } from "react";
import ModalWrapper from "@/components/ui/modal-wrapper";
import { getNavLinksClass } from "@/utils/utils";
import useEscapeKey from "@/hooks/useEscapeKey";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { auth } from "@/action/auth-action";

export default function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode");

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
          className="relative z-50 w-full max-w-sm rounded-xl bg-white p-8 shadow-xl"
          role="dialog"
          aria-modal="true"
        >
          {/* Login Modal */}
          {mode === "login" && (
            <>
              <form action={formAction}>
                <input
                  className="mb-4 w-full rounded border border-gray-300 px-4 py-2"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  aria-label="Email"
                />
                <input
                  className="mb-6 w-full rounded border border-gray-300 px-4 py-2"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  aria-label="Password"
                />
                <button
                  type="submit"
                  className="w-full rounded bg-black py-2 text-white transition hover:bg-gray-800"
                  aria-label="Login"
                >
                  Login
                </button>
              </form>
              <p
                onClick={() => switchMode("signup")}
                className="mt-4 cursor-pointer text-sm text-blue-600 hover:underline"
                aria-label="Switch to signup form"
              >
                Don&apos;t have an account? Sign up
              </p>
            </>
          )}

          {/* Sign Up Modal */}
          {mode === "signup" && (
            <>
              <form action={formAction}>
                <input
                  className="mb-4 w-full rounded border border-gray-300 px-4 py-2"
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  aria-label="Email"
                />
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  className="mb-6 w-full rounded border border-gray-300 px-4 py-2"
                  required
                  aria-label="Username"
                />
                <input
                  className="mb-6 w-full rounded border border-gray-300 px-4 py-2"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  aria-label="Password"
                />
                <input
                  className="mb-6 w-full rounded border border-gray-300 px-4 py-2"
                  type="password"
                  placeholder="confirm password"
                  name="confirm"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded bg-black py-2 text-white transition hover:bg-gray-800"
                  aria-label="Sign up"
                >
                  Sign up
                </button>
              </form>
              <p
                onClick={() => switchMode("login")}
                className="mt-4 cursor-pointer text-sm text-blue-600 hover:underline"
                aria-label="Switch to login form"
              >
                Already have an account? Login
              </p>
            </>
          )}
          {/* Display server response message */}
          {state && state.message && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {state.message}
            </p>
          )}
        </div>
      </ModalWrapper>
    </>
  );
}
