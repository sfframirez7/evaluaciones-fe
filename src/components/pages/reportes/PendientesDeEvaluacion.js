import React, { Component } from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';

import {Link} from 'react-router-dom'
import Stepper from 'bs-stepper'

import Loading from '../../common/Loading';

import {ObtenerColaboradorespendientesService} from '../../../services/ColaboradoresService'
import {ObtenerTodasEvaluacionesAnualesService} from '../../../services/EvaluacionesService'
import {ObtenerSubAreas} from '../../../services/SubAreasService'
import BtnExportToExcel from '../../common/BtnExportToExcel';

class PendientesDeEvaluacion extends Component {

    
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
        this.FiltarColaboradoresPorArea = this.FiltarColaboradoresPorArea.bind(this)
        
    }


    componentDidMount()
    {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true,
          })

        //   this.ObtenerColaboradorespendientes()
          this.ObtenerEvaluacioneAnuales()
          ObtenerSubAreas()

    }

    ObtenerEvaluacioneAnuales()
    {
        this.setState({ cargando : true})

        ObtenerTodasEvaluacionesAnualesService()
        .then((res) => {
            console.log(res.data)
            this.setState({evaluaciones : res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }


    ObtenerColaboradorespendientes(idEvaluacionAnual)
    {

        this.setState({ cargando : true})

        ObtenerColaboradorespendientesService(idEvaluacionAnual)
        .then((res) => {
            this.setState({colaboradores : res.data, colaboradoresLoaded : res.data, cargando : false})
            this.stepper.next()
        }).catch((err) => {
            this.setState({ cargando : false})
        });

    }


    FiltarColaboradores(event)
    {
        
        var txtBuscar = event.target.value
        txtBuscar = txtBuscar.toLowerCase()

        this.setState({  txtBuscar})
        this.FiltarColaboradoresPorArea(txtBuscar, 0)

        this.setState({ cargando : false})
    }
   
    FiltarColaboradoresPorArea(txtSearch = "", idSubArea = 0)
    {
        
        var txtBuscar = txtSearch !== "" ? txtSearch : this.state.txtBuscar
        txtBuscar = txtBuscar.toLowerCase()
        var IdSubarea = parseInt(idSubArea) !== 0 ? parseInt( idSubArea) : this.state.IdSubArea

        this.setState({ cargando : true})

        var data = this.state.colaboradoresLoaded.filter((colaborador) => {
           
            if(parseInt(IdSubarea) ===0)
            {
                if (colaborador.NombreColaborador.toString().toLowerCase().indexOf(txtBuscar) > -1 )
                    return true
                else
                    return ""
            }
            else {
                if (colaborador.NombreColaborador.toString().toLowerCase().indexOf(txtBuscar) > -1 
                    &&  colaborador.IdSubArea === parseInt(IdSubarea))
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
        this.FiltarColaboradoresPorArea("", parseInt(IdSubArea))
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
                        <li className="breadcrumb-item active" aria-current="page">Colaboradores Pendientes de Evaluación</li>
                    </ol>
                </nav>


                <h4 className="font-weight-bold">
                    Colaboradores Pendientes de Evaluación
                </h4>
                <h4 className="">
                    Colaboradores Pendientes de Evaluación
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
                                            <span className="bs-stepper-label">Colaboradores</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="bs-stepper-content">
                                        <div id="test-l-1" className="content">
                                            <div className="row">
                                                <div className="col">

                                                    <div style={{overflowX: 'auto'}}>


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
                                                    
                                                    <div className="col-12 col-md-5 text-center">

                                                        <h4 className="card-title font-weight-bold">Nombre:</h4>                
                                                        <input 
                                                            className="form-control form-control-md " 
                                                            type="text" 
                                                            onChange={this.FiltarColaboradores}
                                                            placeholder="Nombre..." />  

                                                    </div>
                                                    <div className="col-12 col-md-7 text-center">
                                                        <h4 className="card-title font-weight-bold">Área:</h4>
                                                            <select 
                                                                value={this.state.IdSubArea} 
                                                                className="custom-select col-12 col-md-6 form-control" 
                                                                id="cmbSubAreas" 
                                                                onChange={ this.AreaChangedHandler }>
                                                                <option value="0" >Seleccionar Área</option>
                                                                { this.props.subAreas.map((subArea, index) => <option key={index} value={subArea.IdSubArea}>{subArea.SubArea}</option>) }
                                                            </select>                  
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
                                                                                    {colaborador.SubArea    }
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
)(PendientesDeEvaluacion);