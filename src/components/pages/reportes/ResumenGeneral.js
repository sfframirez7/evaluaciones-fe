import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnPDF from '../../common/BtnPDF';
import UsuarioLogueado from '../../common/UsuarioLogueado';

import {ObtenerResultadosService} from '../../../services/ResultadosService'
import { ColaboradorModel } from '../../../Models/ColaboradorModel';

class ResumenGeneral extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            IdColaborador : 0,
            ReporteGeneral : {
                Colaborador : ColaboradorModel,
                Resultados : []
            }
        }

        this.ObtenerResultados = this.ObtenerResultados.bind(this)
        
    }


    ObtenerResultados(idColaborador)
    {
        ObtenerResultadosService(idColaborador)
        .then((res) => {
            console.log(res.data)
            this.setState({ReporteGeneral : res.data})
        }).catch((err) => {
            
        });
    }


    render() {
        return (
            <div>

                <div className="row">
                    <div className="col text-right">
                        <BtnPDF></BtnPDF>
                    </div>
                </div>

                <div className="row d-none d-print-inline">
                    <div className="col">
                        Printed by: <UsuarioLogueado></UsuarioLogueado>
                    </div>
                </div>


                <div className="row">
                    <div className="col">

                        <div className="card">
                            <h3 className="card-header">Resultados</h3>
                            <div className="card-body">
                                <div className="row p-1">
                                    <div className="col-12 col-md-6">
                                        <div className="d-inline">
                                            <h5 className="d-inline">Código: </h5>
                                            <h6 className="d-inline">{this.props.ReporteGeneral.Colaborador.IdColaborador}</h6>        
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="d-inline">
                                            <h5 className="d-inline">Nombre: </h5>
                                            <h6 className="d-inline">{this.props.ReporteGeneral.Colaborador.NombreColaborador}</h6>        
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <div className="col-12 col-md-6">
                                        <div className="d-inline">
                                            <h5 className="d-inline">Área: </h5>
                                            <h6 className="d-inline">{this.props.ReporteGeneral.Colaborador.Area}</h6>        
                                        </div>

                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="d-inline">
                                            <h5 className="d-inline">Puesto: </h5>
                                            <h6 className="d-inline">{this.props.ReporteGeneral.Colaborador.Cargo}</h6>        
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    <div className="col-12 col-md-6">
                                        <div className="d-inline">
                                            <h5 className="d-inline">Jefe inmediato: </h5>
                                            <h6 className="d-inline">{this.props.ReporteGeneral.Colaborador.NombreJefeImmediato}</h6>        
                                        </div>   
                                    </div>
                                    
                                </div>


                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2">
                                        <div style={{overflowX: 'auto'}}>

                                        
                                            <table className="table table-striped table-bordered table-hover bg-white" style={{overflowX: 'auto'}}>
                                                <thead>
                                                    <tr>
                                                        <th>Período</th>
                                                        <th>% Cumplimiento de competencias </th>
                                                        <th>% Evaluación de Metas</th>
                                                        <th>% Desempeño Global</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                            
                                                    {this.props.ReporteGeneral.Resultados.map((resultado, index)=> {
                                                        return (
                                                            <tr key={index}>
                                                                <td>
                                                                    {resultado.Anio}
                                                                </td>
                                                                <td>
                                                                    {resultado.CumplimientoEnBaseA60 +"%"}
                                                                </td>
                                                                <td>
                                                                    {resultado.CumplimientoEnBaseA40 +"%"}
                                                                </td>
                                                                <td>
                                                                    {parseFloat(parseFloat(resultado.CumplimientoEnBaseA60) + parseFloat(resultado.CumplimientoEnBaseA40)).toFixed(2) + "%"}
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
        );
    }
}

function mapStateToProps(state) {
    return {
        ReporteGeneral : state.ReporteGeneralReducer
    };
}

export default connect(
    mapStateToProps,
)(ResumenGeneral);