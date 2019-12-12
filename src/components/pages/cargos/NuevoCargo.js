import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import Swal from "sweetalert2";

import {ObtenerCargosService, NuevoCargoService} from '../../../services/CargoService'
import {ObtenerAreasService} from '../../../services/AreaService'

class NuevoCargo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            txtCargo : "",
            IdCargo : 0,
            IdArea : 0,
            cargos: [],
            areas : []
        }

        this.TxtFieldChangeHandler = this.TxtFieldChangeHandler.bind(this)
        this.ObtenerCargos = this.ObtenerCargos.bind(this)
        this.ObtenerAreas = this.ObtenerAreas.bind(this)
        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        this.CargoChangedHandler = this.CargoChangedHandler.bind(this)
        this.NuevoCargo = this.NuevoCargo.bind(this)
        this.ClearData  = this.ClearData.bind(this)
        this.ValidatarData  = this.ValidatarData.bind(this)
    }

    componentDidMount()
    {
        this.ObtenerCargos()
        this.ObtenerAreas()
    }


    TxtFieldChangeHandler(event)
    {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    ObtenerCargos()
    {
        this.setState({ cargando : true})
        ObtenerCargosService()
        .then((res) => {
            this.setState({cargos: res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }
   
    ObtenerAreas()
    {
        this.setState({ cargando : true})
        ObtenerAreasService()
        .then((res) => {
            this.setState({areas: res.data, cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
        });
    }


    CargoChangedHandler(event)
    {
        var IdCargo = event.target.value
        this.setState({IdCargo})
    }
   
    AreaChangedHandler(event)
    {
        var IdArea = event.target.value
        this.setState({IdArea})
    }

    NuevoCargo()
    {
        this.setState({cargando : true})

        if(!this.ValidatarData())
        {
            this.setState({cargando : false})
            return
        }
        
        var data = {
            Cargo        : this.state.txtCargo,
	        CargoPadreId : parseInt(this.state.IdCargo),
	        AgregadoPor  : 0,
	        AreaId       : parseInt(this.state.IdArea)
        }

        console.log(data)

        NuevoCargoService(data)
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
                title: 'Algo ha salido mal.',
                icon: 'error',
                text: "Error",
            });
        });

    }

    ValidatarData()
    {
        if(!this.state.txtCargo)
        {
            Swal.fire({
                title: 'Es necesario el nombre del cargo',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }
       
        if(parseInt(this.state.IdCargo) === 0)
        {
            Swal.fire({
                title: 'Debe seleccionar un cargo',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }

        if(parseInt(this.state.IdArea) === 0)
        {
            Swal.fire({
                title: 'Debes seleccionar una área',
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
            txtCargo : "",
            IdCargo : 0,
            IdArea : 0
        })
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
                            <Link to={{ pathname: '/settings/cargos', }}>
                                Cargos
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Nuevo cargo</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Nuevo cargo
                </h2>

                <div className="row mt-2">
                    <div className="col-12 col-md-6 offset-md-3 ">
                        <div className="form-group">
                            <h4 className="card-title font-weight-bold">Nombre cargo:</h4>
                            <textarea 
                                className="form-control" 
                                name="txtCargo" 
                                id="txtCargo"  
                                rows={3} 
                                placeholder="Nombre cargo"
                                value={this.state.txtCargo}
                                onChange={this.TxtFieldChangeHandler}>
                            </textarea>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-12 col-md-6 offset-md-3 ">
                        <div className="form-group">
                            <h4 className="card-title font-weight-bold">Cargo padre:</h4>
                            <select 
                                value={this.state.IdCargo} 
                                className="custom-select col-12  form-control" 
                                id="cmbSubAreas" 
                                onChange={ this.CargoChangedHandler }>
                                    <option value="0" >Seleccionar Cargo:</option>
                                    { this.state.cargos.map((cargo, index) => <option key={index} value={cargo.IdCargo}>{cargo.Cargo}</option>) }
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="row mt-2">
                    <div className="col-12 col-md-6 offset-md-3 ">
                        <div className="form-group">
                            <h4 className="card-title font-weight-bold">Área:</h4>
                            <select 
                                value={this.state.IdCargo} 
                                className="custom-select col-12  form-control" 
                                id="cmbSubAreas" 
                                onChange={ this.AreaChangedHandler }>
                                    <option value="0" >Seleccionar Cargo:</option>
                                    { this.state.areas.map((area, index) => <option key={index} value={area.IdArea}>{area.Area}</option>) }
                            </select>
                        </div>
                    </div>
                </div>


                <div className="row p-2 m-2">
                    <div className="col text-center">
                        <button 
                            className="btn btn-success"
                            disabled={this.state.cargando}
                            onClick={this.NuevoCargo}>
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
)(NuevoCargo);