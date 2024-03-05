import { ReactNode, useEffect, useReducer } from "react";
import { Product, StateReducer } from "../declarations";
import { utilityGetPreviousUsername } from "../utils";
import { reducer } from "../reducer";
import { AppContext } from "./createContext";

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    paid: false,
    username: utilityGetPreviousUsername(),
  } as StateReducer);

  async function getProducts() {
    const response = await fetch("https://mockend.up.railway.app/api/products");
    const data: Array<Product> = await response.json();
    dispatch({ type: "set-products", payload: data });
  }

  function getTotalProductInCart() {
    // @ts-ignore
    const total = state.cart.reduce((acc, productCart) => {
      return acc + productCart.qty;
    }, 0);
    return total;
  }

  function getTotalAvailableProduct(product: Product) {
    const productInCart = state.cart.find(({ prod }) => prod.id === product.id);
    const totalProductInCart = !!productInCart ? productInCart.qty : 0;
    return product.qty - totalProductInCart;
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        username: state.username,
        products: state.products,
        cart: state.cart,
        paid: state.paid,
        addToCart: (product, num) =>
          dispatch({ type: "add-to-cart", payload: { product, num } }),
        removeFromCart: (idProduct: Product["id"]) =>
          dispatch({ type: "remove-from-cart", payload: { idProduct } }),
        checkout: () => dispatch({ type: "checkout" }),
        getTotalProductInCart,
        onCheckoutSuccess: () => {
          dispatch({ type: "checkout-success" });
        },
        getTotalAvailableProduct,
        login: (username: string) => {
          dispatch({ type: "login", payload: username });
        },
        logout: () => dispatch({ type: "logout" }),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
