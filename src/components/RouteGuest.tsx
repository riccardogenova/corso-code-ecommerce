import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../context/createContext";

export function RouteGuest() {
  const { username } = useContext(AppContext);

  if (!!username) return <Navigate to="/" />;
  return <Outlet />;
}
