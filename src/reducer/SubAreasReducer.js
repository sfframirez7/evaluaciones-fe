const intialState = []


const SubAreasReducer = (state = intialState, action) => {

    switch (action.type) {
        case 'LOAD_SUBAREAS':
            return action.data;
        default:
            return state;
    }

}


export default SubAreasReducer;