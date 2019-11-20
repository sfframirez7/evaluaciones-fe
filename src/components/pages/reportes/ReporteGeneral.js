import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import Stepper from 'bs-stepper'

import Loading from '../../common/Loading';

import {ObtenerResultadosService} from '../../../services/ResultadosService'
import {ObtenerSubAreas, ObtenerColaboradoresPorArea} from '../../../services/SubAreasService'

import {ColaboradorModel} from '../../../Models/ColaboradorModel'
import BtnPDF from '../../common/BtnPDF';
import UsuarioLogueado from '../../common/UsuarioLogueado';

class ReporteGeneral extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            colaboradores : [],
            colaboradoresLoaded : [],
            evaluaciones : [],
            IdSubArea : 0,
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
        
    }


    componentDidMount()
    {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true,
          })

          ObtenerSubAreas()

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
            console.log(res.data)
            this.setState({ReporteGeneral : res.data})
        }).catch((err) => {
            
        });
    }
  
    

    AreaChangedHandler(event)
    {
        var IdSubArea = event.target.value
        this.setState({IdSubArea})
        ObtenerColaboradoresPorArea(IdSubArea)
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


            <h2>
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
                                        <div className="row my-2">
                                                    <div className="col-12  text-center">
                                                    <h4 className="card-title font-weight-bold">Área:</h4>
                                                        <select 
                                                            value={this.state.IdSubArea} 
                                                            className="custom-select col-12 col-md-4 form-control" 
                                                            id="cmbSubAreas" 
                                                            onChange={ this.AreaChangedHandler }>
                                                            <option value="0" >Seleccionar Área</option>
                                                            { this.props.subAreas.map((subArea, index) => <option key={index} value={subArea.IdSubArea}>{subArea.SubArea}</option>) }
                                                        </select>                  
                                                    </div>
                                                </div>      
                                                
                                                <div className="row">
                                                    <div className="col-12 col-md-10 offset-md-1">
                                                        
                                                        <div style={{overflowX: 'auto'}}>
                                                                                                    
                                                            <table className="table table-striped table-hover  bg-white" >
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
                                           
                                            
                                        </div>
                                      
                                        <div id="test-l-2" className="content">

                                            <div className="row">
                                                <div className="col text-right">
                                                    <BtnPDF></BtnPDF>
                                                </div>
                                            </div>

                                            <div className="row d-none d-print-inline">
                                                <div className="col">
                                                    Printed by: <UsuarioLogueado></UsuarioLogueado>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col">

                                                    <div className="card">
                                                        <h3 className="card-header">Resultados</h3>
                                                        <div className="card-body">
                                                            <div className="row p-1">
                                                                <div className="col-12 col-md-6">
                                                                    <div className="d-inline">
                                                                        <h5 className="d-inline">Código: </h5>
                                                                        <h6 className="d-inline">{this.state.ReporteGeneral.Colaborador.IdColaborador}</h6>        
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-6">
                                                                    <div className="d-inline">
                                                                        <h5 className="d-inline">Nombre: </h5>
                                                                        <h6 className="d-inline">{this.state.ReporteGeneral.Colaborador.NombreColaborador}</h6>        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row p-2">
                                                                <div className="col-12 col-md-6">
                                                                    <div className="d-inline">
                                                                        <h5 className="d-inline">Área: </h5>
                                                                        <h6 className="d-inline">{this.state.ReporteGeneral.Colaborador.Area}</h6>        
                                                                    </div>
   
                                                                </div>
                                                                <div className="col-12 col-md-6">
                                                                    <div className="d-inline">
                                                                        <h5 className="d-inline">Puesto: </h5>
                                                                        <h6 className="d-inline">{this.state.ReporteGeneral.Colaborador.Cargo}</h6>        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row p-2">
                                                                <div className="col-12 col-md-6">
                                                                    <div className="d-inline">
                                                                        <h5 className="d-inline">Jefe inmediato: </h5>
                                                                        <h6 className="d-inline">{this.state.ReporteGeneral.Colaborador.NombreJefeImmediato}</h6>        
                                                                    </div>   
                                                                </div>
                                                             
                                                            </div>


                                                            <div className="row">
                                                                <div className="col-12 col-md-8 offset-md-2">
                                                                    <div style={{overflowX: 'auto'}}>

                                                                    
                                                                        <table className="table table-striped table-bordered table-hover bg-white" style={{overflowX: 'auto'}}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Período</th>
                                                                                    <th>% Cumplimiento de competencias </th>
                                                                                    <th>% Evaluación de Metas</th>
                                                                                    <th>% Desempeño Global</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                        
                                                                                {this.state.ReporteGeneral.Resultados.map((resultado, index)=> {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td>
                                                                                                {resultado.Anio}
                                                                                            </td>
                                                                                            <td>
                                                                                                {resultado.CumplimientoEnBaseA60 +"%"}
                                                                                            </td>
                                                                                            <td>
                                                                                                {resultado.CumplimientoEnBaseA40 +"%"}
                                                                                            </td>
                                                                                            <td>
                                                                                                {parseFloat(resultado.CumplimientoEnBaseA60) + parseFloat(resultado.CumplimientoEnBaseA40) + "%"}
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
                                                    </div>


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
)(ReporteGeneral);