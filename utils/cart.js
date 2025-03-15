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
