import { axios, store } from '../config/config'



export const ObtenerSubAreas = () => {

    return axios.get('/SubAreas')
        .then((res) => {
            store.dispatch({ type: 'LOAD_SUBAREAS', data: res.data })
        }).catch((err) => {

        });
}

export const ObtenerColaboradoresPorArea = (idSubArea) => {
    return axios.get('/GetColaboradoresSubArea/' + idSubArea)
        .then(res => {
            store.dispatch({ type: 'LOAD_COLABORADORES', data: res.data })
        }).catch((error) => {
            console.log(error)
        })

}