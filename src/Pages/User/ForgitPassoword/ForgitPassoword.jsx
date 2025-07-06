import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function ForgitPassoword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Send = async (data) => {
    try {
      const response = await axios.post(
        "https://mytshop.runasp.net/api/Account/ForgotPassword",
        data
      );
     
      if (response.status === 200) {
        navigate("/sendCode");
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

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 12, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Forgot Password
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(Send)}
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
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default ForgitPassoword;
