import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../../../Component/User/Loader/Loader";
import ErrorPage from "../../../Component/User/ErrorPage/ErrorPage";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Chip
} from "@mui/material";

function ProdactOfCatgry() {
  const { id } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`Catgry${id}Prodaact`],
    queryFn: () =>
      axios
        .get(`https://mytshop.runasp.net/api/categories/${id}/products`) // تم تعديل الرابط حسب التوثيق الصحيح
        .then((res) => res.data),
    staleTime: 5 * 60 * 1000,
  });
  console.log(data)

  if (isLoading) return <Loader />;
  if (isError) return <ErrorPage />;

  if (!data || data.length === 0)
    return (
      <Typography variant="h6" align="center" mt={5}>
        No products found in this category.
      </Typography>
    );
const products = Array.isArray(data) ? data : data?.products || [];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Products in Category #{id}
      </Typography>

      <Grid container spacing={3}>
        {data.map((d) => (
          <Grid item xs={12} sm={6} md={4} key={d.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              {d.mainImg && (
                <CardMedia
                  component="img"
                  height="180"
                  image={d.mainImg}
                  alt={d.name}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {d.name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {d.description || "No description available"}
                </Typography>

                <Typography variant="body1" fontWeight="bold">
                  Price: ${d.price}
                </Typography>

                {d.discount > 0 && (
                  <Chip
                    label={`Discount: ${d.discount}%`}
                    color="success"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Quantity: {d.quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProdactOfCatgry;
