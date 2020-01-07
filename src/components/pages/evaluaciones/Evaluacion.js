import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stepper from 'bs-stepper'

import {axios} from '../../../config/config'
import Swal from "sweetalert2";

import TituloPrincipal from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import EvaluacionGeneral from './EvaluacionGeneral';
import EvaluacionPorMetas from './EvaluacionPorMetas';
import ColaboradorSelected from '../colaboradores/ColaboradorSelected';
import { VerResumenService } from '../../../services/ResultadosService';
import EsElUsuarioLogueado from '../../../services/EsElUsuarioLogueado';


class Evaluacion extends Component {


    constructor(props) {
        super(props);


        this.state = {
          name: 'React',
          evaluaciones : [],
          evaluaciones2 : [],
          evaluacionPorMeta: null,
        //   colaboradorId : colaboradorId,
        // evaluacionId : evaluacionId,
        evaluacionId : 0,
          colaboradorId : 0,
          HabilitarEvaluacionGeneral : false,
          EsEldueno : false
        };

        this.ObtenerEvaluacion = this.ObtenerEvaluacion.bind(this)
        this.ObtenerEvaluacionPorMeta = this.ObtenerEvaluacionPorMeta.bind(this)
        this.MostrarAyuda = this.MostrarAyuda.bind(this)
        this.VerResumen = this.VerResumen.bind(this)

      }
    

      componentDidMount()
      {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: false,
            animation: true
          })

        this.ObtenerEvaluacionPorMeta()
        this.ObtenerEvaluacion()

      }
    

      ObtenerEvaluacion()
      {
        this.setState({cargando:true})
        var evaluacionId = this.props.evaluacionSelected.evluacionId

        if(evaluacionId===0 || this.props.colaboradorSelected.colaboradorId  === 0)
        {
            this.props.history.push("/")
        }

        axios.get('/GetEvaluacionPorColaborador/'+this.props.colaboradorSelected.colaboradorId+'/'+evaluacionId)
            .then(res => {
                if(res.data)
                {
                    this.setState({evaluaciones2 : res.data, cargando : false})
                }
                else {
                    this.setState({evaluaciones2 : [], cargando : false})
                }
            }).catch((error) => {
                console.log(error)
                Swal.fire({
                    title: 'Algo ha salido mal',
                    icon: 'error',
                    text: "Error",
                });
                this.setState({ cargando: false });
            })
    
    }
     
    ObtenerEvaluacionPorMeta()
      {
        this.setState({cargando:true})
        var evaluacionId = this.props.evaluacionSelected.evluacionId

        if(evaluacionId===0 || this.props.colaboradorSelected.colaboradorId === 0)
        {
            this.props.history.push("/")
        }

        axios.get('/GetEvaluacionMetaPorColaborador/'+this.props.colaboradorSelected.colaboradorId+'/'+evaluacionId)
            .then(res => {
                // console.log(res.data)
                this.setState({evaluacionPorMeta : res.data, cargando : false})

                if(!res.data) 
                    return
                
                if(res.data.Completo)
                {
                    this.setState({HabilitarEvaluacionGeneral:true})
                }
                
            }).catch((error) => {
                console.log(error)
                Swal.fire({
                    title: 'Algo ha salido mal',
                    icon: 'error',
                    text: "Error",
                });
                this.setState({ cargando: false });
            })
    
    }
    

    MostrarAyuda()
    {
        Swal.fire({
            title: 'Para poder ver la evaluación general primero debes crear la evaluación por metas y completar la misma',
            icon: 'warning',
            text: "Ayuda",
        });

    }


    VerResumen()
    {
        VerResumenService()
        this.props.history.push("/resumenEvaluaciones")
    }


    render() {
        return (
            <div>

                <div className="container">
                    
                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Evaluación" BackButton={true}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-10 offset-1">
                            <ColaboradorSelected></ColaboradorSelected>
                        </div>
                    </div>

                    <div className={"row " +(EsElUsuarioLogueado(this.props.colaboradorSelected.colaboradorId)  ? "" : "d-none")} >
                        <div className="col text-center">
                            <button 
                                className=" btn btn-primary m-1" 
                                data-toggle="tooltip" 
                                data-placement="top" title="Ingresar resultados" 
                                onClick={()=> this.VerResumen()}>
                                Ver Resumen
                            </button>
                        </div>
                    </div>

                    
                    <div>
                        <div id="stepper1" className="bs-stepper">
                            <div className="bs-stepper-header">
                                <div className="step" data-target="#test-l-1">
                                    <button className="step-trigger">
                                        <span className="bs-stepper-circle">1</span>
                                        <span className="bs-stepper-label">Evaluación por metas</span>
                                    </button>
                                </div>
                                <div className="line"></div>
                                <div className="step"  data-target="#test-l-2">
                                    <button className={"step-trigger " + (!this.state.HabilitarEvaluacionGeneral ? "d-none": "")} disabled={!this.state.HabilitarEvaluacionGeneral}>
                                        <span className="bs-stepper-circle">2</span>
                                        <span className="bs-stepper-label">Evaluación general</span>
                                    </button>
                                    <button 
                                        className={"step-trigger " + (!this.state.HabilitarEvaluacionGeneral ? "": "d-none")}
                                        onClick={this.MostrarAyuda}>
                                        <span className="bs-stepper-circle">2</span>
                                        <span className="bs-stepper-label">Evaluación general</span>
                                        <i className="fa fa-question-circle fa-x" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="bs-stepper-content">
                                    <div id="test-l-1" className="content">
                                        <div className="row">
                                            <div className="col">
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">   
                                            

                                                {this.state.evaluacionPorMeta ? (
                                                    <EvaluacionPorMetas 
                                                        Evaluacion={this.state.evaluacionPorMeta} 
                                                        ColaboradorId={this.props.colaboradorSelected.colaboradorId} 
                                                        IdPadre={this.props.evaluacionSelected.evluacionId} >
                                                        
                                                    </EvaluacionPorMetas>

                                                ) : (
                                                    null
                                                )}
                                                    
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div id="test-l-2" className="content">
                                            <div className="row">
                                                <div className="col">
                                                    {this.state.evaluaciones2.map((evaluacion, index)=>{
                                                        return (
                                                            <div key={index}>
                                                                <EvaluacionGeneral Evaluacion={evaluacion} ></EvaluacionGeneral>
                                                            </div>
                                                        )
                                                    })} 
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
        evaluacionSelected : state.EvaluacionSelectedReducer,
        colaboradorSelected : state.ColaboradorSelectedReducer
    };
}


export default connect(
    mapStateToProps,
)(Evaluacion);