import { NavLink } from "react-router-dom";
import { AppContext } from "../ContextProvider";
import { useContext } from "react";

export default function Navbar() {
  const { getTotalProductInCart } = useContext(AppContext);
  const total = getTotalProductInCart();

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
          {total > 0 && <span>{total}</span>}
        </li>
      </ul>
    </nav>
  );
}
