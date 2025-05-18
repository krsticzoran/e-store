"use client";
import { forwardRef } from "react";
import FormButton from "./form-button";

const AuthForm = forwardRef(function AuthForm(
  { mode, formAction, localMessage, handleInputChange, onClose, switchMode },
  ref,
) {
  return (
    <>
      {/* Login & Signup Modal */}
      <form action={formAction} className="text-primary" ref={ref}>
        <div className="relative mb-10 flex w-full justify-center">
          <h4 className="font-youngSerif text-2xl leading-8">
            {mode === "login" ? "Login" : "Register"}
          </h4>
          {/* close button */}
          <div className="absolute right-0">
            <button onClick={onClose} aria-label="Close modal" type="button">
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
        <FormButton className="mt-6 w-full bg-primary py-4 text-sm font-bold uppercase tracking-[1px] text-white duration-500 hover:bg-secondary">
          {mode === "login" ? "Login" : "Sign up"}
        </FormButton>
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
            Already have an account? <span className="font-bold">Login</span>
          </>
        )}
      </p>

      {/* Display server response message */}
      {localMessage && (
        <p className="mt-4 text-sm text-secondary" role="alert">
          {localMessage}
        </p>
      )}
    </>
  );
});

export default AuthForm;
