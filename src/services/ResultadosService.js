import { axios } from '../config/config'



export const ObtenerResultadosService = (IdColaborador) => {

    return axios.get('/GetResultadosEvaluacionesHistoricas/' + IdColaborador)

}