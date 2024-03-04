import { useContext, useState } from "react";
import { AppContext } from "../ContextProvider";
import { useNavigate } from "react-router-dom";

export function RouteCart() {
  const { cart, removeFromCart, checkout } = useContext(AppContext);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [errors, setErrors] = useState("");

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
      <div>
        <p>Inserisci i dati della tua carta</p>
        <input
          type="text"
          placeholder="Numero della carta"
          value={input}
          onChange={(e) => {
            if (!!errors) setErrors("");
            setInput(e.target.value);
          }}
        />
        {!!errors && <p style={{ color: "red" }}>{errors}</p>}
      </div>
      <button
        onClick={() => {
          if (!!input) {
            checkout();
            navigate("/checkout");
          } else setErrors("Inserisci i dati della tua carta");
        }}
      >
        Compra
      </button>
    </div>
  );
}
