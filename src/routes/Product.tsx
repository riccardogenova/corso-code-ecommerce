import { useParams } from "react-router-dom";

export function RouteProduct() {
  const { idProduct } = useParams();

  return <h1>Product {idProduct}</h1>;
}
