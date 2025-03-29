export const proceedToCheckout = (cart, router) => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  router.push("/checkout");
};
