import { axios, store } from '../config/config'


// export const ObtenerAreasService = () => {

//     return axios.get('/GetGetAreasConSuGrado' )
// }

export const ObtenerGrados = () => {

    axios.get('/GetGetGrados')
    .then((res) => {
        store.dispatch({ type: 'LOAD_AREAS', data: res.data })
    }).catch((err) => {
        console.log(err)
    });
}

export const UpdateAreaGrado = (areaGrado) => {

   return axios.post('/UpdateGradoArea', areaGrado)
  
}
export const ObtenerAreasService = () => {
   return axios.get('/GetAreas')
}