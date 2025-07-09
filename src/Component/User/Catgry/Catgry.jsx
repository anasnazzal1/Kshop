import axios from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Catgry() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Catgry'],
    queryFn: () => axios.get('https://mytshop.runasp.net/api/categories').then(res => res.data),
  });

  if (error) return <ErrorPage />;
  if (isLoading) return <Loader />;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Categories
      </Typography>

      <Grid container spacing={3}>
        {data.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card sx={{ height: "100%", boxShadow: 3, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {c.description || "No description available."}
                </Typography>

                <Button
                  variant="outlined"
                  component={Link}
                  to={`ProdactOfCatgry/${c.id}`}
                  size="small"
                >
                  Products
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Catgry;
