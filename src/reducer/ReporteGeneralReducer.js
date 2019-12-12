import { ColaboradorModel } from "../Models/ColaboradorModel";

const intialState = {
    Colaborador : ColaboradorModel,
                Resultados : []
}


const ReporteGeneralReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_REPORTE_GENERAL':
            return action.data;
        default:
            return state;
    }

}


export default ReporteGeneralReducer;