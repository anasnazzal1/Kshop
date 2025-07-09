// UserSidebar.jsx
import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemText, Typography, Paper } from "@mui/material";

const menuItems = [
  { label: "Info", key: "info" },
  { label: "Change Password", key: "changePassword" },
  { label: "Orders", key: "orders" },
];

const UserSidebar = () => {
  const [activePage, setActivePage] = useState("info");

  const renderContent = () => {
    switch (activePage) {
      case "info":
        return <Typography variant="h6">User Info Content</Typography>;
      case "changePassword":
        return <Typography variant="h6">Change Password Form</Typography>;
      case "orders":
        return <Typography variant="h6">Orders List</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box display="flex" p={3}>
      {/* Sidebar as box, not Drawer */}
      <Box
        sx={{
          width: 240,
          minHeight: "300px",
          backgroundColor: "#f0f0f0",
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
          mr: 3,
        }}
      >
        <Typography variant="h6" mb={2}>
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
};

export default UserSidebar;
