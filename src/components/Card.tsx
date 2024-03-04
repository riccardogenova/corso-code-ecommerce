import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../ContextProvider";
import { Product } from "../declarations";

interface Props {
  product: Product;
}

export function Card({ product }: Props) {
  const { addToCart, getTotalAvailableProduct } = useContext(AppContext);

  const totalAvailable = getTotalAvailableProduct(product);
  const [input, setInput] = useState(1);

  return (
    <div>
      <Link to={`/product/category/${product.id}`}>
        <img src={product.image} alt={product.title} style={{ width: 200 }} />
        <div style={{ fontWeight: "bold", fontSize: 13 }}>{product.title}</div>
        <div>Prezzo {product.price}</div>
        <div>Disponibilità {totalAvailable}</div>
      </Link>
      <button
        onClick={() => {
          if (input > 1) setInput(input - 1);
        }}
      >
        -
      </button>
      <span>{input}</span>
      <button
        onClick={() => {
          if (input < totalAvailable) setInput(input + 1);
        }}
      >
        +
      </button>
      <button
        disabled={totalAvailable === 0}
        onClick={() => addToCart(product, input)}
      >
        {totalAvailable > 1 ? "Aggiungi al carrello" : "Non disponibile"}
      </button>
    </div>
  );
}
