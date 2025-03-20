"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  calculateTotal,
  getCartItems,
  handleQuantityChange,
  handleRemoveItem,
} from "@/utils/cart";
import { proceedToCheckout } from "@/utils/checkout";

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
  const handleUpdateCart = (product, action) => {
    const updatedCart = handleQuantityChange(cart, product, action);

    // remove product if amount is 0
    const filteredCart = updatedCart.filter((product) => product.amount !== 0);

    // Update localStorage and state
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
    setTotal(calculateTotal(filteredCart)); // Recalculate total
  };

  // Handle removing item from cart
  const handleRemoveProduct = (id) => {
    const updatedCart = handleRemoveItem(cart, id, setCart);
    setTotal(calculateTotal(updatedCart)); // Recalculate total
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
                <button onClick={() => handleUpdateCart(product, "decrement")}>
                  -
                </button>
                <span>{product.amount}</span>
                <button onClick={() => handleUpdateCart(product, "increment")}>
                  +
                </button>
              </div>
              <button onClick={() => handleRemoveProduct(product.id)}>
                Remove Item
              </button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${total}</p>
      <button onClick={proceedToCheckout.bind(null, cart, router)}>
        Proceed to Checkout
      </button>
    </div>
  );
}
