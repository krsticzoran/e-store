"use server";

import { setTokenCookie } from "@/utils/auth/set-token-cookie";
import validationForm from "@/schemas/auth";

async function loginHelper(email, password) {
  try {
    // Send login request to WordPress JWT endpoint
    const response = await fetch(
      `https://estore.zkrstic.com/wp-json/jwt-auth/v1/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      // Login successful

      await setTokenCookie(data.token);
      return {
        success: true,
        message: `welcome ${data.name || data.user_nicename}`,
      };
    } else {
      // Login failed on server
      return {
        success: false,
        message: "Invalid email or password",
      };
    }
  } catch (error) {
    // Catch unexpected errors
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}

// Login function
export async function login(prevState, formData) {
  // Extract form fields
  const { email, password } = Object.fromEntries(formData);

  // Validate input using loginSchema
  const error = validationForm("login", { email, password });
  // If validation fails, return first error message
  if (error) return error;

  return await loginHelper(email, password);
}

// Signup function
export async function signUp(prevState, formData) {
  // Admin credentials (used for Basic Auth)
  const adminUser = process.env.WP_ADMIN_USERNAME;
  const adminPassword = process.env.WP_APP_PASSWORD;
  const basicAuth = Buffer.from(`${adminUser}:${adminPassword}`).toString(
    "base64",
  );

  // Extract form fields

  const {
    email,
    password,
    username: name,
    confirm,
  } = Object.fromEntries(formData);

  // Validate input using signUpSchema
  const error = validationForm("signup", { email, password, name, confirm });
  // If validation fails, return first error message
  if (error) return error;

  try {
    // Send signup request to WordPress REST API
    const response = await fetch(
      `https://estore.zkrstic.com/wp-json/wp/v2/users`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`, // Admin Basic Auth
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          roles: ["customer"], // Assign custom role
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      // Registration successful
      // auto login user
      await loginHelper(email, password);

      return {
        success: true,
        message: `welcome ${data.name || data.user_nicename}`,
      };
    } else {
      // Registration failed on server
      return {
        success: false,
        message: data.message || "Error occurred during registration",
      };
    }
  } catch (error) {
    // Catch unexpected errors
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}

// Wrapper function to decide between login and signup
export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signUp(prevState, formData);
}
