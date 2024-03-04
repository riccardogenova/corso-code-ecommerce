import { useContext } from "react";
import { AppContext } from "../Context";
import { Card } from "../components/Card";
import { Container, Grid } from "@mui/material";

export function RouteHome() {
  const { products } = useContext(AppContext);

  return (
    <Container maxWidth="lg">
      <h1>Home</h1>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item sm={6} md={3} key={product.id}>
            <Card product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
