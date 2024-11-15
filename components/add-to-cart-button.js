"use client";

export default function AddToCartButton({ product }) {
  const handleAddToCart = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const updatedCart = [...cart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
