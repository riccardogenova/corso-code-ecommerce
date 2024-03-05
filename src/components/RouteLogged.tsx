import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/createContext";

export function RouteLogged() {
  const { username } = useContext(AppContext);

  if (!!username) return <Outlet />;
  return <Navigate to="/login" />;
}
