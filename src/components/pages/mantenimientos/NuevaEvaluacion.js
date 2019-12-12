import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

import Swal from "sweetalert2";
import {Calendar} from 'primereact/calendar';

import {NuevaEvaluacionAnual} from '../../../services/EvaluacionesService'
import Loading from '../../common/Loading';

class NuevaEvaluacion extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            txtTitulo : "",
            txtDescripcion : "",
            FechaDesde : null,
            FechaHasta : null,
        }

        this.FechaChangeHandler = this.FechaChangeHandler.bind(this)
        this.TxtFieldChangeHandler = this.TxtFieldChangeHandler.bind(this)
        this.CrearNuevaEvaluacion = this.CrearNuevaEvaluacion.bind(this)
        this.ValidatarData = this.ValidatarData.bind(this)
        this.ClearData = this.ClearData.bind(this)

    }


    FechaChangeHandler(event)
    {
        const name = event.target.name;
        this.setState({[name] : event.value})
    }

  
    TxtFieldChangeHandler(event)
    {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    ValidatarData()
    {
        if(!this.state.txtTitulo)
        {
            Swal.fire({
                title: 'Es necesario el título de la evaluación',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }
       
        if(!this.state.txtDescripcion)
        {
            Swal.fire({
                title: 'Es necesaria la descripción de la evaluación',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }

        if(!this.state.FechaDesde)
        {
            Swal.fire({
                title: 'Debes seleccionar una fecha Desde válida',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }
       
        if(!this.state.FechaHasta)
        {
            Swal.fire({
                title: 'Debes seleccionar una fecha Hasta válida',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }
        return true
    }


    ClearData()
    {
        this.setState({
            txtTitulo: "",
            txtDescripcion : "",
            FechaDesde : "",
            FechaHasta : ""
        })
    }


    CrearNuevaEvaluacion()
    {
        this.setState({cargando : true})

        if(!this.ValidatarData())
        {
            this.setState({cargando : false})
            return
        }


        var evaluacion = {
            "Titulo"	    : this.state.txtTitulo,
            "Descripcion"	: this.state.txtDescripcion,
            "Desde"        	: this.state.FechaDesde.toISOString(),
            "Hasta"         : this.state.FechaHasta.toISOString(),
            "TodasLasAreas"	: true,
            "TodoElEquipo"	:true,
            "Estado"     : true
        }

        NuevaEvaluacionAnual(evaluacion)
        .then((res) => {
            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });
            this.setState({cargando : false})
            this.ClearData()
            
        }).catch((err) => {
            this.setState({cargando : false})
            Swal.fire({
                title: 'No se ha podido crea la nueva evaluación.'+err.response ? err.response.data : "",
                icon: 'error',
                text: "Error",
            });
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
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/settings/evaluaciones', }}>
                                Evaluaciones
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Nueva evaluación</li>
                    </ol>
                </nav>


                <h2 className="text-center font-weight-bold">
                    Nueva evaluación
                </h2>

                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="form-group">
                            <h3>Título:</h3>
                            <input 
                                className="form-control" 
                                type="text" 
                                placeholder="Título..."
                                name="txtTitulo"
                                value={this.state.txtTitulo}
                                onChange={this.TxtFieldChangeHandler}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="form-group">
                            <h3>Descripción:</h3>
                            <textarea 
                                className="form-control" 
                                name="txtDescripcion" 
                                id="txtDescripcion"  
                                rows={3} 
                                placeholder="Descripción..." 
                                value={this.state.txtDescripcion}
                                onChange={this.TxtFieldChangeHandler}>

                            </textarea>
                        </div>
                    </div>
                </div>

                    <div className="row m-3">
                        <div className="col-12 col-md-6 offset-md-3 text-center">
                            <div className="custom-control custom-checkbox">
                                <input 
                                    type="checkbox" 
                                    disabled
                                    className="custom-control-input" 
                                    id="customCheck1"
                                    checked={true}
                                    onChange={this.chkTodaElAreaHanlder}
                                    value={this.state.chkTodaElArea}  />
                                <label className="custom-control-label" htmlFor="customCheck1">Todas las áreas</label>
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-12 col-md-8 offset-md-2">
                            <h3 className="text-center">Disponible</h3>
                            <div className="row">

                                <div className="col text-center">
                                    <h4>Desde:</h4>
                                    <Calendar dateFormat="yy/mm/dd" name="FechaDesde" value={this.state.FechaDesde} onChange={(e) => this.FechaChangeHandler(e)}></Calendar>
                                </div>
                                <div className="col text-center">
                                    <h4>Hasta:</h4>
                                    <Calendar dateFormat="yy/mm/dd" name="FechaHasta" value={this.state.FechaHasta} onChange={(e) => this.FechaChangeHandler(e)}></Calendar>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} ></Loading>
                        </div>
                    </div>


                    <div className="row p-2 m-2">
                        <div className="col text-center">
                            <button 
                                className="btn btn-success"
                                disabled={this.state.cargando}
                                onClick={this.CrearNuevaEvaluacion}>
                                Guardar
                            </button>
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
)(NuevaEvaluacion);