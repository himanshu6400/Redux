import { AppBar, Box, Toolbar, Button,Typography, Avatar,Menu } from '@mui/material'
import React, {useState, useEffect } from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { unSetActive } from './features/activeSlice'
import { getToken, removeToken } from './services/LocalStorageService';
import { setUserToken, unSetUserToken } from './features/authSlice';
import { useGetLoggedUserProfileDataQuery} from './services/UserAuthApi'


function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {access_token} = getToken()
  const {data, isSuccess} = useGetLoggedUserProfileDataQuery(access_token) 
  const [userData, setUserData] = useState({  
    profile_image : '',
  })
  useEffect(() =>{ 
    if (data && isSuccess) { 
      setUserData({   
        profile_image: data.profile_image          
      }) 
    } 
  }, [data, isSuccess])
  const handleLogout = ()=>{ 
    // dispatch(unSetUserInfo({name:'', email: ''})) 
        dispatch(unSetUserToken({
            access_token: null})) 
    removeToken() 
    navigate('/') 
    }
  return (
    <>
    <Box sx={{flexGrow:1}}>
      <AppBar position="fixed">
        <Toolbar sx={{backgroundColor:'rgba(0, 0, 0, 0.8)'}}>
          <Typography variant="h5" component="div" sx={{flexGrow:1}}> Himanshu Ecom Project </Typography>

          {access_token ? <Button component={NavLink} to="/dashboard" onClick={() => {dispatch(unSetActive())}} style={({isActive})=>{return {backgroundColor:isActive ? 'red' :''}}} sx={{color:'white', textTransform:'none' ,mx:2}}>Dashboard</Button> : <Button component={NavLink} to="/" onClick={() => {dispatch(unSetActive())}} style={({isActive})=>{return {backgroundColor:isActive ? 'red' :''}}} sx={{color:'white', textTransform:'none'}}>Home</Button>}
          {access_token ? <Avatar sx={{ width: 56, height: 56, mx:2 }} src={userData.profile_image} alt="user1" />  : '' }
          {access_token ? <Button component={NavLink} to="/" onClick={handleLogout} style={({isActive})=>{return {backgroundColor:isActive ? 'red' :''}}} sx={{color:'white', textTransform:'none', mx:2}}>Logout</Button> : ''}


        </Toolbar>
        
      </AppBar>
        
      <Outlet />
    </Box>
    </>
  )
}

export default Navbar