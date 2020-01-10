
import { axios } from '../config/config'

export const ObtenerReporteReseteoDeNota = (pagina=1) => {
    return axios.get('/RptReseteoDeNota/'+pagina)
}