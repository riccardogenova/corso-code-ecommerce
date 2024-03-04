import { ReactNode, createContext, useEffect, useState } from "react";
import { Product, TContext } from "./declarations";
import { utilityGetPreviousUsername } from "./utils";

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

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [cart, setCart] = useState<Array<{ prod: Product; qty: number }>>([]);
  const [paid, setPaid] = useState<boolean>(false);
  const initUsername = utilityGetPreviousUsername();
  const [username, setUsername] = useState<string>(initUsername);

  async function getProducts() {
    const response = await fetch("https://mockend.up.railway.app/api/products");
    const data: Array<Product> = await response.json();
    setProducts(data);
  }

  function removeFromCart(idProduct: Product["id"]) {
    const productFound = cart.find(
      (cartProduct) => cartProduct.prod.id === idProduct
    );
    if (!!productFound && productFound.qty === 1) {
      const newCart = cart.filter(
        (productCart) => productCart.prod.id !== idProduct
      );
      setCart(newCart);
    }
    if (!!productFound && productFound.qty > 1) {
      const newCart = cart.map((cartProduct) => {
        if (idProduct === cartProduct.prod.id)
          return { ...cartProduct, qty: cartProduct.qty - 1 };
        return cartProduct;
      });
      setCart(newCart);
    }
  }

  function addToCart(product: Product, num: number) {
    const productFound = cart.find(
      (productCart) => product.id === productCart.prod.id
    );
    if (!productFound) {
      const newCart = [...cart, { prod: product, qty: num }];
      setCart(newCart);
    } else {
      const newCart = cart.map((productCart) =>
        product.id === productCart.prod.id
          ? { ...productCart, qty: productCart.qty + num }
          : { ...productCart }
      );
      setCart(newCart);
    }
  }

  function checkout() {
    setPaid(true);
    setCart([]);
  }

  function onCheckoutSuccess() {
    setPaid(false);
  }

  function getTotalProductInCart() {
    const total = cart.reduce((acc, productCart) => {
      return acc + productCart.qty;
    }, 0);
    return total;
  }

  function getTotalAvailableProduct(product: Product) {
    const productInCart = cart.find(({ prod }) => prod.id === product.id);
    const totalProductInCart = !!productInCart ? productInCart.qty : 0;
    return product.qty - totalProductInCart;
  }

  function login(username: string) {
    setUsername(username);
    localStorage.setItem("username", username);
  }

  function logout() {
    setUsername("");
    localStorage.removeItem("username");
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        username,
        products,
        cart,
        paid,
        addToCart,
        removeFromCart,
        checkout,
        getTotalProductInCart,
        onCheckoutSuccess,
        getTotalAvailableProduct,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
