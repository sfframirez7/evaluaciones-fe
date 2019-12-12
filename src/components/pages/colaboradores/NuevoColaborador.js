import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Loading from '../../common/Loading';
import Swal from "sweetalert2";
import {Calendar} from 'primereact/calendar';

import {NuevoColaboradorService} from '../../../services/ColaboradoresService'
import {ObtenerCargosService} from '../../../services/CargoService'

class NuevoColaborador extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando: false,
            txtCodigoEmpleado : 0,
            txtNombre : "",
            FechaIngreso : "",
            cargos : [],
            IdCargo : 0,
        }
        
        this.FechaChangeHandler = this.FechaChangeHandler.bind(this)
        this.TxtFieldChangeHandler = this.TxtFieldChangeHandler.bind(this)
        this.NuevoColaborador = this.NuevoColaborador.bind(this)
        this.ClearData = this.ClearData.bind(this)
        this.ValidatarData = this.ValidatarData.bind(this)
        this.ObtenerCargos = this.ObtenerCargos.bind(this)
        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)

    }
    

    componentDidMount()
    {
        this.ObtenerCargos()
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

    NuevoColaborador()
    {
        this.setState({cargando : true})

        if(!this.ValidatarData())
        {
            this.setState({cargando : false})
            return
        }

        var data = {
            IdColaborador : parseInt( this.state.txtCodigoEmpleado),
            Nombre        : this.state.txtNombre,
            FechaIngreso  : this.state.FechaIngreso.toISOString(),
            AgregadoPor   : 0,
            IdCargo :this.state.IdCargo
        }

        NuevoColaboradorService(data)
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

    AreaChangedHandler(event)
    {
        var IdCargo = event.target.value
        this.setState({IdCargo :  parseInt(IdCargo)})

    }


    ValidatarData()
    {
        if(!this.state.txtCodigoEmpleado)
        {
            Swal.fire({
                title: 'Es necesario el código del empleado',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }
       
        if(!this.state.txtNombre)
        {
            Swal.fire({
                title: 'Es necesaria el nombre del empleado',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }

        if(!this.state.FechaIngreso)
        {
            Swal.fire({
                title: 'Debes seleccionar una fecha de ingreso válida',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }
       
        if(!this.state.IdCargo)
        {
            Swal.fire({
                title: 'Debes seleccionar una cargo',
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
            txtCodigoEmpleado : 0,
            txtNombre : "",
            FechaIngreso : "",
            IdCargo : 0
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
                            <Link to={{ pathname: '/settings/colaboradores', }}>
                                Colaboradores
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Nuevo colaborador</li>
                    </ol>
                </nav>


                <h2 className="font-weight-bold">
                    Nuevo colaborador
                </h2>


                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-center">
                        <div className="form-group">
                            <h4 className="card-title font-weight-bold">Código del empleado:</h4>
                            <input 
                                className="form-control" 
                                type="number" 
                                placeholder="Código de empleado"
                                name="txtCodigoEmpleado"
                                value={this.state.txtCodigoEmpleado}
                                onChange={this.TxtFieldChangeHandler}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-center">
                        <div className="form-group">
                            <h4 className="card-title font-weight-bold">Nombre del empleado:</h4>
                            <textarea 
                                className="form-control" 
                                name="txtNombre" 
                                id="txtNombre"  
                                rows={3} 
                                placeholder="Nombre del empleado" 
                                value={this.state.txtNombre}
                                onChange={this.TxtFieldChangeHandler}>
                            </textarea>
                        </div>
                    </div>
                </div>


                <div className="row p-2">

                    <div className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 text-center">
                        <h4 className="card-title font-weight-bold">Fecha de ingreso:</h4>
                        <Calendar 
                            dateFormat="yy/mm/dd" 
                            name="FechaIngreso" 
                            value={this.state.FechaIngreso} 
                            monthNavigator={true} 
                            yearNavigator={true}
                            yearRange="1995:2060" 
                            onChange={(e) => this.FechaChangeHandler(e)}></Calendar>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="form-group">
                            <h4 className="card-title font-weight-bold">Cargo:</h4>
                            <select 
                                value={this.state.IdCargo} 
                                className="custom-select col-12 col-md-4 form-control" 
                                id="cmbSubAreas" 
                                onChange={ this.AreaChangedHandler }>
                                    <option value="0" >Seleccionar Cargo:</option>
                                    { this.state.cargos.map((cargo, index) => <option key={index} value={cargo.IdCargo}>{cargo.Cargo}</option>) }
                            </select>
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
                                onClick={this.NuevoColaborador}>
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
)(NuevoColaborador);