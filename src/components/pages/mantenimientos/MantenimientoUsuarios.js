import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import { ObtenerUsuariosService, ResetearContrasenaService, ActualizarUsuarioActivarService } from '../../../services/UsuarioService';
import Loading from '../../common/Loading';
import { IsNumber } from '../../../services/IsNumber';

import Swal from "sweetalert2";

class MantenimientoUsuarios extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            usuarios : [],
            usuariosLoaded : [],
            nuevaContrasena: ""
        }
        
        this.ObtenerUsuarios = this.ObtenerUsuarios.bind(this)
        this.FiltarUsuarios = this.FiltarUsuarios.bind(this)
        this.ResetearContrasena = this.ResetearContrasena.bind(this)
    }


    componentDidMount()
    {
        this.ObtenerUsuarios()
    }

    ObtenerUsuarios()
    {
        this.setState({ cargando : true})

        ObtenerUsuariosService()
        .then((res) => {
            this.setState({usuarios : res.data, usuariosLoaded : res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }


    ResetearContrasena(usuario, colaboradorId)
    {
        this.setState({ cargando : true})

        var data = {
            "ColaboradorId": colaboradorId,
            "ClaveNueva": "",
            "Usuario": usuario,
            "ModificadoPor": "",
        }

        ResetearContrasenaService(data)
        .then((res) => {
            Swal.fire({
                title: 'Información actualizada exitosamente',
                icon: 'success',
                text: "Éxito"
            });
            this.setState({nuevaContrasena : res.data, cargando : false})
            this.ObtenerUsuarios()

        }).catch((err) => {
            this.setState({ cargando : false})
            Swal.fire({
                title: 'Algo ha salido mal',
                icon: 'error',
                text: "Error"
            });
        });
    }


    FiltarUsuarios(event)
    {
        this.setState({cargando: true})
        var txtBuscar = event.target.value
        var data = this.state.usuariosLoaded.filter((usuario) => {
            if(IsNumber(txtBuscar))
            {
                if (usuario.Usuario.toString().indexOf(txtBuscar) > -1 )
                    return true
                else
                    return ""   
            }
            else 
            {
                if (usuario.Nombre.toString().toLowerCase().indexOf(txtBuscar.toLowerCase()) > -1 )
                    return true
                else
                    return ""
                }
            })

        this.setState({usuarios :data, cargando:false })
    }


    ToggleActivarColaborador(usuario, Activar)
    {
        var data = {
            Usuario : usuario.toString(),
		    Activar : Activar
        }

        ActualizarUsuarioActivarService(data)

        .then((res) => {
            this.ObtenerUsuarios()
            Swal.fire({
                title: 'Información actualizada exitosamente',
                icon: 'success',
                text: "Éxito"
            });


        }).catch((err) => {
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
                        <li className="breadcrumb-item active" aria-current="page">Usuarios</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Usuarios
                </h2>
                
                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-right p-1 m-1">
                        
                    <Link to={{ pathname: '/settings/nuevoUsuario', }}>
                            <button 
                                    className="btn btn-primary collapsed" 
                                    type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <span className="m-1">
                                        Nuevo usuario
                                    </span>
                            </button>
                        </Link>


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

                <div className="row p-2">
                    <div className="col-12 col-md-4 offset-md-4 text-center">
                        <h4 className="card-title font-weight-bold">Buscar:</h4>                
                        <input 
                            className="form-control form-control-md " 
                            type="text" 
                            onChange={this.FiltarUsuarios}
                            placeholder="Nombre ó código" />  
                    </div>
                </div>

                
                <div className="row">
                    <div className="col">

                        <div style={{overflowX: 'auto'}}>

                            <table className="table table-striped table-hover table-sm bg-white" >
                                    <thead>
                                        <tr>
                                            <th>Usuario</th>
                                            <th>Colaborador</th>
                                            <th>Activo</th>
                                            <th>Admin</th>
                                            <th>Cambiar Contrasena</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {this.state.usuarios.map((usuario, index)=> {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {usuario.Usuario}
                                                    </td>
                                                    <td>
                                                        {usuario.Nombre}
                                                    </td>
                                                    <td>
                                                        {usuario.UsuarioActivo ? (<i className="fa fa-check-square text-success" aria-hidden="true"></i>) : (
                                                            (<i className="fa fa-times-circle text-danger" aria-hidden="true"></i>)
                                                        )}
                                                    </td>
                                                    <td>
                                                        {usuario.PerfilId === 1 ? (<i className="fa fa-check-square text-success" aria-hidden="true"></i>) : (
                                                            (<i className="fa fa-times-circle text-danger" aria-hidden="true"></i>)
                                                        )}
                                                    </td>
                                                    <td>
                                                        {usuario.CambiarClave ? (<i className="fa fa-check-square text-success" aria-hidden="true"></i>) : (
                                                            (<i className="fa fa-times-circle text-danger" aria-hidden="true"></i>)
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-info"
                                                            onClick={()=> this.ResetearContrasena(usuario.Usuario, usuario.ColaboradorId)}>
                                                                <i className="fa fa-key" aria-hidden="true"></i>
                                                                <span>
                                                                    Rst. contraseña
                                                                </span>
                                                        </button>

                                                        {usuario.UsuarioActivo ? 
                                                        (
                                                            <button className="btn btn-danger m-1"
                                                                onClick={() => this.ToggleActivarColaborador(usuario.Usuario,false)}>
                                                                <i className="fa fa-times " aria-hidden="true"></i>
                                                                <span>
                                                                    Desactivar
                                                                </span>
                                                            </button>
                                                        ) : 
                                                        (
                                                            <button className="btn btn-success m-1"
                                                                onClick={() => this.ToggleActivarColaborador(usuario.Usuario,true)}>
                                                                <i className="fa fa-check" aria-hidden="true"></i>
                                                                <span>
                                                                    Activar
                                                                </span>
                                                            </button>
                                                        )}


                                                    </td>
            
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
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
)(MantenimientoUsuarios);