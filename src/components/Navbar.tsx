import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { AppContext } from "../context/createContext";

export default function DrawerAppBar() {
  const { getTotalProductInCart, logout, username } = useContext(AppContext);
  const total = getTotalProductInCart();
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              e-commerce
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <IconButton aria-label="cart" onClick={() => navigate("/cart")}>
              <Badge badgeContent={total} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {!!username && (
              <Button sx={{ color: "#fff" }} onClick={logout}>
                Logout {username}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
