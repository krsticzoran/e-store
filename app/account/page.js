"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Account() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

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
          <form>
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
          </form>
          <Link href={"/account?mode=signup"}>sign up</Link>
        </div>
      )}
      {mode === "signup" && (
        <div>
          <p>sign up</p>
          <form>
            <input type="text" placeholder="username" name="username" />
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <input
              type="password"
              placeholder="confirm password"
              name="confirm"
            />
          </form>
          <Link href={"/account?mode=login"}>login</Link>
        </div>
      )}
    </>
  );
}
