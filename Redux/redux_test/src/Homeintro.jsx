import React, {useState} from 'react'
import { Button, Grid } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setActive } from './features/activeSlice'


const Homeintro = () => {
  const dispatch = useDispatch()

  return (
    <>
    <div className="content">
      <h1 id='heading_home'>Welcome </h1>
      <p style={{color:'white'}}>Welcome inside universe of true active friends. Entertain yourself with the world of active friends</p>
      <h3>Just <Button className='button_home' onClick={() => {dispatch(setActive())}}  variant="outlined">Login</Button>  to say Hi to your loved one's</h3>
      <h5>Not Registered Yet. <Button className='button_home' onClick={() => {dispatch(setActive())}} size='small' variant="outlined">Join</Button> with this link </h5>
    </div>
    </>
  )
}

export default Homeintro