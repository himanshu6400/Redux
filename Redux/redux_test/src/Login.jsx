import { Card, Box, Button, Alert ,TextField, Grid, Typography } from '@mui/material'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import {useLoginUserMutation} from './services/UserAuthApi'
import {storeToken, getToken} from './services/LocalStorageService'
import { useNavigate } from 'react-router-dom';
import React, { useState , useEffect} from 'react'
import { setUserToken } from './features/authSlice';
import { useDispatch } from 'react-redux';


function Login(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[server_error, setServerError] =useState({})
    const [loginUser, {isLoading}] = useLoginUserMutation()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData ={
            email : data.get('email'),
            password : data.get('password')
        }
        const res = await loginUser(actualData)
        if(res.error){
            setServerError(res.error.data.errors)
        }
        if (res.data){
            storeToken(res.data.token)
            let { access_token } = getToken() 
            dispatch(setUserToken({access_token: access_token}))
            navigate('/dashboard')
        }      
    }
    let { access_token } = getToken() 
    useEffect(() =>{ 
        dispatch(setUserToken({access_token: access_token})) 
    }, [access_token, dispatch])

  return (
    <>

                <Card sx={{backgroundColor:'rgba(0, 0, 0, 0.6)', border: '2px solid orange'}}>
                    <Box className = 'transbox' component='form' onSubmit={handleSubmit} noValidate id='login-id' sx={{mt:1, boxShadow:12, p:1}}>
                        <Typography color={props.color} sx={{mt:1, textAlign:'center', fontWeight:'bold'}} variant='h5' container='div'>Signin </Typography>
                        <TextField fullWidth required label='Email' color='warning' id='login-email-id' name='email' margin='normal' size='small' />
                        {server_error.email ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.email[0]}</Typography>:'' }  
                        <TextField fullWidth required label='Password' color='warning' type='password' id='login-password-id' name='password' margin='normal' size='small' />
                        {server_error.password ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.password[0]}</Typography>:'' }  
                        <Box sx={{textAlign:'center'}}>
                            <Button type='submit' variant='contained' sx={{mt:3, mb:2, ps:5}}>Login</Button>
                        </Box>
                        {server_error.non_field_errors ? <Alert severity= 'error' > {server_error.non_field_errors[0]} </Alert> : '' }               
                    </Box>
                </Card>
    </>
  )
}

export default Login