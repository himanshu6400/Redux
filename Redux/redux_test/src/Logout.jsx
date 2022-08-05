import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, removeToken,storeToken } from './services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserToken, unSetUserToken } from './features/authSlice';
import { Button, Grid } from '@mui/material'


export default function Logout() {
  const navigate = useNavigate()
  const dispatch = useDispatch() 
  const handleLogout = ()=>{ 
  // dispatch(unSetUserInfo({name:'', email: ''})) 
      dispatch(unSetUserToken({
      access_token: null})) 
      removeToken() 
      navigate('/') 
  }
  <Button className='button_home' onClick={handleLogout} size='small' variant="outlined">Logout</Button>

}
