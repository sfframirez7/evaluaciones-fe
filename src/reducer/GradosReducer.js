const intialState = []

const GradosReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_AREAS':
            return action.data;
        default:
            return state;
    }

}


export default GradosReducer;