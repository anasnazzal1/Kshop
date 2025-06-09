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
import { Link } from "react-router";

function Prodact(){
    const [catgry,setProdact] = useState([]);

    const getProdact= async()=>{
        const {data} = await axios.get("http://mytshop.runasp.net/api/products");
        setProdact(data);
    }
    



    useEffect(()=>{
        getProdact();
    },[])


return(
    <>
     <h2>Prodact</h2>
 <Grid container spacing={2} mt={5}>
   
    {catgry.map((ca) => (
      <Grid item xs={12} sm={6} md={4} key={ca.id}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {ca.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {ca.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" component={Link} to={`/ProdactDetails/${ca.id}`} >
              details
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
    </>
 
);
}
export default  Prodact ;