import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import TituloPrincipal  from '../../common/TituloPrincipal'
import Loading from '../../common/Loading'
import NoData from '../../common/NoData'
import {ObtenerEvaluacionesService} from '../../../services/EvaluacionesService'



class Evaluaciones extends Component {


    constructor(props) {
        super(props);
        
        this.state = {
            cargando : false,
            evaluaciones : []
        }

        this.SeleccionarEvaluacion = this.SeleccionarEvaluacion.bind(this)
        this.ObtenerEvaluaciones = this.ObtenerEvaluaciones.bind(this)
    }

    componentDidMount()
    {
        this.ObtenerEvaluaciones()
    }

    ObtenerEvaluaciones()
    {
        this.setState({cargando  : true})
        ObtenerEvaluacionesService()
        .then((res) => {
            this.setState({evaluaciones : res.data, cargando : false})
        }).catch((err) => {
            this.setState({cargando  : true})
        });
    }


    SeleccionarEvaluacion(id, titulo, detalle)
    {
        var evaluacion = {
            evluacionId : id,
            evaluacion: titulo,
            evaluacionDetalle: detalle
        }

        this.props.dispatch({type:'SELECT_EVALUACION', data: evaluacion}) 

        this.props.history.push("/equipo")
    }


    render() {
        return (
            <div>
                <div className="container">
                    
                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Evaluaciones"></TituloPrincipal>
                        </div>
                    </div>

                    
                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} />
                        </div>
                    </div>
                   
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2 ">
                            <div className="alert alert-primary" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="alert-heading">¡Evaluaciones!</h4>
                                    Aquí se muestran las evaluaciones disponibles.
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <NoData NoData={this.state.evaluaciones.length === 0 && !this.state.cargando}/>
                        </div>
                    </div>

                    {this.state.evaluaciones.map((evaluacion, index)=> {
                        return (
                            <div key={index}>
                            
                                <div className="row">
                                    <div className="col">

                                        <div className="card bp-card list-group-item list-group-item-action m-1">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-12 col-md-10">

                                                        <h4 className="card-title font-weight-bold"> {evaluacion.Titulo}</h4>
                                                        <p className="card-text"> {evaluacion.Descripcion}</p>
                                                        <p className="mb-1">
                                                            Creada por:  {evaluacion.NombreCreador} -  
                                                            Fecha creación: <Moment format="YYYY/MM/DD">{evaluacion.FechaCreacion}</Moment>
                                                        </p>
                                                        <p className="mb-1 font-weight-bold">
                                                            Disponible
                                                            Desde:  <Moment format="YYYY/MM/DD">{evaluacion.Desde}</Moment> - 
                                                            Hasta: <Moment format="YYYY/MM/DD">{evaluacion.Hasta}</Moment>
                                                        </p>
                                                    </div>
                                                        <div className="col-12 col-md-2 text-right">

                                                                <button 
                                                                    className=" btn btn-outline-primary m-1" 
                                                                    data-toggle="tooltip" 
                                                                    data-placement="top" title="Ver equipo"
                                                                    onClick={()=> this.SeleccionarEvaluacion(evaluacion.IdEvaluacionAnual, evaluacion.Titulo, evaluacion.Descripcion)} >
                                                                    <span className="m-1">
                                                                        Ver
                                                                    </span>
                                                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                                                </button>

                                                        </div>
                                                </div>
                                            </div>
                                        </div>              
                                    </div>
                                </div>
                            </div>
                        )
                    })}

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
)(Evaluaciones);