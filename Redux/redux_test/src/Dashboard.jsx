import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLoggedUserQuery, useGetLoggedUserProfileDataQuery } from './services/UserAuthApi';
import { getToken, removeToken,storeToken } from './services/LocalStorageService';
import { Box } from '@mui/material';
import Profile from './Profile';
import { setUserToken, unSetUserToken } from './features/authSlice';
import { Button, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { incrementCount, decrementCount } from './features/activeSlice';
import { Container } from '@mui/system';
import Product from './product';
import Messages from './Messages';
import Settings from './Settings';

const Dashboard = () => {
    const count = useSelector((state) => state.active.count)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {access_token} = getToken()
    const {data, isSuccess} = useGetLoggedUserQuery(access_token)
    const [userData, setUserData] = useState({ 
        email : "", 
        name : "",
        mobile:"",
    })
    useEffect(() =>{ 
        if (data && isSuccess) { 
            setUserData({ 
                email: data.email, 
                name: data.name,
                mobile:data.mobile, }) 
            } 
        }, [data, isSuccess, dispatch])



    const [name , setName] = useState('')   
    const handleProfile = (e)=>{
        e.preventDefault()
        console.log("button Clicked")
        setName("Profile")   
    }
    const handleProduct = (e)=>{
        e.preventDefault()
        console.log("button Clicked")
        setName("Product")        
    }
    const handleMessage = (e)=>{
        e.preventDefault()
        console.log("button Clicked")
        setName("Message")  
    }
    const handleSettings = (e)=>{
        e.preventDefault()
        console.log("button Clicked")
        setName("Settings")  
    }
    const handleLogout = ()=>{ 
        // dispatch(unSetUserInfo({name:'', email: ''})) 
        dispatch(unSetUserToken({
            access_token: null
        })) 
        removeToken() 
        navigate('/') 
    }
    
    
  return (
    <>
    <Grid container spacing={1} sx={{border:'2px solid green', mt:10}}>
        <Grid item xs={1} sx={{border:'2px solid red', m:2}}>
            <div><Button variant='contained' size='small' sx={{my:1}} onClick={handleProfile}>Profile</Button></div>
            <div><Button variant='contained' size='small' sx={{my:1}} onClick={handleProduct}>Product</Button></div>
            <div><Button variant='contained' size='small' sx={{my:1}} onClick={handleMessage}>Message</Button></div>
            <div><Button variant='contained' size='small' sx={{my:1}} onClick={handleSettings}>Settings</Button></div>
            <div><Button variant='contained' size='small' sx={{my:1}} onClick={handleLogout}>Logout</Button></div>
            {/* <div><Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)}}>Settings</Button></div>
            <div><Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)}}>Settings</Button></div>
            <Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)} }>Settings</Button>
            <Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)}}>Settings</Button>
            <Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)}}>Settings</Button>
            <Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)}}>Settings</Button>
            <Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)}}>Settings</Button>
            <Button variant='contained' size='small' sx={{my:1}} onClick={()=>{setActive(true)}}>Settings</Button> */}
        </Grid>
        <Grid id='content' item xs={10} sx={{border:'2px solid red', m:2}}>
        
        {/* { active ? <Profile /> : <Settings />} */}

        {
            (()=>{
                switch(name){
                    case "Profile" : return <Profile />
                    case "Product" : return <Product />
                    case "Message" : return <Messages />
                    case "Settings" : return <Settings />
                }
            })()
        }

        </Grid>
    </Grid>
    <Box sx={{mt:8, border:'2px solid orange'}}>
    {userData.email}
    <br />
    {userData.name}
    <br />
    {userData.mobile}
    <br />
    <h1>Dashboard</h1>
    <Button onClick={() => {dispatch(incrementCount())}}> + </Button>{count}<Button onClick={() => {dispatch(decrementCount())}}> - </Button>
    <Button className='button_home' onClick={handleLogout} size='small' variant="contained">Logout</Button>

    </Box>

    </>
  )
}

export default Dashboard