const intialState = []

const ReasignacionesReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_REASIGNACIONES':
            return action.data;
        default:
            return state;
    }

}


export default ReasignacionesReducer;