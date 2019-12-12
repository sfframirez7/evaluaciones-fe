import React from 'react';
import Router from './components/router/AppRouter'
// import Welcome from './components/pages/welcome/Welcome'
import Welcome from './components/welcome/Welcome'
import CambiarContrasenaPage from './components/cambiarContrasena/CambiarContrasenaPage'
import {JwtPayload} from './config/config'


import './App.css';

function App() {


    if (IsLoggedIn()) {
        return LoggedId()
    } else {
        return NoLoggedIn()
    }
}

function IsLoggedIn() {
    var token = localStorage.getItem("usr_token") 

    if (token && token != null)
        return true
    else
        return false
}

function LoggedId() {
    var payload = JwtPayload()

    try {
        if(payload && payload.usuario.CambiarClave)    
        {
            return <CambiarContrasenaPage/>
        }
        else {
            return <Router />
        }
    } catch (error) {
        
    }

    
}

function NoLoggedIn() {
    return <Welcome />
}

export default App;