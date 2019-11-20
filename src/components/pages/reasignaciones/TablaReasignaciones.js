import React, { Component } from 'react';
import { connect } from 'react-redux';


import {RemoverReasignacion, ObtenerReasignaciones} from '../../../services/ReasignacionService'

class TablaReasignaciones extends Component {


    constructor() {
        super();
        
        this.RemoverReasignacion = this.RemoverReasignacion.bind(this)
        this._ObtenerReasignaciones = this._ObtenerReasignaciones.bind(this)
    }


    RemoverReasignacion(IdAginacion)
    {
        RemoverReasignacion(IdAginacion)
        
    }

    _ObtenerReasignaciones()
    {
        ObtenerReasignaciones()
        .then(res => {
            this.props.dispatch({type:'LOAD_REASIGNACIONES', data: res.data}) 
            this.setState({colaboradores :res.data , cargando : false})

        }).catch((error) => {
            console.log(error)
            this.setState({ cargando: false });
        })
    }


    render() {
        return (

            <div className="bg-white" style={{overflow:'auto'}}>

                <table className="table table-striped table-hover  bg-white ">
                    <thead>
                        <tr>
                            <th>
                                Código
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                               Área Origen
                            </th>
                            <th>
                                Área Destino
                            </th>
                            <th>
                                Modifico por
                            </th>
                            
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {this.props.reasignaciones.map((colaborador, index)=>{
                            return (
                                <tr key={index}>
                                    <th>
                                        {colaborador.IdColaborador}
                                    </th>
                                    <td>
                                        {colaborador.NombreColaborador}
                                    </td>
                                    <td>
                                        {colaborador.SubAreaOrigen}
                                    </td>
                                    <td>
                                        {colaborador.SubAreaDestino}
                                    </td>
                                    <td>
                                        {colaborador.Modifica}
                                    </td>
                                    <td>
                                        <button 
                                            className=" btn btn-danger m-1" 
                                            data-toggle="tooltip" 
                                            data-placement="top" 
                                            title="Elimar de reasignaciones" 
                                            // onClick={() => Prueba()}>
                                            onClick={() => RemoverReasignacion(colaborador.IdAsignacion)}>
                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            {/* <span className="m-1">
                                                Eliminar
                                            </span> */}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        );
    }
}


function mapStateToProps(state) {
    
    
    return {
        reasignaciones : state.ReasignacionesReducer,
    };
}


export default connect(
    mapStateToProps,
)(TablaReasignaciones);