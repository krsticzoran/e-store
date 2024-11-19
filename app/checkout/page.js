import { getNames } from "country-list";

export default function Checkout() {
  const countries = getNames();

  return (
    <form>
      <h1>Checkout</h1>

      <h3>Contact Information</h3>
      <p>
        We'll use this email to send you details and updates about your order.
      </p>
      <input type="email" name="email" placeholder="Email address" required />

      <h3>Shipping Address</h3>
      <p>Enter the address where you want your order delivered.</p>
      <select name="country" required>
        <option value="" disabled>
          Choose a country
        </option>
        {countries.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <input type="text" name="firstName" placeholder="First name" required />
      <input type="text" name="lastName" placeholder="Last name" required />
      <input
        type="text"
        name="address1"
        placeholder="Address line 1"
        required
      />
      <input
        type="text"
        name="address2"
        placeholder="Address line 2 (optional)"
      />
      <input type="text" name="city" placeholder="City" required />
      <input
        type="text"
        name="state"
        placeholder="State / Province / Region"
        required
      />
      <input
        type="text"
        name="postcode"
        placeholder="Postcode / ZIP"
        required
      />
      <input type="tel" name="phone" placeholder="Phone number" required />

      <button type="submit">Place Order</button>
    </form>
  );
}
