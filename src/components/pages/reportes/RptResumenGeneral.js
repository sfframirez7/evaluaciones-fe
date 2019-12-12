import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import Stepper from 'bs-stepper'

import Loading from '../../common/Loading';

import {ObtenerResultadosService} from '../../../services/ResultadosService'
import {ObtenerColaboradoresPorCargoService} from '../../../services/ColaboradoresService'

import {ObtenerAreasService} from '../../../services/AreaService'

import {ColaboradorModel} from '../../../Models/ColaboradorModel'
import ResumenGeneral from './ResumenGeneral';
import NoData from '../../common/NoData';

class RptResumenGeneral extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            colaboradores : [],
            colaboradoresLoaded : [],
            evaluaciones : [],
            areas : [],
            IdArea : 0,
            txtBuscar : "",
            IdEvaluacionanual :0,
            IdColaborador : 0,
            ReporteGeneral : {
                Colaborador : ColaboradorModel,
                Resultados : []
            }
        }


        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        this.ObtenerResultados = this.ObtenerResultados.bind(this)
        this.SeleccionarColaborador = this.SeleccionarColaborador.bind(this)
        this.ObtenerAreas = this.ObtenerAreas.bind(this)
        
    }


    componentDidMount()
    {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true,
          })

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

    
    SeleccionarColaborador(idColaborador)
    {
        this.setState({IdColaborador : idColaborador})
        this.ObtenerResultados(idColaborador)
        this.stepper.next()
    }


    ObtenerResultados(idColaborador)
    {
        ObtenerResultadosService(idColaborador)
        .then((res) => {
            this.setState({ReporteGeneral : res.data})
            this.props.dispatch({type:'LOAD_REPORTE_GENERAL', data: res.data}) 
        }).catch((err) => {
            
        });
    }
  
    

    AreaChangedHandler(event)
    {
        var IdArea = event.target.value
        this.setState({IdArea})
        ObtenerColaboradoresPorCargoService(IdArea)
        .then((res) => {
            this.props.dispatch({ type: 'LOAD_COLABORADORES', data: res.data })
        }).catch((err) => {
            
        });
    }



    render() {
        return (
            <div>

                <nav aria-label="breadcrumb bg-white d-print-none">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/reportes', }}>
                                Reportes
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Reporte general</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Reporte general
                </h2>


                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>

                <div className="row">
                        <div className="col-12">

                            <div style={{overflowX:'auto'}}>
                                <div id="stepper1" className="bs-stepper">
                                    <div className="bs-stepper-header">
                                        
                                        <div className="step d-print-none"  data-target="#test-l-1">
                                            <button 
                                                className={"step-trigger" }>
                                                <span className="bs-stepper-circle">1</span>
                                                <span className="bs-stepper-label">Colaboradores</span>
                                            </button>
                                        </div>
                                        <div className="line"></div>
                                        <div className="step d-print-none"  data-target="#test-l-2">
                                            <button 
                                                disabled
                                                className={"step-trigger" }>
                                                <span className="bs-stepper-circle">2</span>
                                                <span className="bs-stepper-label">Reporte General</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bs-stepper-content">
                                            <div id="test-l-1" className="content"> 

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
                                                                                            className="btn btn-outline-primary"
                                                                                            onClick={() => this.SeleccionarColaborador(colaborador.IdColaborador)}>
                                                                                            Ver
                                                                                        </button>
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
                                        
                                            <div id="test-l-2" className="content">

                                                <ResumenGeneral></ResumenGeneral>

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
)(RptResumenGeneral);