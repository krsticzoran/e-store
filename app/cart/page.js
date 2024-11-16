"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCart(savedCart);
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <Image
                src={product.images[0].src}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <p>Product ID: {product.id}</p>
              <p>Product Amount: {product.amount}</p>
              <p>Product Name: {product.name}</p>
              <p>Total Price: ${product.totalPrice}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
