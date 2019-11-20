import { combineReducers } from 'redux'
import ColaboradoresReducer from './ColaboradoresReducer'
import ReasignacionesReducer from './ReasignacionesReducer'
import SubAreasReducer from './SubAreasReducer'
import ColaboradorSelectedReducer from './ColaboradorSelectedReducer'
import ReasignacionesLoadedReducer from './ReasignacionesLoadedReducer'
import EvaluacionSelectedReducer from './EvaluacionSelectedReducer'


export default combineReducers({

    ColaboradoresReducer,
    ReasignacionesReducer,
    SubAreasReducer,
    ColaboradorSelectedReducer,
    ReasignacionesLoadedReducer,
    EvaluacionSelectedReducer

})