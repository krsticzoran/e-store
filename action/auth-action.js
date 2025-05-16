"use server";

export async function login(prevState, formData) {
  const password = formData.get("password");
  const email = formData.get("email");

  try {
    const response = await fetch(
      `https://estore.zkrstic.com/wp-json/jwt-auth/v1/token`, // JWT authentication endpoint
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
      // Login failed
      console.error("Login failed:", data);
      return {
        success: false,
        message: data.message || "Invalid email or password",
      };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      message: "An error occurred during login",
    };
  }
}

export async function signUp(prevState, formData) {
  const adminUser = process.env.WP_ADMIN_USERNAME;
  const adminPassword = process.env.WP_APP_PASSWORD;
  const basicAuth = Buffer.from(`${adminUser}:${adminPassword}`).toString(
    "base64",
  );

  const name = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `https://estore.zkrstic.com/wp-json/wp/v2/users`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          roles: ["customer"],
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Registration successful:", data);
      return {
        success: true,
        user: data,
        message: `welcome ${data.name || data.user_nicename || name}`,
      };
    } else {
      console.error("Registration failed:", data);
      return {
        success: false,
        message: data.message || "Error occurred during registration",
      };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signUp(prevState, formData);
}
