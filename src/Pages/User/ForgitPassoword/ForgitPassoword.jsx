import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // استخدام useMutation مع React Query
  const mutation = useMutation({
  mutationFn: (data) =>
    axios.post("https://mytshop.runasp.net/api/Account/ForgotPassword", data),
  onSuccess: (response) => {
    if (response.status === 200) {
      toast.success("Check your email for the reset code.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/sendCode");
    }
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


  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 12, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Forgot Password
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={mutation.isLoading}
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
          >
            {mutation.isLoading ? "Sending..." : "Send"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ForgotPassword;
