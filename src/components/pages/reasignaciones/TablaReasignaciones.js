import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from "sweetalert2";

import {RemoverReasignacionService, ObtenerReasignaciones} from '../../../services/ReasignacionService'
import Loading from '../../common/Loading';
import NoData from '../../common/NoData';

class TablaReasignaciones extends Component {


    constructor() {
        super();

        this.state ={
            cargando : false
        }
        
        this.RemoverReasignacion = this.RemoverReasignacion.bind(this)
        this._ObtenerReasignaciones = this._ObtenerReasignaciones.bind(this)
    }


    RemoverReasignacion(IdAginacion)
    {
        this.setState({cargando : true})

        RemoverReasignacionService(IdAginacion)
        .then(res => {
            this.setState({cargando : false})
            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });

            this._ObtenerReasignaciones()

        }).catch((error) => {
            this.setState({cargando : false})
            console.log(error)
            this.setState({ cargando: false });
        })
        
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
                  <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} />
                        </div>
                    </div>


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
                                Modifica por
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
                                            onClick={() => this.RemoverReasignacion(colaborador.IdAsignacion)}>
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

                    <div className="col text-center">
                        <NoData NoData={this.props.reasignaciones.length === 0 && !this.state.cargando}/>
                    </div>


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