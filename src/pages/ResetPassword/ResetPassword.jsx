
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router';
import { useNavigate } from "react-router-dom";

 function ResetPassword(){
    const {register , handleSubmit} = useForm();
const navigate = useNavigate();


    const ResetUserPassword = async (data) => {
  console.log("📦 Data being sent:", data);
  try {
    const response = await axios.patch("http://mytshop.runasp.net/api/Account/SendCode", data);
    console.log("✅ Success:", response.data);
        navigate("/Login");

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
      onSubmit={handleSubmit(ResetUserPassword)}
    >


      <TextField id="filled-basic" fullWidth label="email" variant="filled" type='email' {...register("email")}/>
      <TextField id="filled-basic" fullWidth label="code" variant="filled" {...register("code")}/>

      <TextField id="filled-basic" fullWidth label="password" variant="filled"  type='password' {...register("password")}/>
            <TextField id="filled-basic" fullWidth label="password" variant="filled"  type='password' {...register("ConfirmPassword")}/>



        <Button variant="contained" type='submit'>Reset Password</Button>

    </Box>
    )
}
export default ResetPassword;