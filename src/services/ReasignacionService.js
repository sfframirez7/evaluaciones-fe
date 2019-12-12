import { axios, store, JwtPayload } from '../config/config'


export const ObtenerReasignaciones = () => {

    return axios.get('/reasignaciones')
        .then((res) => {
            store.dispatch({ type: 'LOAD_REASIGNACIONES', data: res.data })
            store.dispatch({ type: 'LOAD_REASIGNACIONES_HARD', data: res.data })
        }).catch((err) => {

        });
}

export const NuevaReasignacionService = (asignacion) => {

    var user = JwtPayload().usuario
    var usuario = user.IdColaborador
    asignacion.IdUsuarioModifico = usuario.toString()

    return axios.post('/NewReasignacion', asignacion)
}



export const RemoverReasignacionService = (IdAginacion) => {
    return axios.get('/deleteReasignacion/' + IdAginacion)

}


export const RemoverFromListService = () => {
    var colaborador = {
        nombreColaborador: "",
        colaboradorId: 0
    }

    store.dispatch({ type: 'SELECT_COLABORADOR', data: colaborador })
}

export const FilterReasignacionService = (txtBuscar) => {
    store.dispatch({ type: 'REASIGNACIONES_FILTER', data: { txtBuscar } })
}