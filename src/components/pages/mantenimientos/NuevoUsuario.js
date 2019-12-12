import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import {Link} from 'react-router-dom'
import { ObtenerColaboradoresSinUsuarioService } from '../../../services/ColaboradoresService';
import Loading from '../../common/Loading';
import NoData from '../../common/NoData'
import { CrearUsuarioService } from '../../../services/UsuarioService';

import Swal from "sweetalert2";


class NuevoUsuario extends Component {

    
    constructor(props) {
        super(props);
        
        this.state = {
            cargando: false,
            colaboradores : [],
            colaboradoresLoaded : [],
            nuevaContrasena : ""

        }

        this.ObtenerColaboradores = this.ObtenerColaboradores.bind(this)
        this.CrearUsuario = this.CrearUsuario.bind(this)

    }

    componentDidMount()
    {
        this.ObtenerColaboradores()
    }

    ObtenerColaboradores()
    {
        this.setState({ cargando : true})
        ObtenerColaboradoresSinUsuarioService()
        .then((res) => {
            this.setState({colaboradores: res.data, colaboradoresLoaded : res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }


    CrearUsuario(usuario, colaboradorId)
    {
        this.setState({cargando : true})

        var data = {
            Usuario : parseInt( usuario),
            ColaboradorId : parseInt( colaboradorId),
            Clave         :"",
            AgreadoPor    :0,
            CambiarClave  : true
        }

        CrearUsuarioService(data)
        .then((res) => {
            Swal.fire({
                title: 'Información actualizada exitosamente',
                icon: 'success',
                text: "Éxito"
            });
            this.setState({nuevaContrasena : res.data, cargando : false})
            this.ObtenerColaboradores()

        }).catch((err) => {
            this.setState({ cargando : false})
            Swal.fire({
                title: 'Algo ha salido mal',
                icon: 'error',
                text: "Error"
            });
        });
    }

    render() {
        return (
            <div>
                 <nav aria-label="breadcrumb bg-white d-print-none">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/settings', }}>
                                Mantenimientos
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/settings/usuarios', }}>
                                Usuarios
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Nueva usuario</li>
                    </ol>
                </nav>


                <h2 className="text-center font-weight-bold">
                    Nuevo usuario
                </h2>

                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>
                
                <div className={"row " +(this.state.nuevaContrasena !== "" ? "" : "d-none") }>
                    <div className="col-12 col-md-8 offset-md-2 text-center">
                        <div className="alert alert-primary alert-dismissible fade show " role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            Nueva contraseña generada: <strong>{this.state.nuevaContrasena}</strong> 
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h3 className="">
                            Colaboradores sin usuario:
                        </h3>
                    </div>
                </div>

                
                <div className="row mt-2">
                        <div className="col-12 ">
                            
                            <table id="tbtMantenimientoColaboradores" className="table table-striped table-hover bg-white">
                                    <thead>
                                        <tr>
                                            <th>
                                                Código
                                            </th>
                                            <th>
                                                Nombre
                                            </th>
                                            <th>
                                                Activo
                                            </th>
                                            <th>
                                                Ingreso
                                            </th>
                                            <th>
                                                Cargo
                                            </th>
                                            <th>
                                                Área
                                            </th>
                                            <th>
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.colaboradores.map((colaborador, index)=> {
                                            return (

                                                <tr key={index}>
                                                    <td>
                                                        {colaborador.IdColaborador}
                                                    </td>
                                                    <td>
                                                        {colaborador.Nombre}
                                                    </td>
                                                    <td>
                                                        {colaborador.Activo ? (<i className="fa fa-check-square text-success" aria-hidden="true"></i>) : (
                                                            (<i className="fa fa-times-circle text-danger" aria-hidden="true"></i>)
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Moment add={{ days: 1 }} format="YYYY/MM/DD" >{colaborador.FechaIngreso}</Moment>
                                                    </td>
                                                    <td>
                                                        {colaborador.Cargo}
                                                    </td>
                                                    <td>
                                                        {colaborador.Area}
                                                    </td>
                                                    <td>
                                                    <button 
                                                            type="button" 
                                                            className="btn btn-info"
                                                            onClick={()=> this.CrearUsuario(colaborador.IdColaborador,colaborador.IdColaborador)}>
                                                                Crear usuario
                                                        </button>
                                                        
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                            </table>

                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col text-center">
                            <NoData NoData={this.state.colaboradores.length === 0 && !this.state.cargando}/>
                            
                        </div>
                    </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(NuevoUsuario);