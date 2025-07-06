import axios from "axios";
import { useEffect, useState } from "react";
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
import ErrorPage from "../../../Component/User/ErrorPage/ErrorPage";
import Loader from "../../../Component/User/Loader/Loader";
import { Bounce, toast } from "react-toastify";

function Cart() {
  const token = localStorage.getItem("UserToken");
  const [prodact, setProdact] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [PymentMethod, setPymantMethod] = useState("Visa");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const GetProdact = async () => {
    try {
      const response = await axios.get("https://mytshop.runasp.net/api/Carts", {
        headers,
      });
      setProdact(response.data.cartResponse);
      setTotalPrice(response.data.totalPrice);
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

  const hendleChange = (e) => {
    setPymantMethod(e.target.value);
  };

  const HandlePayment = async () => {
    try {
      const response = await axios.post(
        "https://mytshop.runasp.net/api/CheckOuts/Pay",
        { PaymentMethod: PymentMethod },
        { headers }
      );
      if (response.status === 200) {
        location.href = response.data.url;
      }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const increaseQuantity = async (id) => {
    let Salary = 0;
    try {
      const respnse = await axios.patch(
        `https://mytshop.runasp.net/api/Carts/increaseCount/${id}`,
        {},
        { headers }
      );
      if ([200, 201, 204].includes(respnse.status)) {
        const newProdact = prodact.map((e) => {
          if (e.id === id) {
            Salary = e.price;
            return { ...e, count: e.count + 1 };
          }
          return e;
        });
        setProdact(newProdact);
        setTotalPrice(totalPrice + Salary);
      }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const decreaseQuantity = async (id) => {
    let Salary = 0;
    try {
      const respnse = await axios.patch(
        `https://mytshop.runasp.net/api/Carts/decreaseCount/${id}`,
        {},
        { headers }
      );
      if ([200, 201, 204].includes(respnse.status)) {
        const newProdact = prodact.map((e) => {
          if (e.id === id) {
            Salary = e.price;
            return { ...e, count: e.count - 1 };
          }
          return e;
        });
        setProdact(newProdact);
        setTotalPrice(totalPrice - Salary);
      }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const deleteItem = async (id) => {
    let Salary = 0;
    let count = 0;
    prodact.map((e) => {
      if (e.id === id) {
        Salary = e.price;
        count = e.count;
      }
    });

    try {
      const respnse = await axios.delete(
        `https://mytshop.runasp.net/api/Carts/${id}`,
        { headers }
      );
      if ([200, 201, 204].includes(respnse.status)) {
        const newProdact = prodact.filter((e) => e.id !== id);
        setProdact(newProdact);
        setTotalPrice(totalPrice - Salary * count);
      }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const ClearCart = async () => {
    try {
      const respnse = await axios.delete(
        "https://mytshop.runasp.net/api/Carts/clearCart",
        { headers }
      );
      setProdact([]);
      setTotalPrice(0);
      toast.success("Clear all is done", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
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
  if (isLoading) return <Loader />;

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
        🛒 Shopping Cart
      </Typography>

      {prodact.length === 0 ? (
        <Typography variant="h6" textAlign="center" mt={5}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {/* Clear All Button */}
          <Box textAlign="right" mb={2}>
            <Box
              component="button"
              onClick={ClearCart}
              sx={{
                backgroundColor: "#f44336",
                color: "#fff",
                px: 3,
                py: 1,
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                  transform: "scale(1.05)",
                },
              }}
            >
              🧹 Clear All
            </Box>
          </Box>

          <Grid container spacing={4} sx={{ mb: 4 }}>
            {prodact.map((item) => (
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
                      <strong style={{ color: "#1976d2" }}>
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
                        sx={iconBtnSx}
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.count <= 1}
                      >
                        −
                      </Box>
                      <Typography>{item.count}</Typography>
                      <Box
                        component="button"
                        sx={iconBtnSx}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </Box>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box
                        component="button"
                        sx={deleteBtnSx}
                        onClick={() => deleteItem(item.id)}
                      >
                        🗑️
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total Price */}
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
              ${totalPrice.toFixed(2)}
            </Typography>
          </Paper>

          {/* Checkout Section */}
          <Box
            sx={{
              maxWidth: 500,
              mx: "auto",
              mt: 6,
              p: 3,
              borderRadius: 4,
              boxShadow: 3,
              backgroundColor: "#fafafa",
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
              Checkout & Payment
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 1 }}>
                Choose Payment Method
              </FormLabel>
              <RadioGroup value={PymentMethod} onChange={hendleChange} row>
                <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <Box component="button" onClick={HandlePayment} sx={checkoutBtnSx}>
              💳 Checkout
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

// Style for quantity buttons
const iconBtnSx = {
  px: 2,
  py: 1,
  backgroundColor: "#eeeeee",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#d0d0d0",
    transform: "scale(1.05)",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
};

// Style for delete button
const deleteBtnSx = {
  px: 2,
  py: 1,
  backgroundColor: "#ffebee",
  color: "#d32f2f",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#ffcdd2",
    transform: "scale(1.05)",
  },
};

// Style for checkout button
const checkoutBtnSx = {
  mt: 3,
  width: "100%",
  backgroundColor: "#1976d2",
  color: "#fff",
  py: 1.5,
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#115293",
    transform: "scale(1.02)",
  },
};

export default Cart;
