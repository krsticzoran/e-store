"use client";
import { useState, useEffect } from "react";
import { getNames } from "country-list";
import { getCartItems, calculateTotal } from "@/utils/cart";
import Image from "next/image";
import { submitOrder } from "@/action/submit-order-action";
import Container from "@/components/ui/container";
import FormButton from "@/components/ui/form-button";

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
    <Container>
      <div className="mx-auto max-w-[1280px] px-5 pt-20 text-primary lg:flex xl:px-0">
        <form
          action={submitOrder.bind(null, cart)}
          className="basis-2/3 lg:pr-10 xl:pr-20"
        >
          <h2 className="mb-5 font-youngSerif text-xl leading-8 md:text-2xl">
            Shipping Information (required)
          </h2>
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
          <FormButton className="mt-6 bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[1px] text-white duration-500 hover:bg-secondary">
            Place Order
          </FormButton>
        </form>
        <div className="basis-1/3 bg-[#F4F4F4]">
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
      </div>
    </Container>
  );
}
