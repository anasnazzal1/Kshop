import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosAuth from "../../../api/Auth";
import { Box, Typography, Paper, Divider, CircularProgress } from "@mui/material";
import Loader from "../../../Component/User/Loader/Loader";
import ErrorPage from "../../../Component/User/ErrorPage/ErrorPage";

function OrderDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["OrderDetails", id],
    queryFn: () => axiosAuth.get(`/Orders/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorPage />;

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "30px auto",
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Order Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ display: "grid", gridTemplateColumns: "150px 1fr", rowGap: 2, columnGap: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Order ID:
          </Typography>
          <Typography>{data.id}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Order Date:
          </Typography>
          <Typography>{new Date(data.orderDate).toLocaleDateString()}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Status:
          </Typography>
          <Typography>{data.orderStatus}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Payment Method:
          </Typography>
          <Typography>{data.paymentMethodType}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Shipped Date:
          </Typography>
          <Typography>{data.shippedDate ? new Date(data.shippedDate).toLocaleDateString() : "Not shipped yet"}</Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            Total Price:
          </Typography>
          <Typography>${data.totalPrice.toFixed(2)}</Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default OrderDetails;
