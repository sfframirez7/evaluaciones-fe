import { axios, JwtPayload } from '../config/config'


export const ObtenerTodasEvaluacionesAnualesService = () => {

    return axios.get('/GetEvaluacionesTodas')
}

export const ObtenerEvaluacionesService = () => {

    var user = JwtPayload().usuario
    var usuario = user.IdColaborador

    return axios.get('/GetEvaluacionAnual/' + usuario)
}

export const ObtenerEvaluacioneCompleta = (IdColaborador) => {

    return axios.get('/GetEvaluacionesCompletas/' + IdColaborador)
}

export const EvaluacionCompletadaService = (evaluacion) => {

    var user = JwtPayload().usuario
    var usuario = user.IdColaborador
    evaluacion.EvaluadoPor = parseInt(usuario)

    return axios.post('/EvaluacionCompletada', evaluacion)
}

export const NuevaEvaluacionPorMetaService = (evaluacion) => {

    var user = JwtPayload().usuario
    var usuario = user.IdColaborador
    evaluacion.CreadaPor = parseInt(usuario)
    evaluacion.ModificadaPor = parseInt(usuario)
    evaluacion.IdCargoPadre = parseInt(user.CargoId)

    return axios.post('/NuevaEvaluacionPorMeta', evaluacion)
}

export const AceptarEvaluacionService = (idEvaluacion) => {

    return axios.get('/AceptarEvaluacion/'+idEvaluacion)
}

export const NuevaEvaluacionAnual = (evaluacion) => {

    var user = JwtPayload().usuario
    var usuario = user.IdColaborador
    evaluacion.CreadaPor = parseInt(usuario)
    evaluacion.ModificadaPor = parseInt(usuario) 

    return axios.post('/NuevaEvaluacionAnual',evaluacion )
}


export const EliminarEvaluacionPorMetaService = (IdEvaluacionPorMeta) => {

    return axios.get('/EliminarEvaluacionPorMeta/'+IdEvaluacionPorMeta )
}