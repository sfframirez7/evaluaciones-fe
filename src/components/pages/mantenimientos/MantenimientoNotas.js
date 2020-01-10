import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Loading from '../../common/Loading';
import Moment from 'react-moment';
import Stepper from 'bs-stepper'
import {ObtenerTodasEvaluacionesAnualesService, ResetearNoteEvaluacionPorMetaService, ResetearNotaEvaluacionGeneralService} from '../../../services/EvaluacionesService'
import {ObtenerAreasService} from '../../../services/AreaService'
import {ObtenerColaboradoresPorCargoService} from '../../../services/ColaboradoresService'

import NoData from '../../common/NoData';
import { IsNumber } from '../../../services/IsNumber';

import Swal from "sweetalert2";
import { RegistrarEventoDelSistema } from '../../../services/Utilidades';

class MantenimientoNotas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            colaboradores : [],
            colaboradoresLoaded : [],
            evaluaciones : [],
            evaluacionId: 0,
            IdSubArea : 0,
            areas : [],
            IdArea : 0,
            txtBuscar : "",
        }  
        
        this.SeleccionarEvaluacion = this.SeleccionarEvaluacion.bind(this)
        this.ObtenerAreas = this.ObtenerAreas.bind(this)
        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        this.FiltarColaboradores = this.FiltarColaboradores.bind(this)
        this.ReseterNotaPorMeta = this.ReseterNotaPorMeta.bind(this)
        this.ReseterNotaPorMeta = this.ReseterNotaPorMeta.bind(this)
        this.ReseterNotaGeneral = this.ReseterNotaGeneral.bind(this)
    }

    componentDidMount()
    {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true,
          })
          this.ObtenerEvaluacioneAnuales()
          this.ObtenerAreas()

    }

    ObtenerAreas()
    {
        this.setState({ cargando : true})
        ObtenerAreasService()
        .then((res) => {
            this.setState({areas: res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }


    ObtenerEvaluacioneAnuales()
    {
        this.setState({ cargando : true})

        ObtenerTodasEvaluacionesAnualesService()
        .then((res) => {
            this.setState({evaluaciones : res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }

    SeleccionarEvaluacion(evaluacionId)
    {
        this.setState({evaluacionId})
        this.stepper.next()
    }


    AreaChangedHandler(event)
    {
        var IdArea = event.target.value
        this.setState({IdArea})
        ObtenerColaboradoresPorCargoService(IdArea)
        .then((res) => {
            this.setState({colaboradoresLoaded: res.data})
            this.props.dispatch({ type: 'LOAD_COLABORADORES', data: res.data })
        }).catch((err) => {
            
        });
    }


    FiltarColaboradores(event)
    {
        
        this.setState({cargando: true})

        var txtBuscar = event.target.value

        var data = this.state.colaboradoresLoaded.filter((colaborador) => {


            if(IsNumber(txtBuscar))
            {

                if (colaborador.IdColaborador.toString().indexOf(txtBuscar.toString())> -1)
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

            this.props.dispatch({ type: 'LOAD_COLABORADORES', data: data })

            this.setState({ cargando : false})
    }

    ReseterNotaPorMeta(colaboradorId, nombre)
    {
        Swal.fire({
            title: 'Resetear evaluación por Meta de: '+nombre+'. ¡ESTA ACCIÓN NO SE PUEDE REVERTIR!',
            text: "¿Resetear evaluación por meta?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '##3085d6',
            confirmButtonText: 'Resetear'
          }).then((result) => {
            if (result.value) {
                ResetearNoteEvaluacionPorMetaService(colaboradorId, this.state.evaluacionId)
                .then((res) => {
                    this.setState({cargando: false})
                    Swal.fire({
                        title: 'Información guardada exitosamente',
                        icon: 'success',
                        text: "Éxito",
                    });
                    RegistrarEventoDelSistema("Reseteó la nota por meta de la evaluación:"+this.state.evaluacionId+ " del colaborador : "+colaboradorId)
                }).catch((err) => {
                    console.log(err)
                    this.setState({cargando: false})
                    Swal.fire({
                        title: 'No se ha podido actulizar la información. Por favor reintenta más tarde.',
                        icon: 'error',
                        text: "Error",
                    });
                });
            }
            else {
                this.setState({cargando: false})
            }
          })
    }


    ReseterNotaGeneral(colaboradorId, nombre)
    {
        Swal.fire({
            title: 'Resetear evaluación general de: '+nombre+'. ¡ESTA ACCIÓN NO SE PUEDE REVERTIR!',
            text: "¿Resetear evaluación general?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '##3085d6',
            confirmButtonText: 'Resetear'
          }).then((result) => {
            if (result.value) {
                ResetearNotaEvaluacionGeneralService(colaboradorId, this.state.evaluacionId)
                
                .then((res) => {
                    this.setState({cargando: false})
                    Swal.fire({
                        title: 'Información guardada exitosamente',
                        icon: 'success',
                        text: "Éxito",
                    });
                    RegistrarEventoDelSistema("Reseteó la nota general de la evaluación:"+this.state.evaluacionId+ " del colaborador : "+colaboradorId)
                }).catch((err) => {
                    console.log(err)
                    this.setState({cargando: false})
                    Swal.fire({
                        title: 'No se ha podido actulizar la información. Por favor reintenta más tarde.',
                        icon: 'error',
                        text: "Error",
                    });
                });
            }
            else {
                this.setState({cargando: false})
            }
          })
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
                        <li className="breadcrumb-item active" aria-current="page">Mantenimiento Notas</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Mantenimiento Notas
                </h2>

                <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} />
                        </div>
                    </div>

                <div className="row">
                    <div className="col">

                        <div>
                            <div id="stepper1" className="bs-stepper">
                                <div className="bs-stepper-header">
                                    <div className="step" data-target="#test-l-1">
                                        <button className="step-trigger">
                                            <span className="bs-stepper-circle">1</span>
                                            <span className="bs-stepper-label">Seleccionar evaluación</span>
                                        </button>
                                    </div>
                                    <div className="line"></div>
                                    <div className="step"  data-target="#test-l-2">
                                        <button 
                                            disabled
                                            className={"step-trigger" }>
                                            <span className="bs-stepper-circle">2</span>
                                            <span className="bs-stepper-label">Colaboradores</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="bs-stepper-content">
                                        <div id="test-l-1" className="content">
                                            <div className="row">
                                                <div className="col">

                                                    <div style={{overflowX: 'auto'}}>
                                                        
                                                        <h3 className="font-weight-bold">Seleccionar evaluación</h3>


                                                        <table className="table table-striped table-hover  bg-white" >
                                                                <thead>
                                                                    <tr>
                                                                        <th>Título</th>
                                                                        <th>Descripción</th>
                                                                        <th>Desde</th>
                                                                        <th>Hasta</th>
                                                                        <th>Acciones</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    
                                                                    {this.state.evaluaciones.map((evaluacion, index)=> {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>
                                                                                    {evaluacion.Titulo}
                                                                                </td>
                                                                                <td>
                                                                                    {evaluacion.Descripcion}
                                                                                </td>
                                                                                <td>
                                                                                    <Moment format="YYYY/MM/DD">{evaluacion.Desde}</Moment>
                                                                                </td>
                                                                                <td>
                                                                                    <Moment format="YYYY/MM/DD">{evaluacion.Hasta}</Moment>
                                                                                </td>
                                                                                <td>
                                                                                    <button className="btn btn-outline-primary" onClick={() => this.SeleccionarEvaluacion(evaluacion.IdEvaluacionAnual)}>Ver</button>
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
                                        <div id="test-l-2" className="content">
                                                
                                                <div className="row">
                                                        <div className="col-12 text-center">
                                                            <div className="form-group">
                                                                <h4 className="card-title font-weight-bold">Área:</h4>
                                                                <select 
                                                                    value={this.state.IdArea} 
                                                                    className="custom-select col-12 col-md-4 form-control" 
                                                                    id="cmbSubAreas" 
                                                                    onChange={ this.AreaChangedHandler }>
                                                                        <option value="0" >Seleccionar área:</option>
                                                                        { this.state.areas.map((area, index) => <option key={index} value={area.IdArea}>{area.Area}</option>) }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    
                                                    <div className="row my-1">
                                                    
                                                    <div className="col-12 col-md-4 offset-md-4 text-center">

                                                        <h4 className="card-title font-weight-bold">Buscar:</h4>                
                                                        <input 
                                                            className="form-control form-control-md " 
                                                            type="text" 
                                                            onChange={this.FiltarColaboradores}
                                                            placeholder="Nombre ó código" />  

                                                    </div>

                                                    <div className="col">
                                                        <div className="d-flex flex-wrap align-content-center">
                                                            <h5>Total: <span className="badge badge-secondary">{this.props.colaboradores.length}</span></h5>
                                                        </div>
                                                    </div>

                                                   
                                                </div> 

                                                    <div className="row">
                                                        <div className="col-12 col-md-10 offset-md-1">
                                                            

                                                            <div style={{overflowX: 'auto'}}>
                                                                                                        
                                                                <table className="table table-striped table-hover table-sm bg-white" >
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                Código
                                                                            </th>
                                                                            <th>
                                                                                Nombre
                                                                            </th>
                                                                            <th>
                                                                                Acciones
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    
                                                                        {this.props.colaboradores.map((colaborador, index)=>{
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <th>
                                                                                        {colaborador.IdColaborador}
                                                                                    </th>
                                                                                    <td>
                                                                                        {colaborador.Nombre}
                                                                                        {colaborador.Accion==="S" ? (<span className="badge badge-warning m-1">Reasignado</span>) : null }
                                                                                        {colaborador.Accion==="R" ? (<span className="badge badge-secondary m-1">Removido</span>) : null }
                                                                                        {colaborador.Completo ? (<i className="fa fa-check-circle text-success m-1 p-1" aria-hidden="true"></i>) : null }                                       
                                                                                            
                                                                                    </td>
                                                                                    <td>
                                                                                        <button 
                                                                                            className="btn btn-danger mx-1"
                                                                                            onClick={() => this.ReseterNotaPorMeta(colaborador.IdColaborador, colaborador.Nombre)}>
                                                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                                            <span className="px-1">
                                                                                                Rst. Nota Meta
                                                                                            </span>
                                                                                        </button>
                                                                                        <button 
                                                                                            className="btn btn-danger mx-1"
                                                                                            onClick={() => this.ReseterNotaGeneral(colaborador.IdColaborador, colaborador.Nombre)}>
                                                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                                                            <span className="px-1">
                                                                                            Rst. Nota General
                                                                                            </span>
                                                                                        </button>
                                                                                        {/* <button 
                                                                                            className="btn btn-outline-primary"
                                                                                            onClick={() => this.SeleccionarColaborador(colaborador.IdColaborador)}>
                                                                                            Ver
                                                                                        </button> */}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                                </div>
                                                            
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col text-center">
                                                            <NoData NoData={this.props.colaboradores.length === 0 && !this.state.cargando}/>
                                                        </div>
                                                    </div>
                                            
                                        </div>
                                </div>
                            </div>
                        </div> 

                    </div>
                </div>
                
                
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        colaboradores : state.ColaboradoresReducer ,
        subAreas : state.SubAreasReducer,
    };
}

export default connect(
    mapStateToProps,
)(MantenimientoNotas);