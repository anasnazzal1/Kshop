import axios from "axios";
import { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  Box,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ErrorPage from "../../../Component/User/ErrorPage/ErrorPage";
import Loader from "../../../Component/User/Loader/Loader";
import { Bounce, toast } from "react-toastify";
import { CartContext } from "../../../Context/CartContext";
import axiosAuth from "../../../api/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function Cart() {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { counter, setCounter } = useContext(CartContext);

  const [PymentMethod, setPymantMethod] = useState("Visa");

  // جلب بيانات العربة
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["CartProducts"],
    queryFn: () => axiosAuth.get("/Carts").then((res) => res.data),
    staleTime: 1000 * 60 * 5, // 5 دقائق Cache (اختياري)
  });

  // دالة الدفع
  const handleChange = (e) => setPymantMethod(e.target.value);

  const HandlePayment = async (paymentMethod) => {
    const response = await axiosAuth.post("/CheckOuts/Pay", {
      PaymentMethod: paymentMethod,
    });
    return response.data;
  };

  const mutationPayment = useMutation({
    mutationFn: HandlePayment,
    onSuccess: (data) => {
      if (data.url) {
        location.href = data.url;
      } else {
        toast.success("تم الدفع بنجاح");
      }
      queryClient.invalidateQueries(["CartProducts"]);
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

  const handleSubmit = () => {
    mutationPayment.mutate(PymentMethod);
  };

  // زيادة الكمية
  const mutationIncrease = useMutation({
    mutationFn: (id) =>
      axiosAuth.patch(`/Carts/increaseCount/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["CartProducts"]);
      setCounter((c) => c + 1);
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

  // نقص الكمية
  const mutationDecrease = useMutation({
    mutationFn: (id) =>
      axiosAuth.patch(`/Carts/decreaseCount/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["CartProducts"]);
      setCounter((c) => c - 1);
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

  // حذف عنصر
  const mutationDelete = useMutation({
    mutationFn: (id) => axiosAuth.delete(`/Carts/${id}`).then((res) => res.data),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["CartProducts"]);
      // تحديث العداد بناءً على العنصر المحذوف (يمكن تحسينه حسب البيانات)
      const item = data?.cartResponse.find((e) => e.id === id);
      if (item) {
        setCounter((c) => c - item.count);
      }
      toast.success("تم حذف العنصر بنجاح");
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

  // تفريغ العربة
  const mutationClear = useMutation({
    mutationFn: () => axiosAuth.delete("/Carts/clearCart").then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["CartProducts"]);
      setCounter(0);
      toast.success("تم تفريغ العربة");
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

  if (isError) return <ErrorPage error={error} />;
  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        🛒 Shopping Cart
      </Typography>

      {data.cartResponse.length === 0 ? (
        <Typography variant="h6" textAlign="center" mt={5}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          <Box textAlign="right" mb={2}>
            <Box
              component="button"
              onClick={() => mutationClear.mutate()}
              sx={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
                px: 3,
                py: 1,
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.error.dark,
                  transform: "scale(1.05)",
                },
              }}
            >
              🧹 Clear All
            </Box>
          </Box>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            {data.cartResponse.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {item.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.description}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <Typography variant="body1" fontWeight="bold">
                        Price:
                      </Typography>
                      <Typography color="success.main">${item.price.toFixed(2)}</Typography>
                    </Stack>

                    <Typography variant="body2" mb={1}>
                      Quantity: <strong>{item.count}</strong>
                    </Typography>

                    <Typography variant="body2" mb={1}>
                      Total:{" "}
                      <strong style={{ color: theme.palette.primary.main }}>
                        ${(item.price * item.count).toFixed(2)}
                      </strong>
                    </Typography>

                    {item.discount > 0 && (
                      <Chip
                        label={`${item.discount}% OFF`}
                        color="error"
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )}

                    <Stack direction="row" spacing={1} mt={2} alignItems="center">
                      <Box
                        component="button"
                        sx={iconBtnSx(theme)}
                        onClick={() => mutationDecrease.mutate(item.id)}
                        disabled={item.count <= 1}
                      >
                        −
                      </Box>
                      <Typography>{item.count}</Typography>
                      <Box
                        component="button"
                        sx={iconBtnSx(theme)}
                        onClick={() => mutationIncrease.mutate(item.id)}
                      >
                        +
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box
                        component="button"
                        sx={deleteBtnSx(theme)}
                        onClick={() => mutationDelete.mutate(item.id)}
                      >
                        🗑️
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper
            elevation={4}
            sx={{
              p: 3,
              maxWidth: 400,
              mx: "auto",
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total Price:
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold" mt={1}>
              ${data.totalPrice.toFixed(2)}
            </Typography>
          </Paper>

          <Box
            sx={{
              maxWidth: 500,
              mx: "auto",
              mt: 6,
              p: 3,
              borderRadius: 4,
              boxShadow: 3,
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
              Checkout & Payment
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Choose Payment Method
              </FormLabel>
              <RadioGroup value={PymentMethod} onChange={handleChange} row>
                <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <Box
              component="button"
              onClick={handleSubmit}
              disabled={mutationPayment.isLoading}
              sx={checkoutBtnSx(theme)}
            >
              💳 Checkout
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

// Dynamic styles based on theme
const iconBtnSx = (theme) => ({
  px: 2,
  py: 1,
  backgroundColor: theme.palette.action.hover,
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
    transform: "scale(1.05)",
  },
  "&:disabled": {
    backgroundColor: theme.palette.action.disabledBackground,
    cursor: "not-allowed",
  },
});

const deleteBtnSx = (theme) => ({
  px: 2,
  py: 1,
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.main,
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    transform: "scale(1.05)",
  },
});

const checkoutBtnSx = (theme) => ({
  mt: 3,
  width: "100%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  py: 1.5,
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.02)",
  },
});

export default Cart;
