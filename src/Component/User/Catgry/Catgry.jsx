import axios from "axios";
import { useEffect, useState } from "react";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import { Bounce, toast } from "react-toastify";

function Catgry() {
  const [catgry, setCatgry] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const GetCatgry = async () => {
    try {
      const response = await axios.get("https://mytshop.runasp.net/api/categories");
      
      setCatgry(response.data);
    } catch (error) {
        toast.error(error.response?.data?.message || error.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });;
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetCatgry();
  }, []);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loader />;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Categories
      </Typography>

      <Grid container spacing={3}>
        {catgry.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card sx={{ height: "100%", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Catgry;
