import { useContext } from "react";
import { AppContext } from "./ContextProvider";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { RouteHome } from "./routes/Home";
import { RouteProduct } from "./routes/Product";
import { RouteCart } from "./routes/Cart";
import { RouteCheckout } from "./routes/Checkout";
import { Route404 } from "./routes/404";
import Navbar from "./components/Navbar";

function RouteProtected() {
  const { paid } = useContext(AppContext);
  if (paid) return <Outlet />;
  return <Navigate to="/" />;
}

function App() {
  const { paid } = useContext(AppContext);

  return (
    <BrowserRouter>
      {!paid && <Navbar />}
      <Routes>
        <Route path="/" element={<RouteHome />} />
        <Route
          path="/product/:idCategory/:idProduct"
          element={<RouteProduct />}
        />
        <Route path="/cart" element={<RouteCart />} />
        <Route element={<RouteProtected />}>
          <Route path="/checkout" element={<RouteCheckout />} />
        </Route>
        <Route path="/404" element={<Route404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
