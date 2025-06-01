
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router';
import { useNavigate } from "react-router-dom";

 function ForgitPassword(){
    const {register , handleSubmit} = useForm();
const navigate = useNavigate();


    const ForginPasswordUser = async (data) => {
  console.log("📦 Data being sent:", data);
  try {
    const response = await axios.post("http://mytshop.runasp.net/api/Account/ForgotPassword", data);
    console.log("✅ Success:", response.data);
    navigate("/ResetPassword");
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
};

    return(
      
           <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '90%' } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(ForginPasswordUser)}
    >


      <TextField id="filled-basic" fullWidth label="email" variant="filled" type='email' {...register("email")}/>



        <Button variant="contained" type='submit'>send code</Button>

    </Box>
    )
}
export default ForgitPassword;