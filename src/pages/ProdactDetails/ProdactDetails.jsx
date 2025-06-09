import axios from "axios";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Grid } from '@mui/material';
import { useParams } from "react-router-dom";

function ProdactDetails(){
    const [product,setProdact] = useState({});
    const {id} = useParams()
    const getProdact= async(id)=>{
        const {data} = await axios.get(`http://mytshop.runasp.net/api/products/${id}`);
        console.log(data)
        setProdact(data);
    }
    const addToCart=async(id)=>{
        const UserToken=  localStorage.getItem("UserToken");

        try {
          const response = await axios.post(`http://mytshop.runasp.net/api/Carts/${id}`,{},
          {
            headers:{
              Authorization:`Bearer ${UserToken}`
            }
          }
        );
        console.log("sucss")
        }
        catch(error){
          console.log(error)
        }
    }



    useEffect(()=>{
        getProdact(id);
    },[])


return(
  
   
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={()=>addToCart(product.id)}>
              add to cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    

 
);
}
export default  ProdactDetails ;