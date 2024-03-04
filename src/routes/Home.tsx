import { useContext } from "react";
import { AppContext } from "../ContextProvider";
import { Card } from "../components/Card";

export function RouteHome() {
  const { products } = useContext(AppContext);

  return (
    <div>
      <h1>Home</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
        }}
      >
        {products.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
