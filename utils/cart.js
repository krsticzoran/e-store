// calculate total amount of cart
export function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.amount, 0);
}

// get cart items from localStorage
export function getCartItems() {
  const savedCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return savedCart;
}

export const handleQuantityChange = (cart, product, action = "increment") => {
  let productExists = false;

  const updatedCart = cart.map((cartProduct) => {
    if (cartProduct.id === product.id) {
      productExists = true;
      if (action === "increment") {
        return {
          ...cartProduct,
          amount: cartProduct.amount + 1,
        };
      } else if (action === "decrement" && cartProduct.amount >= 0) {
        return {
          ...cartProduct,
          amount: cartProduct.amount - 1,
        };
      }
    }
    return cartProduct;
  });

  if (!productExists) {
    updatedCart.push({ ...product, amount: 1 });
  }

  return updatedCart;
};
