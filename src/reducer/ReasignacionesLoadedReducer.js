const intialState = []


const ReasignacionesLoadedReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_REASIGNACIONES_HARD':
            return action.data;
        default:
            return state;
    }

}


export default ReasignacionesLoadedReducer;