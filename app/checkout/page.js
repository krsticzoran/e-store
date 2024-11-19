import { getNames } from "country-list";

export default function Checkout() {
  const countries = getNames();
  return (
    <>
      <h1>Checkout</h1>
      <h3>Contact information</h3>
      <p>
        We'll use this email to send you details and updates about your order.
      </p>
      <input type="email" name="email" placeholder="Email address" />
      <p>Shipping address</p>
      <p>Enter the address where you want your order delivered.</p>
      <select>
        <option value="" disabled>
          Choose a country
        </option>
        {countries.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <input type="first name" name="first name" placeholder="First name" />
      <input type="last name" name="last name" placeholder="last name" />
    </>
  );
}
