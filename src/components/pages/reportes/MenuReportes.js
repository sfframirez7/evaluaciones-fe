import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'

class MenuReportes extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            Reportes: []
        }

        this.LoadMenuReportes = this.LoadMenuReportes.bind(this)

    }


    componentDidMount()
    {
        this.LoadMenuReportes()
    }


    LoadMenuReportes()
    {
        var reportes  = [
            {Nombre: "Reporte general", Descripcion: "Descripción...", Ruta: "/reportes/reporteGeneral", Icono :"fa-id-card-o"},
            {Nombre: "Reporte histórico de notas", Descripcion: "Descripción...", Ruta: "/reportes/reporteHistoricoNotas", Icono :"fa-id-card-o"},
            {Nombre: "Colaboradores pendientes de evaluación", Descripcion: "Descripción...", Ruta: "/reportes/pendientesDeEvaluacion", Icono :"fa-id-card-o"},
            {Nombre: "Resultado evaluación por competencias conductuales", Descripcion: "Descripción...", Ruta: "/reportes/one", Icono :"fa-id-card-o"}
        ]

        this.setState({Reportes : reportes})
    }


    render() {
        return (
            <div>

                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                        <div className="list-group">

                           {this.state.Reportes.map((reporte, index)=> {
                               return (
                                <Link key={index} to={{pathname: reporte.Ruta,}} className="list-group-item list-group-item-action flex-row align-items-start">
                                <div className="row">
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className={"fa  fa-2x " + reporte.Icono} aria-hidden="true"></i>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1 font-weight-bold">{reporte.Nombre}</h5>
                                            </div>
                                            <p className="mb-1">{reporte.Descripcion}</p>
                                        </div>
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-arrow-right fa-lg text-primary " aria-hidden="true"></i>
                                        </div>
                                    </div>
                            </Link>
                               )
                           })}


                           
                            {/* <Link to={{pathname: '/reportes/reporteGeneral',}} className="list-group-item list-group-item-action flex-row align-items-start">
                                <div className="row">
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-id-card-o fa-2x" aria-hidden="true"></i>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1 font-weight-bold">Reporte general</h5>
                                            </div>
                                            <p className="mb-1">Descripción...</p>
                                        </div>
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-arrow-right fa-lg text-primary " aria-hidden="true"></i>
                                        </div>
                                    </div>
                            </Link>
                            <Link to={{pathname: '/reportes/reporteHistoricoNotas',}} className="list-group-item list-group-item-action flex-row align-items-start">
                                <div className="row">
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-id-card-o fa-2x" aria-hidden="true"></i>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Reporte historico de notas</h5>
                                            </div>
                                            <p className="mb-1">Descripción...</p>
                                        </div>
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-arrow-right fa-lg text-primary " aria-hidden="true"></i>
                                        </div>
                                    </div>
                            </Link>
                            <Link to={{pathname: '/reportes/pendientesDeEvaluacion',}} className="list-group-item list-group-item-action flex-row align-items-start">
                                <div className="row">
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-id-card-o fa-2x" aria-hidden="true"></i>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Colaboradores pendientes de evaluación</h5>
                                            </div>
                                            <p className="mb-1">Descripción...</p>
                                        </div>
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-arrow-right fa-lg text-primary " aria-hidden="true"></i>
                                        </div>
                                    </div>
                            </Link>
                            <Link to={{pathname: '/reportes/one',}} className="list-group-item list-group-item-action flex-row align-items-start">
                                <div className="row">
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-id-card-o fa-2x" aria-hidden="true"></i>
                                        </div>
                                        <div className="col">
                                            <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1">Resultado evaluación por competencias conductuales</h5>
                                            </div>
                                            <p className="mb-1">Descripción...</p>
                                        </div>
                                        <div className="col-2 col-md-1 d-flex align-items-center">
                                            <i className="fa fa-arrow-right fa-lg text-primary " aria-hidden="true"></i>
                                        </div>
                                    </div>
                            </Link>
                            */}
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
)(MenuReportes);