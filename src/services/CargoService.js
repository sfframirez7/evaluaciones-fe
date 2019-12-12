import { axios } from '../config/config'

export const ObtenerCargosService = () => {
    return axios.get('/GetCargos')
}

export const ObtenerCargosPadreYEmpresaService = () => {
    return axios.get('/GetCargosConPadreYEmpresa')
}

export const NuevoCargoService = (data) => {
    return axios.post('/NewCargo', data)
}