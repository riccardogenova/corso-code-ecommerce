import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppContext } from "../Context";

export function RouteGuest() {
  const { username } = useContext(AppContext);

  if (!!username) return <Navigate to="/" />;
  return <Outlet />;
}
