"use server";

// Import validation schemas
import { loginSchema, signUpSchema } from "@/schemas/auth";

// Login function
export async function login(prevState, formData) {
  // Extract form fields
  const password = formData.get("password");
  const email = formData.get("email");

  // Validate input using loginSchema
  const result = loginSchema.safeParse({ email, password });

  // If validation fails, return first error message
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return {
      success: false,
      message: firstIssue.message,
    };
  }

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
      console.log("Login successful:", data);
      return {
        success: true,
        token: data.token,
        user: data.user_email,
        message: `welcome ${data.user_nicename}`,
      };
    } else {
      // Login failed on server
      console.error("Login failed:", data);
      return {
        success: false,
        message: data.message || "Invalid email or password",
      };
    }
  } catch (error) {
    // Catch unexpected errors
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
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
  const name = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate input using signUpSchema
  const result = signUpSchema.safeParse({ email, password, name });

  // If validation fails, return first error message
  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return {
      success: false,
      message: firstIssue.message,
    };
  }

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
      console.log("Registration successful:", data);
      return {
        success: true,
        user: data,
        message: `welcome ${data.name || data.user_nicename || name}`,
      };
    } else {
      // Registration failed on server
      console.error("Registration failed:", data);
      return {
        success: false,
        message: data.message || "Error occurred during registration",
      };
    }
  } catch (error) {
    // Catch unexpected errors
    console.error("Error registering user:", error);
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
