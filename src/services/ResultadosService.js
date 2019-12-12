import { axios ,store, JwtPayload} from '../config/config'



export const ObtenerResultadosService = (IdColaborador) => {

    return axios.get('/GetResultadosEvaluacionesHistoricas/' + IdColaborador)

}

export const ObtenerRptCompetenciasConductualesService = (IdColaborador) => {

    return axios.get('/GetRptCompetencias/' + IdColaborador)
}

export const VerResumenService = ()=>
{
    var user = JwtPayload().usuario
    var usuario = user.IdColaborador
    
    ObtenerResultadosService(usuario)
    .then((res) => {
        store.dispatch({ type:'LOAD_REPORTE_GENERAL', data: res.data})
    }).catch((err) => {
        
    });

}
