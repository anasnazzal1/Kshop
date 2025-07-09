import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loader from "../Loader/Loader";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axiosAuth from "../../../api/Auth";
import { toast } from "react-toastify";

function Prodact() {
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortBy, setSortBy] = useState("price");
  const [order, setOrder] = useState("asc");

  const [newRate, setNewRate] = useState(0);
  const [newComment, setNewComment] = useState("");

  const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
    queryKey: ["Prodact", sortBy, order],
    queryFn: () =>
      axios
        .get(`https://mytshop.runasp.net/api/products?sortBy=${sortBy}&order=${order}`)
        .then((res) => res.data.data),
  });

  console.log(data)

const reviewMutation = useMutation({
  mutationFn: ({ productId, review }) => {
    console.log(review);
    // مهم ترجع الـ Promise هنا
    return axiosAuth.post(`/products/${productId}/Reviews/Create`, review);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["Prodact"]);
    setOpenAddDialog(false);
    setNewRate(0);
    setNewComment("");
    toast.success("added success");
  },
  onError: (error) => {
    console.error("Error adding review:", error.response?.data || error.message);
    toast.error( error.message);
  },
});


  const handleOpenReviewDialog = (reviews) => {
    setCurrentReviews(reviews || []);
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  const handleOpenAddDialog = (productId) => {
    setSelectedProductId(productId);
    console.log(productId)
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewRate(0);
    setNewComment("");
  };

  const handleSubmitReview = () => {
    if (newRate === 0 || newComment.trim() === "") return;
    reviewMutation.mutate({
      productId: selectedProductId,
      review: {
        "Rate": newRate,
        "Comment": newComment,
      },
    });
    
  };

  if (error) return <ErrorPage />;
  if (isLoading) return <Loader />;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
        Products
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4, justifyContent: "center" }}>
  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel id="sort-by-label">Sort By</InputLabel>
    <Select
      labelId="sort-by-label"
      value={sortBy}
      label="Sort By"
      onChange={(e) => setSortBy(e.target.value)}
    >
      <MenuItem value="price">Price</MenuItem>
      <MenuItem value="name">Name</MenuItem>
    </Select>
  </FormControl>

  <FormControl sx={{ minWidth: 150 }}>
    <InputLabel id="order-label">Order</InputLabel>
    <Select
      labelId="order-label"
      value={order}
      label="Order"
      onChange={(e) => setOrder(e.target.value)}
    >
      <MenuItem value="asc">Ascending</MenuItem>
      <MenuItem value="desc">Descending</MenuItem>
    </Select>
  </FormControl>
</Box>


      <Grid container spacing={4}>
        {data.map((p) => {
          const reviews = Array.isArray(p.reviews) ? p.reviews : [];
          const averageRating = reviews.length
            ? reviews.reduce((sum, r) => sum + r.rate, 0) / reviews.length
            : 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card
  sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: 6,
    borderRadius: 3,
    transition: "transform 0.3s",
    "&:hover": { transform: "scale(1.02)" },
  }}
>
  {p.mainImg && (
    <CardMedia
      component="img"
      height="200"
      image={p.mainImg}
      alt={p.name}
      sx={{ objectFit: "cover" }}
    />
  )}

  <Box sx={{ flexGrow: 1 }}>
    <CardContent>
      <Typography gutterBottom variant="h6" color="primary" fontWeight="bold">
        {p.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={1}>
        {p.description}
      </Typography>

      {reviews.length > 0 && (
        <Box mt={1}>
          <Stack spacing={0.5}>
            <Rating value={averageRating} precision={0.5} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              ({reviews.length} reviews)
            </Typography>
          </Stack>
        </Box>
      )}
    </CardContent>
  </Box>

  <CardActions sx={{ flexDirection: "column", alignItems: "flex-start", px: 2, pb: 2 }}>
    <Typography variant="subtitle1" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
      ${p.price?.toFixed(2) || "N/A"}
    </Typography>

    <Stack direction="row" spacing={1} width="100%">
      <Button size="small" variant="outlined" fullWidth component={Link} to={`details/${p.id}`}>
        Details
      </Button>
      <Button
        size="small"
        variant="contained"
        fullWidth
        color="secondary"
        onClick={() => handleOpenReviewDialog(reviews)}
      >
        Show Reviews
      </Button>
      <Button
        size="small"
        variant="contained"
        fullWidth
        color="primary"
        onClick={() => handleOpenAddDialog(p.id)}
      >
        Add Review
      </Button>
    </Stack>
  </CardActions>
</Card>

            </Grid>
          );
        })}
      </Grid>

      {/* Show Reviews Dialog */}
      <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Reviews
          <IconButton aria-label="close" onClick={handleCloseReviewDialog} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {currentReviews.length === 0 ? (
            <Typography>No reviews available.</Typography>
          ) : (
            currentReviews.map((review) => (
              <Box key={review.id} mb={2} p={1} borderBottom="1px solid #ccc">
                <Rating value={review.rate} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {review.comment || "No comment"}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {new Date(review.reviewDate).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          )}
        </DialogContent>
      </Dialog>

      {/* Add Review Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Add Review
          <IconButton aria-label="close" onClick={handleCloseAddDialog} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2}>
            <Rating
              name="new-rating"
              value={newRate}
              onChange={(e, newValue) => {setNewRate(newValue); console.log(newValue)}}
            />
            <TextField
              label="Comment"
              multiline
              minRows={3}
              fullWidth
              value={newComment}
              onChange={(e) => {
                  setNewComment(e.target.value);
                  console.log(e.target.value);
                }}

            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleSubmitReview} variant="contained" disabled={reviewMutation.isPending}>
            {reviewMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Prodact;
