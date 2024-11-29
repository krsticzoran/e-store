"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFormState } from "react-dom";
import { auth } from "@/action/auth-action";

export default function Account() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [state, formAction] = useFormState(auth.bind(null, mode), {});

  useEffect(() => {
    if (!mode) {
      router.replace("/account?mode=login");
    }
  }, [mode, router]);

  return (
    <>
      {mode === "login" && (
        <div>
          <p>login</p>
          <form action={formAction}>
            <input type="textclea" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
          </form>
          <Link href={"/account?mode=signup"}>sign up</Link>
        </div>
      )}
      {mode === "signup" && (
        <div>
          <p>sign up</p>
          <form action={formAction}>
            <input type="text" placeholder="username" name="username" />
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <input
              type="password"
              placeholder="confirm password"
              name="confirm"
            />
            <button>Sign up</button>
          </form>
          <Link href={"/account?mode=login"}>login</Link>
        </div>
      )}
    </>
  );
}
