import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Product } from "./types/product";
import AddEditDialog from "./components/AddEditDialog";

const Admin = () => {
  const [products, setProducts] = useState([]);

  const del = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      console.log(data);
      setProducts(data);
    })();
  }, []);

  return (
    <div>
      <div style={{ margin: "10px" }}>
        <AddEditDialog type="add" />
      </div>
      <Box gap={4} display="flex" alignItems="center" flexWrap="wrap">
        {products.map((p: Product) => {
          return (
            <Card key={p.id} sx={{ maxWidth: 345 }}>
              <CardMedia sx={{ height: 140 }} image="https://images.unsplash.com/photo-1708831095084-c5b2e2d5e894?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="green iguana" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is a product, click to like
                </Typography>
              </CardContent>
              <CardActions>
                <AddEditDialog type="edit" product={p} />
                <Button size="small" onClick={() => del(p.id)} color="error" variant="contained">
                  Delete
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default Admin;
