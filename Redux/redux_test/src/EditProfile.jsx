import { Box, Button, TextField, Card, Alert, Typography, MenuItem, Stack ,FormControl,InputLabel,IconButton  } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, {useState} from 'react'
import { useEditprofileMutation } from './services/UserAuthApi'
import {storeToken} from './services/LocalStorageService'
import './home.css'
import { useNavigate } from 'react-router-dom';
import { getToken } from './services/LocalStorageService';

function EditProfile(props) {
    const { access_token } = getToken()
    
    const [server_error, setServer_error] = useState({})
    const [registerUser, { isLoading }] = useEditprofileMutation()
    const navigate = useNavigate()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actutalData = {
            gender: data.get('gender'),
            locality: data.get('locality'),
            city: data.get('city'),
            address: data.get('address'),
            pin: data.get('pin'),
            state: data.get('state'),
            profile_image: data.get('profile_image'),
        }

        const res = await registerUser(actutalData, access_token)
        if (res.error){
            setServer_error(res.error.data.errors)
        }         
    }
    const [gender, setGender] = React.useState('');
    const [state, setState] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
    };
    const handleState = (event: SelectChangeEvent) => {
        setState(event.target.value);
    };
  return (
    <>
    <Card sx={{backgroundColor:'rgba(0, 0, 0, 0.6)', border: '2px solid orange', m:8,align:'center',  maxWidth:400 }} >
        <Box className = 'transbox' component='form' onSubmit={handleSubmit} noValidate id='login-id' sx={{mt:1, boxShadow:12, p:1}}>
            <Typography color={props.color} sx={{mt:1, textAlign:'center', fontWeight:'bold'}} variant='h5' container='div'>Edit Profile</Typography>


            <FormControl fullWidth required sx={{py:1}}>
                <InputLabel id="demo-simple-select-required-label">Gender</InputLabel>
                <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required" value={gender}   label="Gender *" onChange={handleChange} size='small' >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    <MenuItem value='Transgender'>Transgender</MenuItem>
                    </Select>
            </FormControl>
            {server_error.gender ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.gender[0]}</Typography>:'' }
            <TextField fullWidth required label='locality' color='warning' id='login-locality-id' name='locality' margin='normal' size='small' /> 
            {server_error.locality ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.locality[0]}</Typography>:'' }
            <TextField fullWidth required label='city' sx={{color :'black'}} id='login-city-id' name='city' margin='normal' size='small' /> 
            {server_error.city ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.city[0]}</Typography>:'' }
            <TextField fullWidth required label='address' color='warning' type= 'address' id='login-address-id' name='address' margin='normal' size='small' />
            {server_error.address ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.address[0]}</Typography>:'' } 
            <TextField fullWidth required label='pin' color='warning' id='editprofile-pin-id' name='pin' margin='normal' size='small' />
            {server_error.pin ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.pin[0]}</Typography>:'' }


            <FormControl fullWidth required sx={{py:1}}>
                <InputLabel id="demo-simple-select-required-label">State</InputLabel>
                <Select labelId="demo-simple-select-required-label" id="demo-simple-select-required" value={state}   label="State *" onChange={handleState} size='small' >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value='Bihar'>Bihar</MenuItem>
                    <MenuItem value='Chhattisgarh'>Chhattisgarh</MenuItem>
                    <MenuItem value='Gujarat'>Gujarat</MenuItem>
                    </Select>
            </FormControl>
            {server_error.state ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.state[0]}</Typography>:'' }
            <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                
                </IconButton>
            </Stack>
            {server_error.profile_image ? <Typography style={{fontSize:12, paddingLeft:10, color:'red'}}>{server_error.profile_image[0]}</Typography>:'' }

           
            <Box sx={{textAlign:'center'}}>
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, ps:5}}>Submit</Button>
            </Box>
            {server_error.non_field_errors ? <Alert severity= 'error' > {server_error.non_field_errors[0]} </Alert> : '' }               
        </Box>
    </Card>
    </>
  )
}

export default EditProfile