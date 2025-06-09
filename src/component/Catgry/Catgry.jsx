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

function Catgry(){
    const [catgry,setCatgry] = useState([]);

    const getCatgry= async()=>{
        const {data} = await axios.get("http://mytshop.runasp.net/api/categories");
        setCatgry(data);
    }




    useEffect(()=>{
        getCatgry();
    })


return(
  <>
  <h1>catgry</h1>
  <Grid container spacing={2}>
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
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
  
  
  </>
);
}
export default  Catgry ;