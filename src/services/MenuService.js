import {  axios, Token } from '../config/config'

export const LoadOpcionesDeMenuService = () => {

    // var data = JwtPayload().menu
    var data = JSON.parse(localStorage.getItem("opciones_menu"))

    if(!data)   
    {
        return []
    }
    return data
}


export const ObtenerOpcionesDeMenu = () => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${Token()}`
    return axios.get('/GetOpcionesDeMenu')
            

}