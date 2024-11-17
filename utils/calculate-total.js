export default function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.amount, 0);
}
