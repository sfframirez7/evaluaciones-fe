import React, { Component } from 'react';
import { connect } from 'react-redux';

import Moment from 'react-moment';

import {Link} from 'react-router-dom'
import Stepper from 'bs-stepper'

import Loading from '../../common/Loading';
import {IsNumber} from '../../../services/IsNumber'

import {ObtenerReporteGeneralService, ObtenerReporteGeneralPorEquipoService} from '../../../services/ColaboradoresService'
import {ObtenerTodasEvaluacionesAnualesService} from '../../../services/EvaluacionesService'
import {ObtenerSubAreas} from '../../../services/SubAreasService'
import BtnExportToExcel from '../../common/BtnExportToExcel';
import NoData from '../../common/NoData';
import TituloPrincipal from '../../common/TituloPrincipal';

class ReporteGeneralPorEquipo extends Component {

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

        this.ObtenerResultados = this.ObtenerResultados.bind(this)
        this.ObtenerEvaluacioneAnuales = this.ObtenerEvaluacioneAnuales.bind(this)
        this.FiltarColaboradores = this.FiltarColaboradores.bind(this)
        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        
    }


    componentDidMount()
    {
        
        this.ObtenerResultados()

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


    ObtenerResultados()
    {

        this.setState({ cargando : true})

        ObtenerReporteGeneralPorEquipoService(this.props.evaluacionSelected.evluacionId)

        .then((res) => {
            this.setState({colaboradores : res.data, colaboradoresLoaded : res.data, cargando : false})
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
          
          <div className="container">
                
                <div className="row">
                    <div className="col">
                        <TituloPrincipal Titulo="Resumen equipo" BackButton={true}/>
                    </div>
                </div>


                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>

                
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
                

        );
    }
}

function mapStateToProps(state) {
    return {
        subAreas : state.SubAreasReducer,
        evaluacionSelected : state.EvaluacionSelectedReducer
    };
}


export default connect(
    mapStateToProps,
)(ReporteGeneralPorEquipo);