import { axios } from '../config/config'

export const CambiarcontrasenaService = (data) => {

    return axios.post('/CambiarContrasena', data)

}

export const ObtenerUsuariosService = () => {
    return axios.get('/GetUsuarios')
}


export const ResetearContrasenaService = (data) => {
    return axios.post('/ResetearContrasena', data)
}

export const CrearUsuarioService = (data) => {
    return axios.post('/CreateUsuario', data)
}

export const ActualizarUsuarioActivarService = (data) => {
        
    return  axios.post('/UpdateUsuarioActivar', data)
}
