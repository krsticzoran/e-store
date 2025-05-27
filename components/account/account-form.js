"use client";

import { useState, useEffect } from "react";
import FormButton from "../ui/form-button";

export default function AccountForm({ user }) {
  return (
    <form className="mt-20 flex flex-col">
      <label>Email</label>
      <input type="email" disabled />
      <label>First name:</label>
      <input type="text" name="first_name" />
      <label>Last name:</label>
      <input type="text" name="last_name" />
      <label>Address:</label>
      <input type="text" name="address" />
      <label>City:</label>
      <input type="text" name="city" />
      <label>Country:</label>
      <input type="text" name="country" />
      <label>Phone:</label>
      <input type="text" name="phone" />
      <FormButton>Save Changes</FormButton>
    </form>
  );
}
