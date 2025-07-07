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
import { daDK } from "@mui/material/locale";
import UseFetch from "../../../hook/UseFetch";

function Catgry() {
  const [catgry, setCatgry] = useState([]);


const {data,isError,isLoading} = UseFetch("https://mytshop.runasp.net/api/categories")

  


  useEffect(() => {
    setCatgry(data)
  }, [data]);

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
