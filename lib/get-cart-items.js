export default function getCartItems() {
  const savedCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return savedCart;
}
