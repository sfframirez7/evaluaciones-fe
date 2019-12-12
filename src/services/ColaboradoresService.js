import { axios, JwtPayload } from '../config/config'

export const ObtenerColaboradorespendientesService = (idEvaluacionAnual) => {

    return axios.get('/GetColaboradoresPendientesCompletarEvaluacion/' + idEvaluacionAnual)
}

export const ObtenerReporteGeneralService = (idEvaluacionAnual) => {

    return axios.get('/GetRptResumenGeneral/' + idEvaluacionAnual)
}

export const ObtenerReporteGeneralPorEquipoService = (idEvaluacionAnual) => {

    return axios.get('/GetRptResumenGeneralPorEquipo/' + idEvaluacionAnual)
}

export const ObtenerEquipoPorEvaluacion = (evluacionId) => {
    
    var user = JwtPayload().usuario      
    var  usuario = user.IdColaborador
        
    return  axios.get('/GetEquipoEvaluacion/'+usuario+"/"+evluacionId )
}

export const ObtenerCargosGradosService = () => {
        
    return  axios.get('/GetCargosGrados')
}
export const UpdateCargosGradosService = (data) => {
        
    return  axios.post('/UpdateCargosGrados', data)
}

export const ObtenerColaboradoresPorCargoService = (AreaId) => {
        
    return  axios.get('/getColaboradoresPorArea/'+AreaId)
}

export const ColaboradoresPorCargoService = (AreaId) => {
        
    return  axios.get('/GetColaboradoresPorCargo/'+AreaId)
}

export const ColaboradoresConCargoService = () => {
        
    return  axios.get('/GetColaboradoresCargo')
}

export const ObtenerColaboradoresInfoService = () => {
        
    return  axios.get('/GetColaboradoresInfo')
}

export const ObtenerColaboradoresSinUsuarioService = () => {
        
    return  axios.get('/GetColaboradoresSinUsuario')
}

export const ActualizarColaboradorActivarService = (data) => {
        
    return  axios.post('/UpdateColaboradorActivar', data)
}

export const NuevoColaboradorService = (data) => {
        
    return  axios.post('/NuevoColaborador', data)
}