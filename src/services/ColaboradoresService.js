import { axios, JwtPayload } from '../config/config'

export const ObtenerColaboradorespendientesService = (idEvaluacionAnual) => {

    return axios.get('/GetColaboradoresPendientesCompletarEvaluacion/' + idEvaluacionAnual)
}

export const ObtenerEquipoPorEvaluacion = (evluacionId) => {
    
    var user = JwtPayload().usuario      
    var  usuario = user.IdColaborador
        
    return  axios.get('/GetEquipoEvaluacion/'+usuario+"/"+evluacionId )
}