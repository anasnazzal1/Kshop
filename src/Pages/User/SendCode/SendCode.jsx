import { Box, Button, TextField, Typography, Paper, Container, Grid } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function SendCode() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const password = watch("password");

  const Send = async (data) => {
  
    try {
      const response = await axios.patch( "https://mytshop.runasp.net/api/Account/SendCode", data);
      if (response.status === 200) {
        toast.success('the change password is sucsess!', {
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
      }
    } catch (error) {
      
      toast.error('wrong code or information', {
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
    <Container maxWidth="sm" sx={{ mt: 10, mb: 8 }}>
      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 4,
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          color: "#fff",
          boxShadow: "0 10px 30px rgba(37, 117, 252, 0.5)",
        }}
      >
        <Typography variant="h4" fontWeight="700" align="center" gutterBottom>
          Reset Your Password
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 4, opacity: 0.85, fontWeight: 500 }}
        >
          Enter your email, code and new password below.
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit(Send)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="filled"
                InputProps={{ style: { backgroundColor: "#f0f4ff", borderRadius: 6 } }}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Verification Code"
                type="text"
                fullWidth
                variant="filled"
                InputProps={{ style: { backgroundColor: "#f0f4ff", borderRadius: 6 } }}
                {...register("code", {
                  required: "Code is required",
                  minLength: { value: 4, message: "Code must be at least 4 digits" },
                })}
                error={!!errors.code}
                helperText={errors.code?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="New Password"
                type="password"
                fullWidth
                variant="filled"
                InputProps={{ style: { backgroundColor: "#f0f4ff", borderRadius: 6 } }}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Password must be 8+ chars with uppercase, lowercase, number & special char",
                  },
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
                variant="filled"
                InputProps={{ style: { backgroundColor: "#f0f4ff", borderRadius: 6 } }}
                {...register("ConfirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={!!errors.ConfirmPassword}
                helperText={errors.ConfirmPassword?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#2575fc",
                  fontWeight: "700",
                  fontSize: "18px",
                  py: 1.5,
                  borderRadius: 3,
                  "&:hover": {
                    backgroundColor: "#e1e7ff",
                  },
                }}
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default SendCode;
