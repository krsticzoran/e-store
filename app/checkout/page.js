"use client";
import { useState, useEffect } from "react";
import { getNames } from "country-list";
import { getCartItems, calculateTotal } from "@/utils/cart";
import { submitOrder } from "@/action/submit-order-action";
import Container from "@/components/ui/container";
import FormButton from "@/components/ui/form-button";

export default function Checkout() {
  const [countries, setCountries] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load countries and cart items on component mount
  useEffect(() => {
    setCountries(getNames());
    const savedCart = getCartItems();
    setCart(savedCart);
    setTotal(calculateTotal(savedCart));
  }, []);

  return (
    <Container>
      <div className="mx-auto max-w-[1280px] px-5 py-16 text-primary lg:flex xl:px-0">
        {/* Order form */}
        <form
          action={submitOrder.bind(null, cart)}
          className="basis-2/3 lg:pr-10 xl:pr-20"
        >
          <h2 className="mb-5 pt-4 font-youngSerif text-xl leading-8 md:text-2xl">
            Shipping Information (required)
          </h2>

          {/* First and Last name inputs */}
          <div className="flex gap-x-3">
            <div className="w-full">
              <label
                className="text-primary text-opacity-50"
                htmlFor="first_name"
              >
                First name
              </label>
              <input
                id="first_name"
                aria-required="true"
                aria-label="Your first name"
                type="text"
                name="firstName"
                className="mb-5 w-full border bg-white px-5 py-3 outline-none"
                required
              />
            </div>
            <div className="w-full">
              <label
                className="text-primary text-opacity-50"
                htmlFor="last_name"
              >
                Last name
              </label>
              <input
                id="last_name"
                aria-required="true"
                aria-label="Your last name"
                type="text"
                name="lastName"
                className="mb-5 w-full border bg-white px-5 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Email input */}
          <label className="text-primary text-opacity-50" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            className="mb-5 w-full border bg-white px-5 py-3 outline-none"
            aria-required="true"
            aria-label="Your email address"
          />

          {/* Address, City, Country dropdown */}
          <div className="gap-x-3 md:flex">
            <div className="w-full">
              <label className="text-primary text-opacity-50" htmlFor="address">
                Your street address
              </label>
              <input
                id="address"
                type="text"
                name="address1"
                required
                className="mb-5 w-full border bg-white px-5 py-3 outline-none"
                aria-required="true"
                aria-label="Your address"
              />
            </div>
            <div className="w-full">
              <label className="text-primary text-opacity-50" htmlFor="city">
                Your city
              </label>
              <input
                id="city"
                type="text"
                name="city"
                required
                className="mb-5 w-full border bg-white px-5 py-3 outline-none"
                aria-required="true"
                aria-label="Your city"
              />
            </div>
            <div className="w-full">
              <label className="text-primary text-opacity-50" htmlFor="country">
                Your country
              </label>
              <select
                id="country"
                name="country"
                required
                className="mb-5 w-full appearance-none border bg-white px-5 py-3 outline-none"
                aria-required="true"
                aria-label="Your country"
              >
                <option value="">Choose a country</option>
                {countries.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ZIP and phone */}
          <div className="flex gap-x-3">
            <div className="w-full">
              <label
                className="text-primary text-opacity-50"
                htmlFor="postcode"
              >
                Your postcode / ZIP
              </label>
              <input
                id="postcode"
                type="text"
                name="postcode"
                required
                className="mb-5 w-full border bg-white px-5 py-3 outline-none"
                aria-required="true"
                aria-label="Your postcode"
              />
            </div>
            <div className="w-full">
              <label className="text-primary text-opacity-50" htmlFor="phone">
                Your phone number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                className="mb-5 w-full border bg-white px-5 py-3 outline-none"
                aria-required="true"
                aria-label="Your phone"
              />
            </div>
          </div>

          {/* Submit button */}
          <FormButton className="mt-6 bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[1px] text-white duration-500 hover:bg-secondary">
            Place Order
          </FormButton>
        </form>

        {/* Order summary */}
        <div className="mt-[88px] basis-1/3">
          <div className="bg-[#F4F4F4] px-5 pt-4 text-primary">
            <p className="mb-5 text-center font-youngSerif text-lg leading-8 md:text-xl">
              Order summary
            </p>

            {/* List of products in cart */}
            <ul className="border-b-[0.5px] border-primary">
              {cart.map((product) => (
                <li className="pt-2" key={product.id}>
                  <div className="flex justify-between">
                    <div className="flex">
                      <p className="pr-4">{product.name} </p>
                    </div>
                    <p className="text-left">
                      {(product.amount * product.price).toFixed(2)} $
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total price */}
            <p className="py-4 font-bold uppercase tracking-[1px]">
              total :{" "}
              <span className="text-secondary">{total.toFixed(2)} $</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
