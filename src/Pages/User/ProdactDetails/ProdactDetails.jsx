import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Box,
} from "@mui/material";
import ErrorPage from "../../../Component/User/ErrorPage/ErrorPage";
import Loader from "../../../Component/User/Loader/Loader";
import { Bounce, toast } from "react-toastify";
import { CartContext } from "../../../Context/CartContext";
import UseFetch from "../../../hook/UseFetch";

function ProdactDetails() {
  const { id } = useParams();
  const [prodact, setProdact] = useState(null);

  const token = localStorage.getItem("UserToken");
  const { counter, setCounter } = useContext(CartContext);

  const { data, isLoading, isError } = UseFetch(
    `https://mytshop.runasp.net/api/products/${id}`
  );

  useEffect(() => {
    if (data && typeof data === "object") {
      setProdact(data);
    }
  }, [data]);

  const addToCart = async (id) => {
    if (!token) {
      toast.error("Please login to add items to cart", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    try {
      await axios.post(
        `https://mytshop.runasp.net/api/Carts/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCounter(counter + 1);
      toast.success("Added to cart successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  if (isError) return <ErrorPage />;
  if (isLoading || !prodact) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 4, boxShadow: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          Product Details
        </Typography>

        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            {prodact.name || "Unnamed Product"}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            {prodact.description || "No description available."}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold" color="success.main">
              Price: $
              {typeof prodact.price === "number"
                ? prodact.price.toFixed(2)
                : "N/A"}
            </Typography>

            {prodact.discount > 0 && (
              <Chip label={`${prodact.discount}% OFF`} color="error" />
            )}
          </Stack>

          <Typography variant="body1" color="text.primary" mb={3}>
            Quantity in stock:{" "}
            {typeof prodact.quantity === "number"
              ? prodact.quantity
              : "Unknown"}
          </Typography>

          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => addToCart(prodact.id)}
            >
              Add to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProdactDetails;
