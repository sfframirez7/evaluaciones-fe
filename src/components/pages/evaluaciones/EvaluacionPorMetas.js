import React, { Component } from 'react';
import { connect } from 'react-redux';
import NuevEvaluacionArea from './NuevEvaluacionArea';

import Loading from '../../common/Loading'
import EsElUsuarioLogueado from '../../../services/EsElUsuarioLogueado'

import {EvaluacionCompletadaService, EliminarEvaluacionPorMetaService} from '../../../services/EvaluacionesService'
import Swal from "sweetalert2";


class EvaluacionPorMetas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            evaluacion : this.props.Evaluacion,
            // EvaluacionPadre : this.props.EvaluacionPadre,
            EvaluacionId: this.props.Evaluacion.IdEvaluacion,
            EvaluacionPadre: this.props.IdPadre,
            IdEvaluacionAnual: this.props.Evaluacion.IdEvaluacionAnual,
            colaboradorId: this.props.ColaboradorId,
            Respuestas : []
        }

        this.RespuestaAbiertahandleChange = this.RespuestaAbiertahandleChange.bind(this)
        this.GuardarEvaluacionCompletada = this.GuardarEvaluacionCompletada.bind(this)
        this.ValidateResponses = this.ValidateResponses.bind(this)
        this.EliminarEvaluacionPorMeta = this.EliminarEvaluacionPorMeta.bind(this)
        
    }

    RespuestaAbiertahandleChange(event, idPregunta, peso) {

        var txtRespuesta = event.target.value

        if(parseInt(txtRespuesta) > parseInt(peso) ||  parseInt(txtRespuesta) <0)
        {
            Swal.fire({
                title: 'Valor ingresado no válido. El valor obtenido no pueder ser mayor a la meta o menor que cero',
                icon: 'warning',
                text: "Atención",
            });

            var Respuestas2 = this.state.Respuestas

            var respuesta2 = Respuestas2.filter(function(value, index, arr){
               return value.idPregunta !== idPregunta;
           });

           this.setState({Respuestas : respuesta2})

            event.target.value = -1

            return false
        } 


        var objeto = {
            idPregunta : idPregunta,
            idRespuesta: parseInt( txtRespuesta),
            Valor: parseInt( txtRespuesta),
            TxtComentario : ""
        }

        var Respuestas = this.state.Respuestas

         var respuesta = Respuestas.filter(function(value, index, arr){
            return value.idPregunta === idPregunta;
        });

        if(respuesta.length > 0)
        {
            var actualizarRespuesta = respuesta[0]

            actualizarRespuesta.idRespuesta = parseInt( txtRespuesta)
            actualizarRespuesta.Valor = parseInt( txtRespuesta)

            var respuestas = Respuestas.filter(function(value, index, arr){
                return value.idPregunta !== idPregunta;
            });
            respuestas.push(actualizarRespuesta)
            this.setState({Respuestas : respuestas})
        }

        else {

            var filtered = Respuestas.filter(function(value, index, arr){
                return value.idPregunta !== idPregunta;
            });
    
            filtered.push(objeto)
            this.setState({Respuestas : filtered})
        }

    }


    ComentarioRespuestaUnicahandleChange(event, idPregunta) {

        var TxtComentario = event.target.value

        var objetoRespuesta = {
            idPregunta : idPregunta,
            idRespuesta: 0,
            Valor: 0,
            TxtComentario : ""
        }
        var Respuestas = this.state.Respuestas

        var filtered = Respuestas.filter(function(value, index, arr){
            return value.idPregunta === idPregunta;
        });

        if(filtered.length > 0)
        {
            var respuesta = filtered[0]
            respuesta.TxtComentario = TxtComentario

            var respuestas = Respuestas.filter(function(value, index, arr){
                return value.idPregunta !== idPregunta;
            });

            respuestas.push(respuesta)
            this.setState({Respuestas : respuestas})

        }
        else 
        {
            Respuestas.push(objetoRespuesta)
            this.setState({Respuestas : Respuestas})
        }

        
    }

    ValidateResponses()
    {
        var error = false

            this.state.evaluacion.PreguntasMeta.map((pregunta, index)=> {
                    if(pregunta.IdTipoRespuesta === 2)
                    {
                        var Respuestas = this.state.Respuestas
                        var respuestas = Respuestas.filter(function(value, index, arr){
                            return value.idPregunta === pregunta.IdPregunta;
                        });

                        if(respuestas.length === 0 || respuestas.Valor <0)
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
            return error

    }

    GuardarEvaluacionCompletada()
    {
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
        var IdEvaluacionAnual = parseInt( this.state.IdEvaluacionAnual)
        var Respuestas = this.state.Respuestas

        var objectoRespuesta = {
            IdColaborador : parseInt(IdColaborador),
            EvaluacionId,
            IdEvaluacionAnual,
            EvaluadoPor: 0,
            Respuestas 
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
    }

    EliminarEvaluacionPorMeta()
    {
        Swal.fire({
            title: 'Al eliminar esta meta, se borrarán los resultados de todos los colaboradores que se encuentren en ella. ESTA ACCIÓN NO SE PUEDE REVERTIR!',
            text: "¿Eliminar evaluación?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '##3085d6',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.value) {
                EliminarEvaluacionPorMetaService(this.state.IdEvaluacionAnual)
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

            <div className="container">

                <div className={"row " + (this.state.evaluacion.PreguntasMeta.length>0 ? "d-none" : "" ) }>
                    <div className="col-12 col-md-10 offset-md-1 text-center">
                    <div className={" " +(EsElUsuarioLogueado(this.props.colaboradorSelected.colaboradorId)  ? "d-none" : "")} >
                     
                        <div className="alert alert-primary alert-dismissible fade show" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong>¡Crear evaluación!</strong> No tienes creada tu evaluación por metas. Presion el botón <i>Crear evaluación</i> para que puedas evaluar a tu equipo
                        </div>

                        <button className="btn btn-primary collapsed m-4" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                            <span className="m-1">
                                Crear Evaluación Por Metas
                            </span>
                        </button>

                    </div>

                    <div className="collapse" id="collapseExample" >
                        <div >
                            <NuevEvaluacionArea EvaluacionPadre={this.state.EvaluacionPadre}></NuevEvaluacionArea>
                        </div>
                    </div>

                    </div>
                </div>


              


                <div className="row p-2 mb-4">
                    <div className="col col-lg-8 offset-lg-2">

                    <div className={"card bp-card " + (this.state.evaluacion.PreguntasMeta.length===0 ? "d-none" : "" ) }>
                            <div className="card-body">
                                <h2 className="card-title font-weight-bold text-center">{this.state.evaluacion.Titulo}</h2>
                                <hr/>

                                {/* <form onSubmit={this.GuardarEvaluacionCompletada} > */}
                                <fieldset disabled={ (this.state.evaluacion.Completo || EsElUsuarioLogueado(this.props.colaboradorSelected.colaboradorId)) ?  "disabled" : ""}>
                                {this.state.evaluacion.PreguntasMeta.map((pregunta, index)=>{
                                        return (
                                            <div key={index} className="">
                                                <div className="d-inline">
                                                    <div className="m-4 p-2">
                                                        <h5>
                                                            {index + 1 + ". " +pregunta.Pregunta}
                                                        </h5>

                                                        <div className="row">
                                                            <div className="col-12 col-md-4 offset-md-4 text-center">
                                                                    <input 
                                                                        className="form-control" 
                                                                        type="text" placeholder={"Meta: "+pregunta.Peso + "%"} disabled readOnly=""></input>
                                                            </div>
                                                        </div>

                                                        <div className="row">

                                                            <div className="col-12 col-md-8 offset-md-2 text-center">

                                                                
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text">{"Obtenido: "}</span>
                                                                    </div>
                                                                        <input 
                                                                            type="number" 
                                                                            className="form-control" 
                                                                            max="10"
                                                                            required
                                                                            aria-describedby="inputGroup-sizing-sm" 
                                                                            placeholder={(pregunta.Valor ? pregunta.Valor : 0.00) }
                                                                            onChange={e => this.RespuestaAbiertahandleChange(e, pregunta.IdPregunta, pregunta.Peso)}></input>
                                                                    <div className="input-group-append">
                                                                        <span className="input-group-text">%</span>
                                                                    </div>
                                                                </div>

                                                                    
                                                            </div>

                                                        </div>

                                                        <div className="row m-1">
                                                            <div className={"col col-md-8 offset-md-2 " +((this.state.evaluacion.Completo) ? "d-none": "" )}>
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    placeholder="Comentario opcional..."
                                                                    onChange={e => this.ComentarioRespuestaUnicahandleChange(e, pregunta.IdPregunta)}>
                                                                        
                                                                </input>
                                                            </div>
                                                            <div className={"col-12 col-md-10 offset-md-1 text-center " +(this.state.evaluacion.Completo  ) ? "": "d-none" } >

                                                                <div className={"alert alert-secondary " +(pregunta.Comentario ? "" : "d-none")} role="alert">
                                                                        {pregunta.Comentario}
                                                                </div>


                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>                                               
                                            </div>

                                        )

                                                })}

                                            <div className="row">
                                                <div className="col text-center">
                                                    <Loading Cargando={this.state.cargando} />
                                                </div>
                                            </div>

                                            <div className="col text-center">
                                                <div className={" " +(EsElUsuarioLogueado(this.props.colaboradorSelected.colaboradorId)  ? "d-none" : "")} >
                                                <button
                                                    type="submit"
                                                    disabled={ (this.state.evaluacion.Completo || this.state.cargando)}
                                                    // type="button"
                                                    className="btn btn-success text-center"
                                                    onClick={ () => this.GuardarEvaluacionCompletada()}>
                                                        Guardar
                                                    </button>
                                                    </div>
                                            </div>
                                            </fieldset>
                                        {/* </form> */}


                            </div>

                            {/* <div className={"row " +(EsElUsuarioLogueado(this.props.colaboradorSelected.colaboradorId)  ? "d-none" : "")} >
                                <div className="col text-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={this.EliminarEvaluacionPorMeta}
                                        >
                                        
                                        Eliminar Evaluación Por Meta</button>
                                </div>
                            </div> */}
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
        colaboradorSelected : state.ColaboradorSelectedReducer
    };
}

export default connect(
    mapStateToProps,
)(EvaluacionPorMetas);