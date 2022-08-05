import React from 'react'
import "./App.css"
import Home from './Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './Layout'
import Login from './Login'
import Logout from './Logout'
import Registration from './Registration'
import LoginRegistration from './LoginRegistration'
import Profile from './Profile'
import Settings from './Settings'
import { useSelector } from 'react-redux';
import Messages from './Messages'
import Dashboard from './Dashboard'
import Product from './product'
import EditProfile from './EditProfile'


const App = () => {
  const { access_token } = useSelector(state => state.auth)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={!access_token ? <Home /> : <Navigate to= '/dashboard'/>} /> 
          <Route path ='loginregistration' element= {!access_token ? <LoginRegistration /> : <Navigate to ='/dashboard' />} />
          <Route path ='login' element= {<Login />} />
          <Route path ='registration' element= {<Registration />} />                        
          <Route path='dashboard' element={access_token ? <Dashboard /> : <Navigate to ='/' />} />
          <Route path ='profile' element= {<Profile />} />
          <Route path ='profile' element= {<Profile />} />
          <Route path ='product' element= {<Product />} />
          <Route path ='settings' element= {<Settings />} />
          <Route path ='messages' element= {<Messages />} />
          <Route path ='logout' element= {<Logout />} />
          <Route path ='editprofile' element= {<EditProfile />} />
        </Route>
        <Route path ='*' element= {<h1>Error 404 page Not Found</h1>} />
      </Routes>          
    </BrowserRouter>   
    </>
  )
}

export default App