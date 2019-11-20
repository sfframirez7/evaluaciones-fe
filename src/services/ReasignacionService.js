import { axios, store, JwtPayload } from '../config/config'
import Swal from "sweetalert2";



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
    asignacion.IdUsuarioModifico = usuario

    return axios.post('/NewReasignacion', asignacion)
        .then(res => {
            store.dispatch({ type: 'LOAD_COLABORADORES', data: [] })
            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });

            ObtenerReasignaciones()
            RemoverFromListService()

        }).catch((error) => {
            console.log(error)
        })


}



export const RemoverReasignacion = (IdAginacion) => {
    return axios.get('/deleteReasignacion/' + IdAginacion)
        .then(res => {

            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });

            ObtenerReasignaciones()

        }).catch((error) => {
            console.log(error)
            this.setState({ cargando: false });
        })

}


export const RemoverFromListService = () => {
    var colaborador = {
        nombreColaborador: "",
        colaboradorId: 0
    }

    store.dispatch({ type: 'SELECT_COLABORADOR', data: colaborador })
}

export const FilterReasignacionService = (txtBuscar) => {

    console.log(txtBuscar)
        // var colaborador = {
        //     nombreColaborador: "",
        //     colaboradorId: 0
        // }


    store.dispatch({ type: 'REASIGNACIONES_FILTER', data: { txtBuscar } })
}