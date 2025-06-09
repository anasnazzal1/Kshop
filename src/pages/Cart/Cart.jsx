import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
 function Cart(){
    const [Prodacts,setProdact] = useState([])


    const ShowProdactCart=async()=>{
        const UserToken = localStorage.getItem("UserToken")
        const response = await axios.get("http://mytshop.runasp.net/api/Carts",
            {headers:{
                Authorization:`Bearer ${UserToken}`
            }}
        );
        console.log(response.data.cartResponse)
        setProdact( response.data.cartResponse);
    }
const increseProdact = async(id)=>{
 const UserToken = localStorage.getItem("UserToken")
        const response = await axios.patch(`http://mytshop.runasp.net/api/Carts/increaseCount/${id}`,{},
            {headers:{
                Authorization:`Bearer ${UserToken}`
            }}
        );
        console.log(response)
        const UpdateUI = Prodacts.map((p)=>{
        if(p.id ==id){
            return {...p,count:p.count+1}
        }
        else
        return p
    })
    setProdact(UpdateUI)
}

const decreseProdact = async(id)=>{
 const UserToken = localStorage.getItem("UserToken")
        const response = await axios.patch(`http://mytshop.runasp.net/api/Carts/decreaseCount/${id}`,{},
            {headers:{
                Authorization:`Bearer ${UserToken}`
            }}
        );
        console.log(response)
        const UpdateUI = Prodacts.map((p)=>{
        if(p.id ==id){
            return {...p,count:p.count-1}
        }
        else
        return p
    })
    const update = UpdateUI.filter((e)=>{
        return e.count !=0
    })
    setProdact(update)
}
const RemoveProdact = async(id)=>{
 const UserToken = localStorage.getItem("UserToken")
        const response = await axios.delete(`http://mytshop.runasp.net/api/Carts/${id}`,
            {headers:{
                Authorization:`Bearer ${UserToken}`
            }}
        );
        console.log(response)
     
    const update = Prodacts.filter((e)=>{
        return e.id !=id
    })
    setProdact(update)
}
const ClearAll= async()=>{
    const UserToken = localStorage.getItem("UserToken")
        const response = await axios.delete(`http://mytshop.runasp.net/api/Carts/clearCart`,
            {headers:{
                Authorization:`Bearer ${UserToken}`
            }}
        );
        console.log(response)
     
   
    setProdact([])
}





useEffect(()=>{
    ShowProdactCart()
},[])



    return(
          <>
       { Prodacts.map((p)=>
               (
                 <Card sx={{ minWidth: 275 }} key={p.id}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {p.name}
        </Typography>
        <Typography variant="h5" component="div">
        {p.price}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
        <Typography variant="body2">
         {p.description}
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
       <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={2}
      border="1px solid #ccc"
      borderRadius="12px"
    >
      <IconButton  color="primary" onClick={()=>decreseProdact(p.id)}>
        <Remove />
      </IconButton>
      <Typography variant="h6">{p.count}</Typography>
      <IconButton  color="primary" onClick={()=>increseProdact(p.id)}>
        <Add  />
      </IconButton>
      <IconButton  color="error" onClick={()=>RemoveProdact(p.id)}>
        <Delete />
      </IconButton>
    </Box>
    </Card>
               )
        )}

<Button
  variant="contained"
  color="error"
  size="small"
  onClick={() => ClearAll()}
  sx={{ mt: 3, display: 'block', mx: 'auto', px: 4, py: 1 }}
>
  Clear All
</Button>
      
        
        
        </>
    )
}
export default Cart;