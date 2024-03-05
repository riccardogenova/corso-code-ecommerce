import { StateReducer, ActionType } from "./declarations";

export function reducer(
  state: StateReducer,
  action: { type: ActionType; payload?: any }
) {
  console.log(action);
  console.log(state);
  let productFound;
  switch (action.type) {
    case "set-products":
      return { ...state, products: action.payload };
    case "checkout":
      return { ...state, paid: true, cart: [] };
    case "checkout-success":
      return { ...state, paid: false };
    case "logout":
      localStorage.removeItem("username");
      return { ...state, username: "" };
    case "login":
      localStorage.setItem("username", action.payload);
      return { ...state, username: action.payload };
    case "add-to-cart":
      productFound = state.cart.find(
        (productCart) => action.payload.product.id === productCart.prod.id
      );
      if (!productFound)
        return {
          ...state,
          cart: [
            ...state.cart,
            { prod: action.payload.product, qty: action.payload.num },
          ],
        };
      const newCart = state.cart.map((productCart) =>
        action.payload.product.id === productCart.prod.id
          ? { ...productCart, qty: productCart.qty + action.payload.num }
          : { ...productCart }
      );
      return { ...state, cart: newCart };
    case "remove-from-cart":
      productFound = state.cart.find(
        (cartProduct) => cartProduct.prod.id === action.payload.idProduct
      );
      if (!!productFound && productFound.qty === 1) {
        const newCart = state.cart.filter(
          (productCart) => productCart.prod.id !== action.payload.idProduct
        );
        return { ...state, cart: newCart };
      }
      if (!!productFound && productFound.qty > 1) {
        const newCart = state.cart.map((cartProduct) => {
          if (action.payload.idProduct === cartProduct.prod.id)
            return { ...cartProduct, qty: cartProduct.qty - 1 };
          return cartProduct;
        });
        return { ...state, cart: newCart };
      }
      return state;
    default:
      return state;
  }
}
