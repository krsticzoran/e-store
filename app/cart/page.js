"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculateTotal, getCartItems } from "@/utils/cart";

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Load the cart data from localStorage
  useEffect(() => {
    const savedCart = getCartItems();
    setCart(savedCart);
    setTotal(calculateTotal(savedCart));
  }, []);

  // Handle quantity change (increment/decrement)
  const handleQuantityChange = (id, action) => {
    const updatedCart = cart.map((product) => {
      if (product.id === id) {
        const updatedProduct = { ...product };
        if (action === "increment") {
          updatedProduct.amount = updatedProduct.amount + 1;
        } else if (action === "decrement" && updatedProduct.amount > 1) {
          updatedProduct.amount = updatedProduct.amount - 1;
        }
        return updatedProduct;
      }
      return product;
    });

    // Update localStorage and state
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(calculateTotal(updatedCart)); // Recalculate total
  };

  // Handle removing item from cart
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);

    // Update localStorage and state
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotal(calculateTotal(updatedCart)); // Recalculate total
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <Image
                src={product.images[0].src}
                alt={product.name}
                width={100}
                height={100}
              />
              <p>Product ID: {product.id}</p>
              <p>Product Name: {product.name}</p>
              <p>Price: ${product.price}</p>
              <p>Product Amount: {product.amount}</p>

              <div>
                <button
                  onClick={() => handleQuantityChange(product.id, "decrement")}
                >
                  -
                </button>
                <span>{product.amount}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, "increment")}
                >
                  +
                </button>
              </div>
              <button onClick={() => handleRemoveItem(product.id)}>
                Remove Item
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${total}</p>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
