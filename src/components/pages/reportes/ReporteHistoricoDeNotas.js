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


class ReporteHistoricoDeNotas extends Component {

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
            variacionAnioAnterior : 3,
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
        console.log("'object'")
        console.log("'object'")
    }


    ObtenerResultados(idColaborador)
    {
        ObtenerResultadosService(idColaborador)
        .then((res) => {
            
            if(!res.data || !res.data.Resultados)
                return
            var resultados = []
            var totalAnio = 0
            res.data.Resultados.map((resultado, index)=> {
                
                var totalAnioActual = parseFloat(resultado.CumplimientoEnBaseA60) + parseFloat(resultado.CumplimientoEnBaseA40)

                var objResultado = {
                    Anio: resultado.Anio,
                    CumplimientoEnBaseA40: resultado.CumplimientoEnBaseA40,
                    CumplimientoEnBaseA60: resultado.CumplimientoEnBaseA60,
                    CumplimientoPorcentaje40: resultado.CumplimientoPorcentaje40,
                    CumplimientoPorcentaje60: resultado.CumplimientoPorcentaje60,
                    IdEvaluacion: resultado.IdEvaluacion,
                    Variacion : (totalAnioActual - totalAnio)
                }
                totalAnio = totalAnioActual
                resultados.push(objResultado)
            })

            res.data.Resultados = resultados

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



    render(){
    return (
        <div>

        <nav aria-label="breadcrumb bg-white">
            <ol className="breadcrumb bg-white">
                <li className="breadcrumb-item">
                    <Link to={{ pathname: '/reportes', }}>
                        Reportes
                    </Link>
                
                </li>
                <li className="breadcrumb-item active" aria-current="page">Reporte histórico de notas</li>
            </ol>
        </nav>


        <h3 className="font-weight-bold text-center">
            Reporte Histórico de Notas
        </h3>


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
                                                                <h5 className="card-title">Código:</h5>
                                                            <p className="card-text">{this.state.ReporteGeneral.Colaborador.IdColaborador}</p>        
                                                            </div>
                                                            <div className="col-12 col-md-6">
                                                                <h5 className="card-title">Nombre:</h5>
                                                                <p className="card-text ">{this.state.ReporteGeneral.Colaborador.NombreColaborador}</p> 
                                                            </div>
                                                        </div>
                                                        <div className="row p-2">
                                                            <div className="col-12 col-md-6">
                                                                <h5 className="card-title">Área:</h5>
                                                                <p className="card-text">{this.state.ReporteGeneral.Colaborador.Area}</p>        
                                                            </div>
                                                            <div className="col-12 col-md-6">
                                                                <h5 className="card-title">Puesto:</h5>
                                                                <p className="card-text">{this.state.ReporteGeneral.Colaborador.Cargo}</p> 
                                                            </div>
                                                        </div>
                                                        <div className="row p-2">
                                                            <div className="col-12 col-md-6">
                                                                <h5 className="card-title">Bloque:</h5>
                                                                <p className="card-text">{this.state.ReporteGeneral.Colaborador.SubArea}</p>        
                                                            </div>
                                                         
                                                        </div>


                                                        <div className="row">
                                                            <div className="col-12 col-md-8 offset-md-2">
                                                                <div style={{overflowX: 'auto'}}>

                                                                
                                                                    <table className="table table-striped table-hover  table-bordered bg-white" style={{overflowX: 'auto'}}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Período</th>
                                                                                <th>% Desempeño Global</th>
                                                                                <th>Variación vs año anterior</th>
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
                                                                                            {parseFloat(resultado.CumplimientoEnBaseA60) + parseFloat(resultado.CumplimientoEnBaseA40) + "%"}
                                                                                        </td>
                                                                                        <td>
                                                                                            {resultado.Variacion +"%" }
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
)(ReporteHistoricoDeNotas);