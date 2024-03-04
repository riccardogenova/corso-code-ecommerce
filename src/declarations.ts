export interface Product {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
}

export interface TContext {
  username: string;
  products: Array<Product>;
  cart: Array<{ prod: Product; qty: number }>;
  paid: boolean;
  addToCart: (product: Product, num: number) => void;
  removeFromCart: (idProduct: Product["id"]) => void;
  checkout: () => void;
  getTotalProductInCart: () => number;
  onCheckoutSuccess: () => void;
  getTotalAvailableProduct: (product: Product) => number;
  login: (username: string) => void;
  logout: () => void;
}
