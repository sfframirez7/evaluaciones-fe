import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ObtenerReasignaciones} from '../../../services/ReasignacionService'

import TituloPrincipal  from '../../common/TituloPrincipal'
import TablaReasignaciones from './TablaReasignaciones'
import NuevaAsignacion from './NuevaAsignacion'

class Reasignaciones extends Component {

    constructor(props) {
        super(props);

        this.state = {
            colaboradores : [],
            cargando : false,
            reasignaciones : this.props.reasignaciones,
            reasignacionesLoaded : this.props.reasignacionesLoaded,
            txtBuscar : ""
        }

        this.BuscarColaborador = this.BuscarColaborador.bind(this)
      
        
    }


    componentDidMount()
    {
        ObtenerReasignaciones()
    }


    UNSAFE_componentWillReceiveProps(newProps)
    {
        this.setState( { reasignaciones: newProps.reasignaciones })
        this.setState( {  reasignacionesLoaded : newProps.reasignacionesLoaded })
    }


    BuscarColaborador(event)
    {
        var txtBuscar = event.target.value
        this.setState( { txtBuscar : txtBuscar })

            var data = this.state.reasignacionesLoaded.filter((colaborador) => {
                if (colaborador.NombreColaborador.toString().toLowerCase().indexOf(txtBuscar) > -1)
                    return true
                else
                    return ""
            })

            this.props.dispatch({ type: 'LOAD_REASIGNACIONES', data: data })


        // FilterReasignacionService(txtBuscar)
    }
    


  
    render() {
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Reasignaciones"/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-right p-1 m-1">
                            
                            <button 
                                className="btn btn-primary collapsed" 
                                type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                <span className="m-1">
                                    Nueva
                                </span>
                            </button>
                           

                        </div>
                    </div>
                   
                    <div className="row mb-4">
                        <div className="col">
                            <div className="collapse" id="collapseExample" >
                                <div className="card bp-card" >
                                    <NuevaAsignacion/>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="col-12 col-md-4 offset-md-4 text-center">
                                                        
                            <input 
                                className="form-control form-control-md" 
                                type="text" 
                                placeholder="Nombre..."
                                onChange={this.BuscarColaborador}
                                value={ this.state.txtBuscar }/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12  ">
                            <TablaReasignaciones/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}



function mapStateToProps(state) {

    
    return {
        reasignaciones: state.ReasignacionesReducer,
        reasignacionesLoaded: state.ReasignacionesLoadedReducer
    };
}

export default connect(
    mapStateToProps,
)(Reasignaciones);