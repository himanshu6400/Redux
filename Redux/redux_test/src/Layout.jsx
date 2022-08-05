 
import { CssBaseline, Grid } from '@mui/material'; 
import React from 'react'; 
import Navbar from './Navbar'; 
import { Box } from '@mui/system';

const Layout = () => {
  return (
    <>
    <CssBaseline />
    <Box sx={{flexgrow:1}}> 
        <Grid container spacing={2}> 
            <Grid item xs={12} sx={{mb:8}}> 
                <Navbar /> 
            </Grid> 
        </Grid>
    </Box> 
    
    
    </>
  )
}

export default Layout