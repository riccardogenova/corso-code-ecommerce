import { ReactNode, createContext, useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
}

export const AppContext = createContext<{
  products: Array<Product>;
  cart: Array<{ prod: Product; qty: number }>;
  paid: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (idProduct: Product["id"]) => void;
  checkout: () => void;
  getTotalProductInCart: () => number;
  onCheckoutSuccess: () => void;
  getTotalAvailableProduct: (product: Product) => number;
}>({
  products: [],
  cart: [],
  paid: false,
  addToCart: () => {},
  removeFromCart: () => {},
  checkout: () => {},
  getTotalProductInCart: () => 0,
  onCheckoutSuccess: () => {},
  getTotalAvailableProduct: () => 0,
});

interface Props {
  children: ReactNode;
}

export function ContextProvider({ children }: Props) {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [cart, setCart] = useState<Array<{ prod: Product; qty: number }>>([]);
  const [paid, setPaid] = useState<boolean>(false);

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

  function addToCart(product: Product) {
    const productFound = cart.find(
      (productCart) => product.id === productCart.prod.id
    );
    if (!productFound) {
      const newCart = [...cart, { prod: product, qty: 1 }];
      setCart(newCart);
    } else {
      const newCart = cart.map((productCart) =>
        product.id === productCart.prod.id
          ? { ...productCart, qty: productCart.qty + 1 }
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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        paid,
        addToCart,
        removeFromCart,
        checkout,
        getTotalProductInCart,
        onCheckoutSuccess,
        getTotalAvailableProduct,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
