import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router';
 function Login(){
    const {register , handleSubmit} = useForm();


    const LoginUser = async (data) => {
  console.log("📦 Data being sent:", data);
  try {
    const response = await axios.post("http://mytshop.runasp.net/api/Account/Login", data);
    console.log("✅ Success:", response.data);
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
      onSubmit={handleSubmit(LoginUser)}
    >


      <TextField id="filled-basic" fullWidth label="email" variant="filled" type='email' {...register("email")}/>

      <TextField id="filled-basic" fullWidth label="password" variant="filled"  type='password' {...register("password")}/>
      <Button variant="outlined" component={Link} to='/forgitPassword'>forgit password</Button>


        <Button variant="contained" type='submit'>Login</Button>

    </Box>
    )
}
export default Login;