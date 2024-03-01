import { useContext } from "react";
import { AppContext } from "../ContextProvider";

export function RouteHome() {
  const { products, addToCart, getTotalAvailableProduct } =
    useContext(AppContext);

  return (
    <div>
      <h1>Home</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {products.map((product) => {
          const totalAvailable = getTotalAvailableProduct(product);

          return (
            <div key={product.id}>
              <a href={`/p/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ width: 200 }}
                />
                <div style={{ fontWeight: "bold", fontSize: 13 }}>
                  {product.title}
                </div>
                <div>Prezzo {product.price}</div>
                <div>Disponibilità {totalAvailable}</div>
              </a>
              <button
                disabled={totalAvailable === 0}
                onClick={() => addToCart(product)}
              >
                {totalAvailable > 1
                  ? "Aggiungi al carrello"
                  : "Non disponibile"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
