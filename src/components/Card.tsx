import MaterialCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../Context";
import { Product } from "../declarations";
import { Link } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/AddShoppingCart";

interface Props {
  product: Product;
}

export function Card({ product }: Props) {
  const { addToCart, getTotalAvailableProduct } = useContext(AppContext);

  const totalAvailable = getTotalAvailableProduct(product);
  const [input, setInput] = useState(1);
  return (
    <MaterialCard sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link
          to={`/product/category/${product.id}`}
          style={{ textDecoration: "none" }}
        >
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.title}
          />
        </Link>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span>Disponibilità {totalAvailable}</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button
          size="small"
          color="primary"
          onClick={() => {
            if (input > 1) setInput(input - 1);
          }}
        >
          -
        </Button>
        <span>{input}</span>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            if (input < totalAvailable) setInput(input + 1);
          }}
        >
          +
        </Button> */}
        <Button
          variant="contained"
          endIcon={<ShoppingCart />}
          disabled={totalAvailable === 0}
          onClick={() => addToCart(product, input)}
        >
          {totalAvailable > 1 ? "Aggiungi al carrello" : "Non disponibile"}
        </Button>
      </CardActions>
    </MaterialCard>
  );
}
