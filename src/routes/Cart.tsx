import { useContext } from "react";
import { AppContext } from "../ContextProvider";
import { useNavigate } from "react-router-dom";

export function RouteCart() {
  const { cart, removeFromCart, checkout } = useContext(AppContext);
  const navigate = useNavigate();

  if (cart.length === 0) return <h1>Amunì! Compra qualcosa...</h1>;

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map(({ prod, qty }) => (
          <div>
            <li key={prod.id}>{prod.title}</li>
            <div>{qty}</div>
            <button onClick={() => removeFromCart(prod.id)}>Remove</button>
          </div>
        ))}
      </ul>
      <button
        onClick={() => {
          checkout();
          navigate("/checkout");
        }}
      >
        Accatta
      </button>
    </div>
  );
}
