import { useParams } from "react-router-dom";

export function RouteProduct() {
  const { idProduct, idCategory } = useParams();

  return (
    <h1>
      Product {idCategory} {idProduct}
    </h1>
  );
}
