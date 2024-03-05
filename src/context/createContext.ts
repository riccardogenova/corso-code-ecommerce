import { createContext } from "react";
import { TContext } from "../declarations";

export const AppContext = createContext<TContext>({
  username: "",
  products: [],
  cart: [],
  paid: false,
  addToCart: () => {},
  removeFromCart: () => {},
  checkout: () => {},
  getTotalProductInCart: () => 0,
  onCheckoutSuccess: () => {},
  getTotalAvailableProduct: () => 0,
  login: () => {},
  logout: () => {},
});
