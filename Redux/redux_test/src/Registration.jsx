import { Box, Button, TextField, Card, Grid,Alert, Typography, FormControlLabel, Checkbox  } from '@mui/material'
import React, {useState} from 'react'
import { useRegisterUserMutation } from './services/UserAuthApi'
import {storeToken} from './services/LocalStorageService'
import './home.css'
import { useNavigate } from 'react-router-dom';

function Registration(props) {
    
    const [server_error, setServer_error] = useState({})
    const [registerUser,{ isLoading }] = useRegisterUserMutation()
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actutalData = {
            name: data.get('name'),
            email: data.get('email'),
            mobile: data.get('mobile'),
            password: data.get('password'),
            password2: data.get('password2'),
            tc: data.get('tc'),
        }

        const res = await registerUser(actutalData)
        if (res.error){
            setServer_error(res.error.data.errors)
        }
           

        if (res.data){
            storeToken(res.data.token)
            navigate('/dashboard')         
            
        }



    }
  return (
    <>
    <Card sx={{backgroundColor:'rgba(0, 0, 0, 0.6)', border: '2px solid orange'}} >
        <Box className = 'transbox' component='form' onSubmit={handleSubmit} noValidate id='login-id' sx={{mt:1, boxShadow:12, p:1}}>
            <Typography color={props.color} sx={{mt:1, textAlign:'center', fontWeight:'bold'}} variant='h5' container='div'>Registration</Typography>
            <TextField fullWidth required label='Name' color='warning' id='login-name-id' name='name' margin='normal' size='small' />
            {server_error.name ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.name[0]}</Typography>:'' }
            <TextField fullWidth required label='Email' color='warning' id='login-email-id' name='email' margin='normal' size='small' /> 
            {server_error.email ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.email[0]}</Typography>:'' }
            <TextField fullWidth required label='Mobile' color='warning' id='login-mobile-id' name='mobile' margin='normal' size='small' /> 
            {server_error.mobile ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.mobile[0]}</Typography>:'' }
            <TextField fullWidth required label='Password' color='warning' type= 'password' id='login-password-id' name='password' margin='normal' size='small' />
            {server_error.password ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.password[0]}</Typography>:'' } 
            <TextField fullWidth required label='Confirm Password' color='warning' type='password' id='login-confirm-password-id' name='password2' margin='normal' size='small' />
            {server_error.password2 ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.password2[0]}</Typography>:'' }
            <FormControlLabel control={<Checkbox value={true} color='primary' name='tc' id='tc'/>} label='I agree to term and condition' />
            {server_error.tc ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.tc[0]}</Typography>:'' }
            <Box sx={{textAlign:'center'}}>
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, ps:5}}>SignUp</Button>
            </Box>
            {server_error.non_field_errors ? <Alert severity= 'error' > {server_error.non_field_errors[0]} </Alert> : '' }               
        </Box>
    </Card>
    </>
  )
}

export default Registration