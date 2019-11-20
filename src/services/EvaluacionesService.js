import { axios, JwtPayload } from '../config/config'

import data from "./evaluacionFull.json"

export const LoadJsonService = () => {

    return data

}


export const ObtenerTodasEvaluacionesAnualesService = () => {

    return axios.get('/GetEvaluacionesTodas')
}

export const ObtenerEvaluacionesService = () => {

    var user = JwtPayload().usuario
    var usuario = user.IdColaborador

    return axios.get('/GetEvaluacionAnual/' + usuario)
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
    evaluacion.IdSubArea = parseInt(user.IdSubArea)

    console.log(evaluacion)

    return axios.post('/NuevaEvaluacionPorMeta', evaluacion)
}