import React, {useState, useEffect } from 'react'
import { useGetLoggedUserProfileDataQuery, useGetProductDataQuery } from './services/UserAuthApi'
import { getToken, removeToken } from './services/LocalStorageService'; 
import Product from './product';
import {Card,CardContent,CardActions,CardMedia,Button,Typography, Grid} from '@mui/material';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {access_token} = getToken()
  const {data, isSuccess} = useGetLoggedUserProfileDataQuery(access_token)
  const navigate = useNavigate() 
  const [userData, setUserData] = useState({  
    gender : '',
    locality : '',
    city : '',
    address : '',
    pin : '',
    state : '',
    email : "",
    profile_image : ''
  })
  // store user data in local state 
  useEffect(() =>{ 
    if (data && isSuccess) { 
      setUserData({  
        email: data.user, 
        gender: data.gender, 
        locality: data.locality, 
        address: data.address, 
        pin: data.pin, 
        city: data.city,
        state: data.state, 
        profile_image: data.profile_image, 
         
      }) 
    } 
  }, [data, isSuccess])
  return (
    <>
    <Grid container spacing={1}>
      <Grid item xs={1}>

      </Grid>
      <Grid item xs={10}>     
        {/* <Card sx={{ maxWidth: 40, borderRadius:'50%' }}>
          <CardMedia component="img"  sx={{backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center', }} image={userData.profile_image} alt="user1" /> 
        </Card>     
        <br />
        <br />  */}
 
        <Card sx={{ maxWidth: 400 }}>
          <CardMedia
         component="img"
         height="300"
         image={userData.profile_image}
         alt="user1"
       />
        <CardContent>
         <Typography gutterBottom variant="h5" component="div">
         {userData.email}
         </Typography>
         <Typography variant="body2" color="text.secondary">
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis, nostrum!
           <h5>gender of {userData.gender}</h5>
           <h5>gender of {userData.locality}</h5>
           <h5>gender of {userData.address}</h5>
           <h5>gender of {userData.city}</h5>
           <h5>gender of {userData.state}</h5>
           <h5>gender of {userData.pin}</h5>
         </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small" onClick={()=>{navigate('/editprofile')}}>Edit</Button>
        </CardActions>
      </Card>
      </Grid>
    </Grid>
    </>
  )
}

export default Profile