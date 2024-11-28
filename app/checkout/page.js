"use client";
import { useState, useEffect } from "react";
import { getNames } from "country-list";
import getCartItems from "@/lib/get-cart-items";
import Image from "next/image";
import calculateTotal from "@/utils/calculate-total";
import { submitOrder } from "@/action/submit-order-action";

export default function Checkout() {
  const [countries, setCountries] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCountries(getNames());
    const savedCart = getCartItems();
    setCart(savedCart);
    setTotal(calculateTotal(savedCart));
  }, []);

  return (
    <>
      <form action={submitOrder.bind(null, cart)}>
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

        <button>Place Order</button>
      </form>
      <div>
        <p>Order summary</p>
        {cart.map((product) => (
          <div key={product.id}>
            <Image
              src={product.images[0].src}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <p>{product.name}</p>
            <p>{product.amount}</p>
            <p> {product.price}</p>
            <p>{product.amount * product.price}</p>
          </div>
        ))}
        <p>total : {total}</p>
      </div>
    </>
  );
}
