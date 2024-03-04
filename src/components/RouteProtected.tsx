import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../Context";

export function RouteProtected() {
  const { paid } = useContext(AppContext);

  if (paid) return <Outlet />;
  return <Navigate to="/" />;
}
