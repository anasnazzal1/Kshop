import React, { useState } from 'react';
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

const Login = () => {
  // لعمل loading لل button
  const [DoneReqToButton,SetDone] = useState(false)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LoginUser = async (data) => {
    
    try {
      const response = await axios.post("https://mytshop.runasp.net/api/Account/Login", data);
      
      localStorage.setItem("UserToken", response.data.token);
      toast.success('Login is success', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      SetDone(true)
      navigate("/home");
    } catch (error) {
      
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
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

        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit(LoginUser)}>
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
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
              }
            })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={DoneReqToButton}
          >
            {DoneReqToButton?  "Loading...":"Sign In "}
          </Button>

          {/* Forgot Password Link */}
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
