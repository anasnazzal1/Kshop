import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
 function Register(){
    const {register , handleSubmit} = useForm();


    const RegisterUser = async (data) => {
  console.log("📦 Data being sent:", data);
  try {
    const response = await axios.post("http://mytshop.runasp.net/api/Account/register", data);
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
      onSubmit={handleSubmit(RegisterUser)}
    >
      <TextField id="filled-basic" fullWidth label="firstName" variant="filled" {...register("firstName")}  />
            <TextField id="filled-basic" fullWidth label="lastName" variant="filled" {...register("lastName")} />

      <TextField id="filled-basic" fullWidth label="userName" variant="filled" {...register("userName")} />

      <TextField id="filled-basic" fullWidth label="email" variant="filled" type='email' {...register("email")}/>

      <TextField id="filled-basic" fullWidth label="password" variant="filled"  type='password' {...register("password")}/>
            <TextField id="filled-basic" fullWidth label="confirmPassword" variant="filled" type='password' {...register("confirmPassword")} />

      <TextField id="filled-basic" fullWidth label="birthOfDate" variant="filled" type='date' {...register("birthOfDate")} />

        <Button variant="contained" type='submit'>register</Button>

    </Box>
    )
}
export default Register;