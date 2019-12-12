import React, { Component } from 'react';
import { connect } from 'react-redux';

import Swal from "sweetalert2";

import {NuevaReasignacionService, RemoverFromListService, ObtenerReasignaciones} from '../../../services/ReasignacionService'
import {ObtenerCargosService} from '../../../services/CargoService'
import { ColaboradoresConCargoService} from '../../../services/ColaboradoresService'
import { IsNumber } from '../../../services/IsNumber';
import Loading from '../../common/Loading';


class NuevaAsignacion extends Component {

    
    constructor(props) {
        super(props);
     
        this.state  = {
            cargando : false,
            IdSubAreaOrigen : 0,
            IdSubAreaDestino : 0,
            colaboradores : [],
            colaboradorId : 0,
            colaboradorNombre : "",
            colaboradorAsignarANombre : "",
            subAreas : [],
            cargos : []
        }

        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        this.AreaDestinoChangedHandler = this.AreaDestinoChangedHandler.bind(this)
        this.AgregarReasiginacion = this.AgregarReasiginacion.bind(this)
        this.ValidarNuevaReasignacion= this.ValidarNuevaReasignacion.bind(this)
        this.ObtenerCargos= this.ObtenerCargos.bind(this)
        this.ObtenerColaboradoresConCargo = this.ObtenerColaboradoresConCargo.bind(this)
        this.SeleccionarColaborador = this.SeleccionarColaborador.bind(this)
        this.SeleccionarAsignarA = this.SeleccionarAsignarA.bind(this)
        this.RemoverColaborador = this.RemoverColaborador.bind(this)
        this.FiltarColaboradores = this.FiltarColaboradores.bind(this)
        
    }


    componentDidMount()
    {
        this.ObtenerColaboradoresConCargo();
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


    AreaChangedHandler(event)
    {
        var IdSubAreaOrigen = event.target.value
        this.setState({IdSubAreaOrigen})
        RemoverFromListService()
    }

    SeleccionarColaborador(colaboradorId,nombre,IdSubAreaOrigen )
    {
        this.setState({IdSubAreaOrigen : IdSubAreaOrigen,colaboradorId, colaboradorNombre: nombre})
    }
   
    SeleccionarAsignarA(nombre,IdSubAreaDestino )
    {
        this.setState({IdSubAreaDestino , colaboradorAsignarANombre: nombre})

    }

    ObtenerColaboradoresConCargo()
    {
        this.setState({ cargando : true})
        ColaboradoresConCargoService()
        .then((res) => {
            this.setState({colaboradores : res.data, colaboradoresLoaded : res.data ,cargando : false})
        }).catch((err) => {
            this.setState({ cargando : false})
            Swal.fire({
                title: 'Algo ha salido mal',
                icon: 'error',
                text: "Error"
            });
        });
    }
   
    AreaDestinoChangedHandler(event)
    {
        var IdSubAreaDestino = event.target.value
        this.setState({IdSubAreaDestino})
    }


    AgregarReasiginacion()
    {
        this.setState({cargando: true})

        var areaOrigen = parseInt( this.state.IdSubAreaOrigen)
        var areaDestino = parseInt( this.state.IdSubAreaDestino)
        var colaboradorId = this.state.colaboradorId.toString()


        if(!this.ValidarNuevaReasignacion())   
            {
                this.setState({cargando: false})
                return
            }

        var asignacion = {
            IdColaborador : colaboradorId,
            IdCargoResta: areaOrigen,
            IdCargoSuma: areaDestino,
            IdUsuarioModifico: 0,
            Activo : true
            
        }


        NuevaReasignacionService(asignacion)
        .then(res => {
            this.setState({IdSubAreaOrigen : 0,IdSubAreaDestino : 0, cargando: false})

            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });

            ObtenerReasignaciones()
            this.RemoverColaborador()

        }).catch((error) => {
            this.setState({cargando: false})
            Swal.fire({
                title: 'No se ha podido realizar la reasignación. Falta intenta de nuevo más tarde',
                icon: 'error',
                text: "Error",
            });
        })
        
    }

    ValidarNuevaReasignacion()
    {
        if(parseInt( this.state.IdSubAreaOrigen) === 0)
        {
            Swal.fire({
                title: 'Debes seleccionar un colaborador',
                icon: 'warning',
                text: "Atención"
            });
            return false
        }

        if(this.state.colaboradorId === 0)
        {
            Swal.fire({
                title: 'Debes seleccionar un colaborador',
                icon: 'warning',
                text: "Atención"
            });
            return false
        }

        if(parseInt( this.state.IdSubAreaDestino) === 0)
        {
            Swal.fire({
                title: 'Debes seleccionar a quien le asignará el colaborador',
                icon: 'warning',
                text: "Atención"
            });
            return false
        }
       
        if(parseInt( this.state.IdSubAreaDestino) === parseInt( this.state.IdSubAreaOrigen))
        {
            Swal.fire({
                title: 'Debes seleccionar áreas diferentes',
                icon: 'warning',
                text: "Atención"
            });
            return false
        }
        return true
    }

    RemoverColaborador(){
        this.setState({IdSubAreaOrigen : 0,colaboradorId:0, colaboradorNombre: ""})
    }

    FiltarColaboradores(event)
    {
        
        this.setState({cargando: true})

        var txtBuscar = event.target.value

        var data = this.state.colaboradoresLoaded.filter((colaborador) => {
            if(IsNumber(txtBuscar))
            {
                if (colaborador.IdColaborador.toString().indexOf(txtBuscar) > -1 )
                    return true
                else
                    return ""   
            }
            else 
            {
                if (colaborador.Nombre.toString().toLowerCase().indexOf(txtBuscar.toLowerCase()) > -1 )
                    return true
                else
                    return ""
                }
            })

        this.setState({colaboradores :data, cargando:false })
    }


    render() {
        return (
            <div>
                <div className="container">

                <div className={"row p-2 " + (this.state.colaboradorId > 0 ? "" : "d-none")}>
                        <div className="col">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-secondary d-flex">
                                    <div className="flex-fill">

                                        <span className="font-weight-bold">
                                            {this.state.colaboradorId} -
                                        </span>
                                        {this.state.colaboradorNombre} 
                                        <p>
                                            Asignar a:
                                            {this.state.colaboradorAsignarANombre} 

                                        </p>
                                    </div>
                                    <div>
                                        <button 
                                            className="btn btn-danger "
                                            onClick={()=> this.RemoverColaborador()}>
                                            Remover
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-12 col-md-4 offset-md-4 text-center">
                            <h4 className="card-title font-weight-bold">Buscar:</h4>                
                            <input 
                                className="form-control form-control-md " 
                                type="text" 
                                onChange={this.FiltarColaboradores}
                                placeholder="Nombre ó código" />  
                        </div>
                    </div>

                    <div className="row">
                        <div className="col" >
                            <h4 className="card-title font-weight-bold">Colaborador:</h4>
                            <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
                                <table className="table" >
                                    <thead>
                                        <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.colaboradores.map((colaborador, index)=>{
                                        return (
                                            <tr key={index}>
                                                <th>
                                                    {colaborador.IdColaborador}
                                                </th>
                                                <td>
                                                    {colaborador.Nombre}
                                                </td>
                                                <td>
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={()=> this.SeleccionarColaborador(colaborador.IdColaborador, colaborador.Nombre,colaborador.CargoId)} >
                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                </button>
                                                
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col" >

                            <h4 className="card-title font-weight-bold">Asignar a:</h4>
                            <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
                                <table className="table" >
                                    <thead>
                                        <tr>
                                        <th>Código</th>
                                        <th>Nombre</th>
                                        <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.colaboradores.map((colaborador, index)=>{
                                    return (
                                            <tr key={index}>
                                                <th>
                                                    {colaborador.IdColaborador}
                                                </th>
                                                <td>
                                                    {colaborador.Nombre}
                                                </td>
                                                <td>
                                                <button 
                                                    className="btn btn-primary"
                                                    onClick={()=> this.SeleccionarAsignarA(colaborador.Nombre,colaborador.CargoId)} >
                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                </button>
                                                
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                       
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} />
                        </div>
                    </div>


                    <div className="row mt-2">
                        <div className="col text-center">
                            <button 
                                type="button" 
                                className="btn btn-success"
                                onClick={() => this.AgregarReasiginacion()}>
                                    Guardar
                            </button>  
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    
    return {
        subAreas : state.SubAreasReducer,
        colaboradorSelected : state.ColaboradorSelectedReducer,
        colaboradores : state.ColaboradoresReducer ,
    };

}


export default connect(
    mapStateToProps,
)(NuevaAsignacion);