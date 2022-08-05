import React from 'react'
import { Tabs, Tab, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import Login from './Login';
import Registration from './Registration';
import './home.css'

const TabPanel = (props) =>{
    const {children, index, value} = props
    return (
        <div role='tabpanel' hidden={ value !== index }> 
            { value === index && ( <Box>{children}</Box> ) } 
        </div>
    )

}

const LoginRegistration = ()=> {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) =>{
        setValue(newValue)
    }

  return (

    <>
    <Tabs value = {value} onChange={handleChange}>
        <Tab label='Login' sx={{textTransform:'none', color:'yellow', fontWeight:'bold'}}> </Tab>
        <Tab label='Registration' sx={{textTransform:'none', color:'yellow', fontWeight:'bold'}}></Tab>                                 
    </Tabs>
    <TabPanel  value= {value} index={0}><Login color='blue' /></TabPanel>
    <TabPanel  value= {value} index={1}><Registration color='blue' /></TabPanel>
    </>
  )
}

export default LoginRegistration