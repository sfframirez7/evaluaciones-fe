const intialState = {
    evluacionId: 0,
    evaluacion: "",
    evaluacionDetalle: ""
}

const EvaluacionSelectedReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'SELECT_EVALUACION':
            return action.data;
        default:
            return state;
    }

}


export default EvaluacionSelectedReducer;