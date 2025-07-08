import React from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  // 🟡 React Query Mutation
  const mutation = useMutation({
    mutationFn: async (data) => {
      return axios.post("https://mytshop.runasp.net/api/Account/register", data);
    },
    onSuccess: () => {
      toast.success('Register is success', {
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
      navigate("/Login");
    },
    onError: (error) => {
      toast.error(`${error?.message}`, {
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
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Create an Account
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 4,
                    message: "First name must be at least 4 characters"
                  }
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 4,
                    message: "Last name must be at least 4 characters"
                  }
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 8,
                    message: "Username must be at least 8 characters"
                  }
                })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match"
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Birth Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...register("birthOfDate", {
                  required: "Date of birth is required",
                  validate: (value) => {
                    const birthDate = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();
                    const d = today.getDate() - birthDate.getDate();
                    const is18 = age > 18 || (age === 18 && (m > 0 || (m === 0 && d >= 0)));
                    return is18 || "You must be at least 18 years old";
                  }
                })}
                error={!!errors.birthOfDate}
                helperText={errors.birthOfDate?.message}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Loading..." : "Register"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
