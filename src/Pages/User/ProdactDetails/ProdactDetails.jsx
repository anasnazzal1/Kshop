import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function ProdactDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("UserToken");
  const { counter, setCounter } = useContext(CartContext);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`ProdactDetails/${id}`],
    queryFn: () =>
      axios
        .get(`https://mytshop.runasp.net/api/products/${id}`)
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });

  // تعريف mutation لإضافة المنتج إلى السلة
  const addToCartMutation = useMutation({
    mutationFn: (productId) =>
      axios.post(
        `https://mytshop.runasp.net/api/Carts/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
    onSuccess: () => {
      setCounter(counter + 1);
      toast.success("Added to cart successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      // يمكن هنا تحديث بيانات الكارت إذا كنت تستخدم React Query لجلب الكارت
      queryClient.invalidateQueries(["CatrsProdact"]); // مثال على تحديث الكارت
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login to add items to cart", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    addToCartMutation.mutate(data.id);
  };

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage message={error?.message} />;

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
            {data.name || "Unnamed Product"}
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            {data.description || "No description available."}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold" color="success.main">
              Price: $
              {typeof data.price === "number" ? data.price.toFixed(2) : "N/A"}
            </Typography>

            {data.discount > 0 && (
              <Chip label={`${data.discount}% OFF`} color="error" />
            )}
          </Stack>

          <Typography variant="body1" color="text.primary" mb={3}>
            Quantity in stock:{" "}
            {typeof data.quantity === "number" ? data.quantity : "Unknown"}
          </Typography>

          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddToCart}
              disabled={addToCartMutation.isLoading}
            >
              {addToCartMutation.isLoading ? "Adding..." : "Add to Cart"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ProdactDetails;
