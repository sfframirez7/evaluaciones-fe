import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import Moment from 'react-moment';

import {ObtenerTodasEvaluacionesAnualesService} from '../../../services/EvaluacionesService'
import Loading from '../../common/Loading';

class MantenimientoEvaluaciones extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            evaluaciones: []
        }

        this.ObtenerEvaluacioneAnuales = this.ObtenerEvaluacioneAnuales.bind(this)
        
    }


    
    componentDidMount()
    {
        this.ObtenerEvaluacioneAnuales()
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

    render() {
        return (
            <div>

                <nav aria-label="breadcrumb bg-white d-print-none">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/settings', }}>
                                Mantenimientos
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Evaluaciones</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Evaluaciones
                </h2>

                <div className="row">
                    <div className="col text-right p-1 m-1">
                        
                    <Link to={{ pathname: '/settings/nuevaEvaluacion', }}>
                            <button 
                                    className="btn btn-primary collapsed" 
                                    type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                    <span className="m-1">
                                        Nueva evaluación
                                    </span>
                            </button>
                        </Link>


                    </div>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>


                <div className="row">
                    <div className="col">

                        <div style={{overflowX: 'auto'}}>

                            <table className="table table-striped table-hover  bg-white" >
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Descripción</th>
                                            <th>Activa</th>
                                            <th>Desde</th>
                                            <th>Hasta</th>
                                            {/* <th>Acciones</th> */}
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
                                                        {evaluacion.Estado ? (<i className="fa fa-check-square text-success" aria-hidden="true"></i>) : (
                                                            (<i className="fa fa-times-circle text-danger" aria-hidden="true"></i>)
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Moment add={{ days: 1 }}  format="YYYY/MM/DD">{evaluacion.Desde}</Moment>
                                                    </td>
                                                    <td>
                                                        <Moment add={{ days: 1 }}  format="YYYY/MM/DD">{evaluacion.Hasta}</Moment>
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
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}


export default connect(
    mapStateToProps,
)(MantenimientoEvaluaciones);