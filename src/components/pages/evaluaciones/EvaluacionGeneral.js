import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loading from '../../common/Loading'

import {EvaluacionCompletadaService} from '../../../services/EvaluacionesService'
import {TipoPregunta} from '../../../Models/TipoPreguntasModel';
import Swal from "sweetalert2";
import EsElUsuarioLogueado from '../../../services/EsElUsuarioLogueado'
import {AceptarEvaluacionService} from '../../../services/EvaluacionesService'

class EvaluacionGeneral extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            evaluacion : this.props.Evaluacion,
            EvaluacionId: this.props.Evaluacion.IdEvaluacion,
            IdEvaluacionAnual: this.props.Evaluacion.IdEvaluacionAnual,
            colaboradorId: this.props.Evaluacion.IdColaborador,
            respuestasUnica : [],
            respuestasMultiples : [],
            respuestasAbiertas : [],
            EsElDueno: false,
            MostrarBtnAceptarEvaluacion : false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.RespuestaUnicaHandlerChange = this.RespuestaUnicaHandlerChange.bind(this)
        this.ComentarioRespuestaUnicahandleChange = this.ComentarioRespuestaUnicahandleChange.bind(this)
        this.ValidateResponses = this.ValidateResponses.bind(this)
        this.AceptarEvaluacion = this.AceptarEvaluacion.bind(this)

    }


    componentDidMount()
    {
        if(EsElUsuarioLogueado(this.state.colaboradorId) && !this.state.evaluacion.AceptoEvaluacion)
                this.setState({MostrarBtnAceptarEvaluacion : true})
    }


    RespuestaUnicaHandlerChange(idPregunta, idRespuesta, IdRespuestaPorPregunta, Valor)
    {
        var objeto = {
            idPregunta : idPregunta,
            idRespuesta: idRespuesta,
            IdRespuestaPorPregunta : IdRespuestaPorPregunta,
            Valor : Valor,
            TxtComentario : ""
        }
         var respuestasUnica = this.state.respuestasUnica

         var respuesta = respuestasUnica.filter(function(value, index, arr){
            return value.idPregunta === idPregunta;
        });

        if(respuesta.length > 0)
        {
            var actualizarRespuesta = respuesta[0]

            
            actualizarRespuesta.idRespuesta = idRespuesta
            actualizarRespuesta.IdRespuestaPorPregunta = IdRespuestaPorPregunta
            actualizarRespuesta.Valor = Valor

            var respuestas = respuestasUnica.filter(function(value, index, arr){
                return value.idPregunta !== idPregunta;
            });
            respuestas.push(actualizarRespuesta)
            this.setState({respuestasUnica : respuestas})
        }

        else {

            var filtered = respuestasUnica.filter(function(value, index, arr){
                return value.idPregunta !== idPregunta;
            });
    
            filtered.push(objeto)
            this.setState({respuestasUnica : filtered})
        }
       
    }

    
    ComentarioRespuestaUnicahandleChange(event, idPregunta) {

        var TxtComentario = event.target.value

        var objetoRespuesta = {
            idPregunta : idPregunta,
            TxtComentario: TxtComentario,
            IdRespuestaPorPregunta: 0,
            Valor : 0,
            idRespuesta : 0
        }
        var respuestasUnica = this.state.respuestasUnica

        var filtered = respuestasUnica.filter(function(value, index, arr){
            return value.idPregunta === idPregunta;
        });

        if(filtered.length > 0)
        {
            var respuesta = filtered[0]
            respuesta.TxtComentario = TxtComentario

            var respuestas = respuestasUnica.filter(function(value, index, arr){
                return value.idPregunta !== idPregunta;
            });

            respuestas.push(respuesta)
            this.setState({respuestasUnica : respuestas})

        }
        else 
        {
            respuestasUnica.push(objetoRespuesta)
            this.setState({respuestasUnica : respuestasUnica})
        }
        
    }

    ValidateResponses()
    {
        var error = false

            this.state.evaluacion.EncabezadoPreguntas.map((seccion, index)=> {
                return seccion.Preguntas.map((pregunta, index)=> {
                   if(pregunta.IdTipoRespuesta === 1)
                    {
                        var respuestasUnica = this.state.respuestasUnica
                        var respuestas = respuestasUnica.filter(function(value, index, arr){
                            return value.idPregunta === pregunta.IdPregunta;
                        });

                        if(respuestas.length === 0)
                        {
                            error = true
                            return true
                        }
                        else 
                            return false
                    }
                    else 
                        return false
                })
            })
            return error

    }



    handleSubmit(event) {

        this.setState({cargando: true})

        if(this.ValidateResponses())
        {
            Swal.fire({
                title: 'Al parecer no has completado todas las preguntas',
                icon: 'warning',
                text: "Atención",
            });
            this.setState({cargando: false})
            return
        }

        var IdColaborador = this.state.colaboradorId
        var EvaluacionId = this.state.EvaluacionId
        var IdEvaluacionAnual = this.state.IdEvaluacionAnual

        var respuestaSeleccionUnica = this.state.respuestasUnica

        var objectoRespuesta = {
            IdColaborador,
            EvaluacionId,
            IdEvaluacionAnual,
            EvaluadoPor: 0,
            Respuestas : respuestaSeleccionUnica
        }

        EvaluacionCompletadaService(objectoRespuesta)
        .then(res => {
            this.setState({cargando: false})
            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });
            window.history.back();

        }).catch((error) => {
            console.log(error)
            this.setState({cargando: false})
            Swal.fire({
                title: 'No se ha podido actulizar la información. Por favor reintenta más tarde.',
                icon: 'error',
                text: "Error",
            });
        })
        

        return
      }


      AceptarEvaluacion()
      {
        this.setState({cargando: true})

        Swal.fire({
            title: 'Al hacer click en el botón OK, aceptas el resultado de la evaluación',
            text: "Aceptar evaluación",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
                AceptarEvaluacionService(this.state.EvaluacionId)
                .then((res) => {
                    this.setState({cargando: false})
                    Swal.fire({
                        title: 'Información guardada exitosamente',
                        icon: 'success',
                        text: "Éxito",
                    });
                    window.history.back();
                    
                }).catch((err) => {
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

                <div className={"row " + (this.state.MostrarBtnAceptarEvaluacion ? "" : "d-none")}>
                    <div className="col text-center">
                        <button 
                            className="btn btn-success"
                            onClick={this.AceptarEvaluacion}>
                            Confirmar evaluación
                        </button>
                    </div>
                </div>

                <div className={"row " +(!this.state.evaluacion.PermiteGuardar && !this.state.evaluacion.Completo ? "" : "d-none")}>
                {/* <div className={"row " }> */}
                    <div className="col-12 col-md-10 offset-md-1">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong>!No disponible!</strong> La evaluación no está disponible para ser completada.
                        </div>

                    </div>
                </div>

                 <div className="row p-2 mb-4">
                    <div className="col col-lg-8 offset-lg-2">

                        <div className="card bp-card">
                            <div className="card-body">
                                <h2 className="card-title font-weight-bold text-center">{this.state.evaluacion.Titulo}</h2>
                                <hr/>

                                <form onSubmit={this.handleSubmit} >
                                <fieldset disabled={ (this.state.evaluacion.PermiteGuardar) ?  "" : "disabled"}>
                                {this.state.evaluacion.EncabezadoPreguntas.map((seccion, index)=>{
                                        return (
                                            <div key={index} className="">
                                                <div className="d-inline">
                                                    <div>

                                                        <span className="badge badge-info p-2 px-3 rounded-lg d-inline">
                                                            {seccion.Descripcion + " - ("+ seccion.Nivel + " " +seccion.GradoPuesto+")"}
                                                        </span>

                                                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
                                                            <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                    <div className="collapse" id="collapseExample" >
                                                        <div className="card card-body">
                                                            {seccion.Detalle}
                                                        </div>
                                                    </div>

                                                </div>
                                                <fieldset disabled={ (this.state.evaluacion.Completo) ?  "disabled" : ""}>
                                                   {seccion.Preguntas !== null ? (
                                                       
                                                    <div>
                                                        {seccion.Preguntas.map((pregunta, index)=> {
                                                            return (
                                                                <div key={index} className="">

                                                                    { pregunta.IdTipoRespuesta === TipoPregunta.Unica ? (
                                                                        <div className="m-4 p-2">

                                                                            <h5>
                                                                                {index + 1 + " " +pregunta.Pregunta}
                                                                            </h5>

                                                                            {pregunta.Respuestas.map((opcion, index)=> {

                                                                                return (
                                                                                    <div key={index}>

                                                                                            <div className="custom-control custom-radio m-2">
                                                                                                <div className="custom-control custom-radio">
                                                                                                    <input
                                                                                                        type="radio"
                                                                                                        id={"customRadio1"+pregunta.IdPregunta +index}
                                                                                                        name={"customRadio1"+pregunta.IdPregunta }
                                                                                                        value={opcion.valor}
                                                                                                        defaultChecked={opcion.Valor===opcion.ValorSeteado}
                                                                                                        required
                                                                                                        className="custom-control-input"
                                                                                                        onClick={ ()=>  this.RespuestaUnicaHandlerChange(pregunta.IdPregunta, opcion.IdDetallePregunta, opcion.IdRespuestaPorPregunta, opcion.Valor)}/>
                                                                                                    <label className="custom-control-label" htmlFor={"customRadio1" +pregunta.IdPregunta +index}>
                                                                                                        {opcion.Etiqueta}
                                                                                                    </label>
                                                                                                </div>
                                                                                            </div>
                                                                                    </div>
                                                                                    )
                                                                                })}
                                                                                <div className="row">
                                                                                    <div className={"col col-md-8 offset-md-2 " +((this.state.evaluacion.Completo) ? "d-none": "" )}>
                                                                                        <input 
                                                                                            className="form-control" 
                                                                                            type="text" 
                                                                                            placeholder="Comentario opcional..."
                                                                                            onChange={e => this.ComentarioRespuestaUnicahandleChange(e, pregunta.IdPregunta)}>
                                                                                                
                                                                                        </input>
                                                                                    </div>
                                                                                    <div 
                                                                                        className={"col-12 col-md-10 offset-md-1 " +(this.state.evaluacion.Completo  ) ? "": "d-none" } >

                                                                                        <div className={"alert alert-secondary " +(pregunta.Respuestas[0].Comentario ? "" : "d-none")} role="alert">
                                                                                                {pregunta.Respuestas[0].Comentario}
                                                                                        </div>


                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        ) : (null)}
                                                                </div>
                                                            )
                                                        })}
                                                </div>
                                                   ) : (
                                                       null
                                                   )}
                                                    
                                                    </fieldset>
                                            </div>
                                        )
                                        

                                                })}
                                        </fieldset>

                                            <div className="row">
                                                <div className="col text-center">
                                                    <Loading Cargando={this.state.cargando} />
                                                </div>
                                            </div>

                                            <div className="col text-center">
                                                {this.state.evaluacion.PermiteGuardar ? (
                                                    <button
                                                        type="submit"
                                                        disabled={ (this.state.evaluacion.Completo || this.state.cargando )}
                                                        className="btn btn-success text-center"
                                                        onClick={ () => this.handleSubmit()}>
                                                            Guardar
                                                    </button>
                                                ) : (
                                                    null
                                                )}
                                            </div>
                                        </form>


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

    };
}


export default connect(
    mapStateToProps,
)(EvaluacionGeneral);