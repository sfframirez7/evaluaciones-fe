import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ObtenerEquipoPorEvaluacion} from '../../../services/ColaboradoresService'
import {ObtenerResultadosService} from '../../../services/ResultadosService'

import {IsNumber} from '../../../services/IsNumber'

import TituloPrincipal from '../../common/TituloPrincipal'
import NoData from '../../common/NoData'
import EvaluacionSelected from '../evaluaciones/EvaluacionSelected'
import Loading from '../../common/Loading';

import {Link} from 'react-router-dom'

class Colaboradores extends Component {



    
    constructor(props) {
        super(props);
        
        if(this.props.evaluacionSelected.evluacionId===0)
        {
            this.props.history.push("/")
        }
        
        this.state = {
            colaboradores: [],
            colaboradoresLoaded:[],
            cargando : false
        }

        this.ObtenerEquipo = this.ObtenerEquipo.bind(this)
        this.FiltarColaboradores = this.FiltarColaboradores.bind(this)
        this.VerEvaluacion = this.VerEvaluacion.bind(this)
        this.VerResumen = this.VerResumen.bind(this)

    }

    componentDidMount()
    {
        this.props.dispatch({type:'LOAD_COLABORADORES', data: []}) 
        this.ObtenerEquipo()
    }


    ObtenerEquipo()
     {

        this.setState({cargando : true})
        
        ObtenerEquipoPorEvaluacion(this.props.evaluacionSelected.evluacionId )
        .then(res => {
            this.props.dispatch({type:'LOAD_COLABORADORES', data: res.data}) 
            this.setState({colaboradores :res.data , colaboradoresLoaded: res.data, cargando : false})

        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
        })
    }

    FiltarColaboradores(event)
    {
        
        this.setState({cargando: true})

        var txtBuscar = event.target.value

        var data = this.state.colaboradoresLoaded.filter((colaborador) => {
            if(IsNumber(txtBuscar))
            {
                if (colaborador.IdColaborador.indexOf(txtBuscar) > -1 )
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


    VerEvaluacion(colaboradorId, Nombre)
    {

        var colaborador = {
            nombreColaborador: Nombre,
            colaboradorId: colaboradorId
        }

        this.props.dispatch({type:'SELECT_COLABORADOR', data: colaborador}) 
        this.props.history.push("/evaluacion/"+btoa(colaboradorId)+"/"+btoa(this.props.evaluacionSelected.evluacionId))
    }
 
    VerResumen(colaboradorId, Nombre)
    {
        var colaborador = {
            nombreColaborador: Nombre,
            colaboradorId: colaboradorId
        }
        
        ObtenerResultadosService(colaboradorId)
        .then((res) => {
            this.props.dispatch({type:'LOAD_REPORTE_GENERAL', data: res.data}) 
        }).catch((err) => {
            
        });

        this.props.dispatch({type:'SELECT_COLABORADOR', data: colaborador}) 
        this.props.history.push("/resumenEvaluaciones")
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Equipo" BackButton={true}/>
                        </div>
                    </div>

                 
                    
                    <div className="row mb-4">
                        <div className="col col-md-10 offset-md-1 ">
                            <EvaluacionSelected/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} />
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
                        <div className="col text-center">
                             <button className="btn " type="button" data-toggle="collapse" data-target="#collapseSimbologia" aria-expanded="true" aria-controls="collapseExample">
                                <i className="fa fa-info-circle fa-lg text-info m-1 p-1" aria-hidden="true"></i>
                            </button>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            
                            <div className="collapse" id="collapseSimbologia" >
                                <table className="table table-striped table-hover  bg-white ">
                                        <thead>
                                            <tr>
                                                <th>
                                                    Señal
                                                </th>
                                                <th>
                                                    Significado
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="badge badge-warning m-1">Reasignado</span>
                                                </td>
                                                <td>
                                                    El colaborador ha sido asignado a tu área para ser evaluado
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="badge badge-secondary m-1">Removido</span>
                                                </td>
                                                <td>
                                                El colaborador ha sido removido de tu área para ser evaluado por otro líder
                                                </td>
                                            </tr>
                                                <tr>
                                                <td>
                                                    <i className="fa fa-check-circle text-success m-1 p-1" aria-hidden="true"></i>
                                                </td>
                                                <td>
                                                    La evaluación ha sido completada
                                                </td>
                                                </tr>
                                                <tr>
                                                <td>
                                                    <i className="fa fa-check-circle text-primary m-1 p-1" aria-hidden="true"></i>                                                                
                                                </td>
                                                <td>
                                                    El colaborador ha marcado la evaluación como aceptada
                                                </td>
                                            </tr>
                                            </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                   

                   <div className="row p-2">
                        <div className="col text-center ">
                                
                        <Link to={{ pathname: '/resumenEquipo'}}>
                            <button 
                                    className="btn btn-primary " 
                                    type="button" >
                                    <span className="m-1">
                                        Resumen Equipo
                                    </span>
                            </button>
                        </Link>


                        </div>
                    </div>


                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 ">

                            <div className="bg-white">

                                    <table className="table table-striped table-hover  bg-white ">
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
                                        
                                            {this.state.colaboradores.map((colaborador, index)=>{
                                                return (
                                                    <tr key={index}>
                                                        <th>
                                                            {colaborador.IdColaborador}
                                                        </th>
                                                        <td>
                                                            {colaborador.Nombre}
                                                            {colaborador.Accion==="S" ? 
                                                                ( <button className="btn m-0 p-0"> <span className="badge badge-warning m-1">Reasignado</span></button>) : null }
                                                            {colaborador.Accion==="R" ? 
                                                                (<button className="btn m-0 p-0"> <span className="badge badge-secondary m-1">Removido</span></button>) : null }
                                                            {colaborador.Completo ? 
                                                                (<button className="btn m-0 p-0"><i className="fa fa-check-circle text-success m-1 p-1" aria-hidden="true"></i></button>) : null }                                       
                                                            {colaborador.AceptoEvaluacion ? 
                                                                ( <button className="btn m-0 p-0"><i className="fa fa-check-circle text-primary m-1 p-1" aria-hidden="true"></i></button>) : null }                                       
                                                                

                                                        </td>
                                                        <td>
                                                        
                                                            {(colaborador.Accion!=="R")?
                                                                (
                                                                    <button 
                                                                    className=" btn btn-outline-primary m-1" 
                                                                    data-toggle="tooltip" 
                                                                    data-placement="top" title="Ingresar resultados" 
                                                                    onClick={()=> this.VerEvaluacion(colaborador.IdColaborador, colaborador.Nombre)}>
                                                                    Evaluación
                                                                </button>
                                                                
                                                            ) :
                                                            (
                                                                null
                                                            ) }
                                                         
                                                            {(colaborador.Completo)?
                                                                (
                                                                <button 
                                                                    className=" btn btn-outline-primary m-1" 
                                                                    data-toggle="tooltip" 
                                                                    data-placement="top" title="Ingresar resultados" 
                                                                    onClick={()=> this.VerResumen(colaborador.IdColaborador, colaborador.Nombre)}>
                                                                    Resumen
                                                                </button>
                                                                
                                                            ) :
                                                            (
                                                                null
                                                            ) }
                                                        
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
        );
    }
}


function mapStateToProps(state) {
    return {
        evaluacionSelected : state.EvaluacionSelectedReducer
    };
}

export default connect(
    mapStateToProps,
)(Colaboradores);