"use client";

export default function AddToCartButton({ product }) {
  const handleAddToCart = () => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    let productExists = false;

    const updatedCart = cart.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        productExists = true;
        return {
          ...cartProduct,
          amount: cartProduct.amount + 1,
          totalPrice: (cartProduct.amount + 1) * cartProduct.price,
        };
      }
      return cartProduct;
    });

    if (!productExists) {
      updatedCart.push({ ...product, amount: 1, totalPrice: product.price });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return <button onClick={handleAddToCart}>Add to Cart</button>;
}
