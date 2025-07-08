import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🟡 React Query Mutation for login
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("https://mytshop.runasp.net/api/Account/Login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("UserToken", data.token);
      const decode = jwtDecode(data.token);
      const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (role === "SuperAdmin") navigate("/dashbord");
      else navigate("/home");

      toast.success('Login is success', {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    },
    onError: (error) => {
      toast.error(`${error?.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 12, p: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          gutterBottom
          fontWeight="bold"
        >
          Login
        </Typography>

        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=(?:.*\d){1,})(?=(?:.*[A-Za-z]){5,}).{7,}$/,
                message: "Password must be at least 5 letters and include at least 1 number"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Loading..." : "Sign In"}
          </Button>

          <Box textAlign="center" mt={2}>
            <Link to="/ForgitPassoword" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
