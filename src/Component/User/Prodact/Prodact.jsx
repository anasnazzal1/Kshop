import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button
} from "@mui/material";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function Prodact() {
  const [prodact, setProdact] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetProdact = async () => {
    try {
      const response = await axios.get("https://mytshop.runasp.net/api/products");
      
      setProdact(response.data);
      
    } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetProdact();
  }, []);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loader />;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Products
      </Typography>

      <Grid container spacing={4}>
        {prodact.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 4 }}>
              {p.mainImg && (
                <CardMedia
                  component="img"
                  height="200"
                  image={p.mainImg}
                  alt={p.name}
                  sx={{ objectFit: "cover" }}
                />
              )}

              <CardContent>
                <Typography gutterBottom variant="h6" component="div" color="primary">
                  {p.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ mt: "auto", justifyContent: "space-between", px: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  ${p.price?.toFixed(2) || "N/A"}
                </Typography>
                <Button size="small" variant="outlined" color="primary" component={Link} to={`details/${p.id}`}>
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Prodact;
