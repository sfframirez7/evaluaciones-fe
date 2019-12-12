import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Loading from '../../common/Loading';

import {ObtenerCargosPadreYEmpresaService} from '../../../services/CargoService'
import BtnExportToExcel from '../../common/BtnExportToExcel';

class MantenimientoCargos extends Component {


    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            cargos : [],
            cargosLoaded : []
        }

        this.ObtenerCargos = this.ObtenerCargos.bind(this)
        this.FiltarColaboradores = this.FiltarColaboradores.bind(this)
        
    }

    
    componentDidMount()
    {
        this.ObtenerCargos()
    }

    ObtenerCargos()
    {
        this.setState({ cargando : true})
        ObtenerCargosPadreYEmpresaService()
        .then((res) => {
            this.setState({cargos: res.data, cargosLoaded : res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }


    FiltarColaboradores(event)
    {
        this.setState({cargando: true})
        var txtBuscar = event.target.value
        var data = this.state.cargosLoaded.filter((cargo) => {
           
            if (cargo.Cargo.toString().toLowerCase().indexOf(txtBuscar.toLowerCase()) > -1 )
                return true
            else
                return ""
            
            })

        this.setState({cargos :data, cargando:false })
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
                        <li className="breadcrumb-item active" aria-current="page">Cargos</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Cargos
                </h2>

                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-right ">
                            
                    <Link to={{ pathname: '/settings/nuevoCargo', }}>
                        <button 
                                className="btn btn-primary " 
                                type="button" >
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                <span className="m-1">
                                    Nuevo
                                </span>
                        </button>
                    </Link>


                    </div>
                </div>


                <div className="row p-2">
                    <div className="col-12 col-md-4 offset-md-4 text-center">
                        <h4 className="card-title font-weight-bold">Buscar:</h4>                
                        <input 
                            className="form-control form-control-md " 
                            type="text" 
                            onChange={this.FiltarColaboradores}
                            placeholder="Cargo..." />  
                    </div>
                </div>

                <div className="row">
                    <div className="col text-right">
                        <BtnExportToExcel 
                            TableSelector="#tbtMantenimientoCargos"
                            FileName={"TablaMantenimientoCargos"+new Date().getTime()+".csv"}>
                        </BtnExportToExcel>
                    </div>
                </div>

                <div className="row">
                        <div className="col-12 ">
                            
                            <table id="tbtMantenimientoCargos" className="table table-striped table-hover bg-white">
                                    <thead>
                                        <tr>
                                            <th>
                                                No.
                                            </th>
                                            <th>
                                                Cargo
                                            </th>
                                            <th>
                                                Activo
                                            </th>
                                            <th>
                                                Área
                                            </th>
                                            <th>
                                                Depende de
                                            </th>
                                            <th>
                                                Empresa
                                            </th>
                                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.cargos.map((cargo, index)=> {
                                            return (

                                                <tr key={index}>
                                                    <td>
                                                        {cargo.IdCargo}
                                                    </td>
                                                    <td>
                                                        {cargo.Cargo}
                                                    </td>
                                                    <td>
                                                        {cargo.Activo ? (<i className="fa fa-check-square text-success" aria-hidden="true"></i>) : (
                                                            (<i className="fa fa-times-circle text-danger" aria-hidden="true"></i>)
                                                        )}
                                                    </td>
                                                    <td>
                                                        {cargo.Area}
                                                    </td>
                                                    <td>
                                                        {cargo.CargoPadre}
                                                    </td>
                                                    <td>
                                                        {cargo.Empresa}
                                                    </td>
    
                                                   
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                            </table>

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
)(MantenimientoCargos);