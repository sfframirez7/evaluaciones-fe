import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Loading from '../../common/Loading';
import {ObtenerCargosGradosService, UpdateCargosGradosService} from '../../../services/ColaboradoresService'
import { ObtenerGrados} from '../../../services/AreaService'
import Swal from "sweetalert2";

class CargoGrado extends Component {

    
    constructor(props) {
        super(props);
        
        this.state = {
            cargando : false,
            cargoGrados: [],
            cargoGradosLoaded: [],
            cargosGradosSelected: [],
            GradoSeleccionado : 0
        }

        this.ObtenerCargosGradosService = this.ObtenerCargosGradosService.bind(this)
        this.FiltarCargoGrados= this.FiltarCargoGrados.bind(this)
        this.ToggleSeleccionarCargo= this.ToggleSeleccionarCargo.bind(this)
        this.GradoChangedHandler= this.GradoChangedHandler.bind(this)
        this.GuardarDatos = this.GuardarDatos.bind(this)
        this.ValidateData = this.ValidateData.bind(this)
    }

    componentDidMount()
    {
        this.ObtenerCargosGradosService()
        ObtenerGrados()
    }


    ObtenerCargosGradosService()
    {
        this.setState({cargando : true})
        ObtenerCargosGradosService()
        .then((res) => {
            this.setState({cargoGrados : res.data, cargoGradosLoaded : res.data, cargando : false})
        }).catch((err) => {
            this.setState({cargando : false})
        });
    }

    FiltarCargoGrados(event)
    {
        var txtBuscar = event.target.value

        var data = this.state.cargoGradosLoaded.filter((cargo)=> {
            if(cargo.Cargo.toString().toLowerCase().indexOf(txtBuscar) > -1)
                return true
            else
                return false
        })

        this.setState({cargoGrados: data})

    }

    ToggleSeleccionarCargo(event)
    {
        var checked = event.target.checked
        var IdCargo = event.target.value

        var cargosGradosSelected = this.state.cargosGradosSelected

        if(checked)
        {
            cargosGradosSelected.push(parseInt(IdCargo))
            this.setState({cargosGradosSelected})
        }
        else {
            var data = cargosGradosSelected.filter((cargo)=> {
                 if(cargo !== parseInt(IdCargo))
                    return true
                else
                    return false
            })

            this.setState({cargosGradosSelected : data})
        }

    }

    GradoChangedHandler(event)
    {
        var GradoSeleccionado = event.target.value
        this.setState({GradoSeleccionado})
    }

    ValidateData()
    {
        var GradoSeleccionado = this.state.GradoSeleccionado
        var cargos = this.state.cargosGradosSelected
        
        if(GradoSeleccionado === 0)
        {
            Swal.fire({
                title: 'Debes seleccionar un grado',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }
        
        if(cargos.length === 0)
        {
            Swal.fire({
                title: 'Debes seleccionar un al menos un cargo',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }

        return true

    }


    GuardarDatos()
    {
        if(!this.ValidateData())
            return

        var GradoSeleccionado = this.state.GradoSeleccionado
        var cargos = this.state.cargosGradosSelected


        var data = {
            IdGrado : parseInt(GradoSeleccionado),
            cargos
        }

        this.setState({cargando : true})

        UpdateCargosGradosService(data)
        .then((res) => {
            this.ObtenerCargosGradosService()
            Swal.fire({
                title: 'Información actualziada exitosamente',
                icon: 'success',
                text: "Atención",
            });
            this.setState({cargando : false})
        }).catch((err) => {
            Swal.fire({
                title: 'Algo ha salido mal',
                icon: 'error',
                text: "Error",
            });
            this.setState({cargando : false})
        });
    }

    render() {
        return (
            <div>
                <nav aria-label="breadcrumb bg-white">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{
                                    pathname: '/settings',
                                    }}>
                                    Mantenimientos
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Cargos grados</li>
                    </ol>
                </nav>


                <h4 className="font-weight-bold">
                    Cargos Grados
                </h4>
              

                <div className="row p-2">
                    <div className="col-12 col-md-4 offset-md-4 text-center">
                        <h4 className="card-title font-weight-bold">Buscar:</h4>                
                        <input 
                            className="form-control form-control-md " 
                            type="text" 
                            onChange={this.FiltarCargoGrados}
                            placeholder="filtrar..." />  
                    </div>
                </div>

                <div className="row p-2">
                    <div className="col-12 col-md-4 offset-md-4 text-center">
                        <select 
                            value={this.state.GradoSeleccionado} 
                            className="custom-select " 
                            id="cmbGrados" 
                            onChange={ this.GradoChangedHandler }>
                                <option value="0" >Seleccionar:</option>
                                { this.props.Grados.map((grado, index) => <option key={index} value={grado.IdGrado} >{grado.Nivel + " - " + grado.GradoPuesto} </option>) }
                        </select>

                    </div>
                </div>

                <div className="row m-1">
                    <div className="col text-center">
                        <button 
                            className="btn btn-success"
                            onClick={this.GuardarDatos}>
                            Guardar
                        </button>
                    </div>
                </div>
                
                
                <div className="row">
                    <div className="col text-center">
                        <Loading Cargando={this.state.cargando} ></Loading>
                    </div>
                </div>


                <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 ">

                            <div className="bg-white">

                                    <table className="table table-striped table-hover  bg-white ">
                                        <thead>
                                            <tr>
                                                <th>
                                                    #
                                                </th>
                                                <th>
                                                    Cargo
                                                </th>
                                                <th>
                                                    Grado
                                                </th>
                                                <th>
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            {this.state.cargoGrados.map((cargo, index)=>{
                                                return (
                                                    <tr key={index}>
                                                        <th>
                                                            {index+1}
                                                        </th>
                                                        <td>
                                                           {cargo.Cargo}

                                                        </td>
                                                        <td>
                                                            {cargo.Nivel + " - " + cargo.GradoPuesto}
                                                        </td>
                                                        <td>
                                                            <div className="custom-control custom-checkbox">
                                                                <input 
                                                                    type="checkbox" 
                                                                    className="custom-control-input" 
                                                                    id={"customCheck1"+index}
                                                                    value={cargo.IdCargo}
                                                                    onClick={this.ToggleSeleccionarCargo}/>
                                                                <label className="custom-control-label" htmlFor={"customCheck1"+index}>Seleccionar</label>
                                                            </div>

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
        Grados : state.GradosReducer
    };
}

export default connect(
    mapStateToProps,
)(CargoGrado);