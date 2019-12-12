import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {ObtenerColaboradoresInfoService, ActualizarColaboradorActivarService} from '../../../services/ColaboradoresService'
import Loading from '../../common/Loading';
import BtnExportToExcel from '../../common/BtnExportToExcel';
import { IsNumber } from '../../../services/IsNumber';
import Moment from 'react-moment';

import Swal from "sweetalert2";


class MantenimientoColaboradores extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
            cargando: false,
            colaboradores : [],
            colaboradoresLoaded : [],

        }

        this.ObtenerColaboradores = this.ObtenerColaboradores.bind(this)
        this.FiltarColaboradores = this.FiltarColaboradores.bind(this)
        this.ToggleActivarColaborador = this.ToggleActivarColaborador.bind(this)

    }

    componentDidMount()
    {
        this.ObtenerColaboradores()
    }

    ObtenerColaboradores()
    {
        this.setState({ cargando : true})
        ObtenerColaboradoresInfoService()
        .then((res) => {
            this.setState({colaboradores: res.data, colaboradoresLoaded : res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }

    FiltarColaboradores(event)
    {
        this.setState({cargando: true})
        var txtBuscar = event.target.value
        var data = this.state.colaboradoresLoaded.filter((colaborador) => {
            if(IsNumber(txtBuscar))
            {
                if (colaborador.IdColaborador.toString().indexOf(txtBuscar) > -1 )
                    return true
                else
                    return ""   
            }
            else 
            {
                if (colaborador.Nombre.toString().toLowerCase().indexOf(txtBuscar.toLowerCase()) > -1 )
                    return true
                else
                    return ""
                }
            })

        this.props.dispatch({type:'LOAD_COLABORADORES', data: data}) 
        this.setState({colaboradores :data, cargando:false })
    }


    ToggleActivarColaborador(IdColaborador, Activar)
    {
        var data = {
            ColaboradorId : IdColaborador.toString(),
		    Activar : Activar
        }

        ActualizarColaboradorActivarService(data)
        .then((res) => {
            Swal.fire({
                title: 'Información actualizada exitosamente',
                icon: 'success',
                text: "Éxito"
            });

            this.ObtenerColaboradores()

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
                        <li className="breadcrumb-item active" aria-current="page">Colaboradores</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Colaboradores
                </h2>

                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-right p-1 m-1">
                        
                    <Link to={{ pathname: '/settings/nuevoColaborador', }}>
                            <button 
                                    className="btn btn-primary collapsed" 
                                    type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <span className="m-1">
                                        Nuevo
                                    </span>
                            </button>
                        </Link>


                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-12 col-md-4 offset-md-4 text-center">
                        <h4 className="card-title font-weight-bold">Buscar:</h4>                
                        <input 
                            className="form-control form-control-md " 
                            type="text" 
                            onChange={this.FiltarColaboradores}
                            placeholder="Nombre ó código" />  
                    </div>
                </div>
                        

                <div className="row">
                    <div className="col text-right">
                        <BtnExportToExcel 
                            TableSelector="#tbtMantenimientoColaboradores"
                            FileName={"TablaMantenimientoColaboradores"+new Date().getTime()+".csv"}>
                        </BtnExportToExcel>
                    </div>
                </div>
                
                <div className="row">
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
                                                        {colaborador.Activo ? 
                                                        (
                                                            <button className="btn btn-danger"
                                                                onClick={() => this.ToggleActivarColaborador(colaborador.IdColaborador,false)}>
                                                                <i className="fa fa-times " aria-hidden="true"></i>
                                                            </button>
                                                        ) : 
                                                        (
                                                            <button className="btn btn-success"
                                                                onClick={() => this.ToggleActivarColaborador(colaborador.IdColaborador,true)}>
                                                                <i className="fa fa-check" aria-hidden="true"></i>
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
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(MantenimientoColaboradores);