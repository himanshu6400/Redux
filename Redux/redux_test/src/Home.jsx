import { Button, Grid, Typography } from '@mui/material'
import pic2 from '../src/images/pic2.jpg'
import pic5 from '../src/images/pic5.jpg'
import './home.css'
import LoginRegistration from './LoginRegistration'
import Homeintro from './Homeintro'
import { useSelector, useDispatch } from 'react-redux'
import { setActive } from './features/activeSlice'
import { useGetLoggedUserProfileDataQuery } from './services/UserAuthApi'
import { getToken, removeToken } from './services/LocalStorageService'; 
import { unSetUserToken } from './features/authSlice';

function Home() {

  const active = useSelector((state) => state.active.active)
  const {access_token} = getToken()  
  return (
    <>    
    <Grid container sx={{
        backgroundImage:`url(${pic2})`,
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        backgroundSize:'cover',
        height:'100vh',
        position: 'relative',
        }}>
            <Grid item sm={1}>

            </Grid>
        <Grid item sm={4} marginTop={10}>
          {active ? <LoginRegistration /> : <Homeintro />}
    
        </Grid>
        <Grid item sm = {7}>
          


        </Grid>

    </Grid>
    </>
    
  )
}

export default Home