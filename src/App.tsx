import { useContext } from "react";
import { AppContext } from "./Context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RouteHome } from "./routes/Home";
import { RouteProduct } from "./routes/Product";
import { RouteCart } from "./routes/Cart";
import { RouteCheckout } from "./routes/Checkout";
import { Route404 } from "./routes/404";
import Navbar from "./components/Navbar";
import { RouteLogin } from "./routes/Login";
import { RouteProtected } from "./components/RouteProtected";
import { RouteGuest } from "./components/RouteGuest";
import { RouteLogged } from "./components/RouteLogged";
import { CircularProgress } from "@mui/material";

function App() {
  const { paid, username, products } = useContext(AppContext);

  if (products.length === 0)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <BrowserRouter>
      {!paid && !!username && <Navbar />}
      <Routes>
        <Route element={<RouteGuest />}>
          <Route path="/login" element={<RouteLogin />} />
        </Route>
        <Route element={<RouteLogged />}>
          <Route path="/" element={<RouteHome />} />
        </Route>
        <Route element={<RouteLogged />}>
          <Route
            path="/product/:idCategory/:idProduct"
            element={<RouteProduct />}
          />
          <Route path="/cart" element={<RouteCart />} />
        </Route>
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
