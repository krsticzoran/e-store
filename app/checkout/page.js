"use client";
import { useState, useEffect, useRef } from "react";
import { getNames } from "country-list";
import { getCartItems, calculateTotal } from "@/utils/cart";
import { submitOrder } from "@/action/submit-order-action";
import Container from "@/components/ui/container";
import FormButton from "@/components/ui/form-button";
import { useFormState } from "react-dom";
import OrderSummary from "@/components/account/order-summary";
import InputField from "@/components/account/input-field";
import CountryPicker from "@/components/account/country-picker";

export default function Checkout() {
  const ref = useRef(null);
  const [countries, setCountries] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [state, formAction] = useFormState(submitOrder.bind(null, cart), {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      // Reset form fields when submission succeeds
      ref.current?.reset();

      // Clear cart from localStorage and reset local state
      localStorage.removeItem("cart");
      setCart([]);
      setTotal(0);
    }
    setMessage(state.message);
  }, [state]);

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
        <div className="basis-2/3">
          {/* Order form */}
          <form action={formAction} className="lg:pr-10 xl:pr-20" ref={ref}>
            <h2 className="mb-5 pt-4 font-youngSerif text-xl leading-8 md:text-2xl">
              Shipping Information (required)
            </h2>

            {/* First and Last name inputs */}
            <div className="flex gap-x-3">
              <div className="w-full">
                <InputField
                  label="Your first name"
                  name="firstName"
                  onFocus={() => setMessage("")}
                  id="first_name"
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Your last name"
                  name="lastName"
                  onFocus={() => setMessage("")}
                  id="last_name"
                />
              </div>
            </div>

            {/* Email input */}
            <InputField
              label="Your email address"
              name="email"
              onFocus={() => setMessage("")}
              id="email"
              type="email"
            />

            {/* Address, City, Country dropdown */}
            <div className="gap-x-3 md:flex">
              <div className="w-full">
                <InputField
                  label="Your address"
                  name="address1"
                  onFocus={() => setMessage("")}
                  id="address"
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Your city"
                  name="city"
                  onFocus={() => setMessage("")}
                  id="city"
                />
              </div>
              <div className="w-full">
                <CountryPicker
                  countries={countries}
                  onFocus={() => setMessage("")}
                />
              </div>
            </div>

            {/* ZIP and phone */}
            <div className="flex gap-x-3">
              <div className="w-full">
                <InputField
                  label="Your postcode"
                  name="postcode"
                  onFocus={() => setMessage("")}
                  id="postcode"
                />
              </div>
              <div className="w-full">
                <InputField
                  label="Your phone"
                  name="phone"
                  onFocus={() => setMessage("")}
                  id="phone"
                  type="tel"
                />
              </div>
            </div>

            {/* Submit button */}
            <FormButton className="mt-6 bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[1px] text-white duration-500 hover:bg-secondary">
              Place Order
            </FormButton>
          </form>
          {message && (
            <p className="mt-4 text-sm text-secondary" role="alert">
              {message}
            </p>
          )}
        </div>
        
        {/* Order summary */}
        <OrderSummary cart={cart} total={total} />
      </div>
    </Container>
  );
}
