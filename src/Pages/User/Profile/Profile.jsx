import React, { useState } from "react";
import {
  Box,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosAuth from "../../../api/Auth";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ForgotPassword from "../ForgitPassoword/ForgitPassoword";

const menuItems = [
  { label: "Info", key: "info" },
  { label: "Change Password", key: "changePassword" },
  { label: "Orders", key: "orders" },
];

function Profile() {
  const theme = useTheme();
  const [activePage, setActivePage] = useState("info");

  const { data, isLoading, error } = useQuery({
    queryKey: ["LoginUser"],
    queryFn: () => axiosAuth.get("/Account/userinfo").then((res) => res.data),
  });

  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => axiosAuth.get("/Orders").then((res) => res.data),
  });

  const renderContent = () => {
    if (isLoading)
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      );

    if (error)
      return (
        <Typography color="error" variant="body1">
          Failed to load user info.
        </Typography>
      );

    switch (activePage) {
      case "info":
        return (
          <Paper elevation={3} sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              User Information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "150px 1fr" },
                rowGap: 2,
                columnGap: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">Username:</Typography>
              <Typography>{data.userName}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">First Name:</Typography>
              <Typography>{data.firstName}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">Last Name:</Typography>
              <Typography>{data.lastName}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">Gender:</Typography>
              <Typography>{data.gender}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
              <Typography>{data.email}</Typography>

              <Typography variant="subtitle1" fontWeight="bold">Birth Date:</Typography>
              <Typography>{data.birthOfDate}</Typography>
            </Box>
          </Paper>
        );
      case "changePassword":
        return <ForgotPassword />;
      case "orders":
        if (ordersLoading) {
          return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          );
        }
        if (ordersError) {
          return (
            <Typography color="error" variant="body1">
              Failed to load orders.
            </Typography>
          );
        }
        if (!ordersData || !Array.isArray(ordersData)) {
          return <Typography variant="body1">No orders found.</Typography>;
        }

        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Orders List
            </Typography>

            <Grid container spacing={2}>
              {ordersData.map((o) => (
                <Grid item xs={12} md={6} lg={4} key={o.id}>
                  <Card variant="outlined" sx={{ borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Order ID: {o.id}
                      </Typography>
                      <Divider sx={{ mb: 1 }} />
                      <Typography variant="body2"><strong>Date:</strong> {o.orderDate}</Typography>
                      <Typography variant="body2"><strong>Status:</strong> {o.orderStatus}</Typography>
                      <Typography variant="body2"><strong>Payment:</strong> {o.paymentMethodType}</Typography>
                      <Typography variant="body2"><strong>Shipped:</strong> {o.shippedDate || "N/A"}</Typography>
                      <Typography variant="body2"><strong>Tracking:</strong> {o.trackingNumber || "N/A"}</Typography>
                      <Button
                        component={Link}
                        to={`OrderDetails/${o.id}`}
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: 3,
        gap: 2,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: 240 },
          backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#f0f0f0",
          borderRadius: 2,
          boxShadow: theme.palette.mode === "dark" ? "0 0 10px rgba(255,255,255,0.1)" : 2,
          p: 2,
        }}
      >
        <Typography variant="h6" mb={2} color={theme.palette.text.primary}>
          My Account
        </Typography>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={activePage === item.key}
            onClick={() => setActivePage(item.key)}
            sx={{
              borderRadius: 1,
              mb: 1,
              backgroundColor:
                activePage === item.key
                  ? theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.08)"
                  : "transparent",
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.12)",
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </Box>

      {/* Content */}
      <Box flex={1}>
        <Paper elevation={3} sx={{ p: 3, minHeight: "300px" }}>
          {renderContent()}
        </Paper>
      </Box>
    </Box>
  );
}

export default Profile;
