import React, { Component } from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';

import {Link} from 'react-router-dom'
import Stepper from 'bs-stepper'

import Loading from '../../common/Loading';
import {IsNumber} from '../../../services/IsNumber'

import {ObtenerReporteGeneralService} from '../../../services/ColaboradoresService'
import {ObtenerTodasEvaluacionesAnualesService} from '../../../services/EvaluacionesService'
import {ObtenerSubAreas} from '../../../services/SubAreasService'
import BtnExportToExcel from '../../common/BtnExportToExcel';
import NoData from '../../common/NoData';

class ReporteGeneral extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            colaboradores : [],
            colaboradoresLoaded : [],
            evaluaciones : [],
            IdSubArea : 0,
            txtBuscar : ""
        }

        this.ObtenerColaboradorespendientes = this.ObtenerColaboradorespendientes.bind(this)
        this.ObtenerEvaluacioneAnuales = this.ObtenerEvaluacioneAnuales.bind(this)
        this.FiltarColaboradores = this.FiltarColaboradores.bind(this)
        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        
    }


    componentDidMount()
    {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true,
          })
          this.ObtenerEvaluacioneAnuales()
          ObtenerSubAreas()

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


    ObtenerColaboradorespendientes(idEvaluacionAnual)
    {

        this.setState({ cargando : true})

        ObtenerReporteGeneralService(idEvaluacionAnual)
        .then((res) => {
            this.setState({colaboradores : res.data, colaboradoresLoaded : res.data, cargando : false})
            this.stepper.next()
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

                if (colaborador.IdColaborador.toString().indexOf(txtBuscar.toString())> -1)
                    return true
                else
                    return ""   
            }
            else 
            {
                if (colaborador.NombreColaborador.toString().toLowerCase().indexOf(txtBuscar.toLowerCase()) > -1 )
                    return true
                else
                    return ""
                }
            })

            this.setState({ colaboradores: data })

            this.setState({ cargando : false})
    }


    AreaChangedHandler(event)
    {
        var IdSubArea = event.target.value
        this.setState({IdSubArea})
    }

    render() {
        return (
          
          <div>
                  <nav aria-label="breadcrumb bg-white">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{
                                    pathname: '/reportes',
                                    }}>
                                    Reportes
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Reporte General</li>
                    </ol>
                </nav>


                <h4 className="font-weight-bold">
                    Reporte General
                </h4>
              
                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
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
                                            <span className="bs-stepper-label">Reporte</span>
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
                                                                                    <button className="btn btn-outline-primary" onClick={() => this.ObtenerColaboradorespendientes(evaluacion.IdEvaluacionAnual)}>Ver</button>
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
                                                
                                                <div className="row my-2">
                                                    
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
                                                            <h5>Total: <span className="badge badge-secondary">{this.state.colaboradores.length}</span></h5>
                                                        </div>
                                                    </div>

                                                   
                                                </div>      

                                                <div className="row">
                                                    <div className="col text-right">
                                                        <BtnExportToExcel 
                                                            TableSelector="#tbtColaboradoresPendientes"
                                                            FileName={"TablaColaboradorePendientes"+new Date().getTime()+".csv"}>
                                                        </BtnExportToExcel>
                                                    </div>
                                                </div>

                                                
                                                <div className="row">
                                                    <div className="col">

                                                        <div style={{overflowX:'auto'}}>

                                                            <table id="tbtColaboradoresPendientes" 
                                                                    className="table table-striped table-hover  bg-white" style={{overflowX: 'auto'}}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Código</th>
                                                                        <th>Nombre</th>
                                                                        <th>Área</th>
                                                                        <th>Puesto</th>
                                                                        <th>Jefe</th>
                                                                        <th>%60</th>
                                                                        <th>%40</th>
                                                                        <th>%Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    
                                                                    {this.state.colaboradores.map((colaborador, index)=> {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <th>
                                                                                    {colaborador.IdColaborador}
                                                                                </th>
                                                                                <td>
                                                                                    {colaborador.NombreColaborador}
                                                                                </td>
                                                                                <td>
                                                                                    {colaborador.Area}
                                                                                </td>
                                                                                <td>
                                                                                    {colaborador.Cargo}
                                                                                </td>
                                                                                <td>
                                                                                    {colaborador.NombreJefeImmediato}
                                                                                </td>
                                                                                <td>
                                                                                    {colaborador.Valor60}
                                                                                </td>
                                                                                <td>
                                                                                    {colaborador.Valor40}
                                                                                </td>
                                                                                <td>
                                                                                    { parseFloat(parseFloat(colaborador.Valor60)+ parseFloat(colaborador.Valor40))}
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
                                                        <NoData NoData={this.state.colaboradores.length === 0 && !this.state.cargando}/>
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
        subAreas : state.SubAreasReducer,
    };
}


export default connect(
    mapStateToProps,
)(ReporteGeneral);