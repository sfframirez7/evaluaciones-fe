import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


import Loading from '../../common/Loading';
import BtnExportToExcel from '../../common/BtnExportToExcel';
import NoData from '../../common/NoData';
import { ObtenerReporteReseteoDeNota } from '../../../services/ReporteService';
import Moment from 'react-moment';
class ReporteReseteoDeNota extends Component {
    
    
    constructor(props) {
        super(props);

        this.state = {
            reseteos : [],
            cargando : false,
            pagina : 0
        }
        this.ObtenerHistorialReseteoDeNota = this.ObtenerHistorialReseteoDeNota.bind(this)
        this.SiguientePagina = this.SiguientePagina.bind(this)
        this.PaginaAnterior = this.PaginaAnterior.bind(this)
    }
    
    componentDidMount()
    {

        this.ObtenerHistorialReseteoDeNota()
    }


    ObtenerHistorialReseteoDeNota()
    {
        this.setState({ cargando : true})
        ObtenerReporteReseteoDeNota(this.state.pagina)
        .then((res) => {
            this.setState({reseteos: res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }

    SiguientePagina()
    {
        var paginaActual = this.state.pagina
        this.setState({ pagina : (paginaActual +50)}, ()=> {
            this.ObtenerHistorialReseteoDeNota()
        })

    }
    
    PaginaAnterior()
    {
        var paginaActual = this.state.pagina
        paginaActual = (paginaActual-50)
        if(paginaActual<0)
            paginaActual = 0

        this.setState({ pagina : paginaActual}, ()=> {
            this.ObtenerHistorialReseteoDeNota()
        })

    }
    
    render() {


        return (
            <div>

                <nav aria-label="breadcrumb bg-white d-print-none">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{ pathname: '/reportes', }}>
                                Reportes
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Reporte Reseteo de Nota</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Reporte Reseteo de Nota
                </h2>

                
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
                            <h5>Total: <span className="badge badge-secondary">{this.state.reseteos.length}</span></h5>
                        </div>
                    </div>

                    
                </div>      

                <div className="row">
                    <div className="col text-right">
                        <BtnExportToExcel 
                            TableSelector="#tbtReseteoDeNota"
                            FileName={"tbtReseteoDeNota"+new Date().getTime()+".csv"}>
                        </BtnExportToExcel>
                    </div>
                </div>

                
                <div className="row">
                    <div className="col">

                        <div style={{overflowX:'auto'}}>

                            <table id="tbtReseteoDeNota" 
                                    className="table table-striped table-hover  bg-white" style={{overflowX: 'auto'}}>
                                <thead>
                                    <tr>

                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Tipo Nota</th>
                                        <th>ReseteadaPor</th>
                                        <th>FechaAgregada</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {this.state.reseteos.map((colaborador, index)=> {
                                        return (
                                            <tr key={index}>
                                                <th>
                                                    {colaborador.ColaboradorId}
                                                </th>
                                                <td>
                                                    {colaborador.Nombre}
                                                </td>
                                                <td>
                                                    {colaborador.Nota}
                                                </td>
                                                <td>
                                                    {colaborador.ReseteadoPor}
                                                </td>
                                                <td>
                                                    <Moment format="YYYY/MM/DD">{colaborador.FechaAgregada}</Moment>
                                                </td>
              
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row pt-2">
                    <div className="col text-center">
                        <nav aria-label="..." className="text-center">
                            <ul className="pagination text-center" >
                            <li className={"page-item " + (this.state.pagina === 0  ? "disabled" : "")}>
                                    <button
                                        tabIndex="-1"
                                        type="button"
                                        className="page-link"
                                        disabled={(this.state.pagina === 0 )}
                                        onClick={()=> this.PaginaAnterior()}>
                                            <i className="fa fa-backward" aria-hidden="true"></i>
                                            <span className="mx-1">
                                                Anterior
                                            </span>
                                    </button>
                                </li>
                                <li className={"page-item " + ((this.state.reseteos.length === 0 )  ? "disabled" : "")}>
                                    <button
                                        type="button"
                                        className="page-link"
                                        disabled={(this.state.reseteos.length === 0  )}
                                        onClick={()=> this.SiguientePagina()}>
                                            <span className="mx-1">
                                                Siguiente
                                            </span>
                                            <i className="fa fa-forward" aria-hidden="true"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center">
                        <NoData NoData={this.state.reseteos.length === 0 && !this.state.cargando}/>
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
)(ReporteReseteoDeNota);