// calculate total amount of cart
export function calculateTotal(cart) {
  return cart?.reduce((total, item) => total + item.price * item.amount, 0);
}

// calculate total number of products in cart
export function calculateTotalNumberOfProduct(cart) {
  return cart?.reduce((total, item) => total + item.amount, 0);
}

// get cart items from localStorage
export function getCartItems() {
  const savedCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return savedCart;
}

// remove item from cart
export const handleRemoveItem = (cart, id, setCart) => {
  const updatedCart = cart?.filter((product) => product.id !== id);

  // Update localStorage and state
  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  return updatedCart;
};

// add product to cart or change quantity
export const handleQuantityChange = (cart, product,quantity, action = "increment") => {
  let productExists = false;

  const updatedCart = cart.map((cartProduct) => {
    if (cartProduct.id === product.id) {
      productExists = true;
      console.log(quantity)
      if (action === "increment") {
        return {
          ...cartProduct,
          amount: cartProduct.amount + quantity,
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
    updatedCart.push({ ...product, amount: quantity });
  }

  return updatedCart;
};
