import React, { Component } from 'react';
import { connect } from 'react-redux';

import Swal from "sweetalert2";

import {ObtenerSubAreas, ObtenerColaboradoresPorArea} from '../../../services/SubAreasService'
import {NuevaReasignacionService, RemoverFromListService} from '../../../services/ReasignacionService'

import TablaColaboradores from '../colaboradores/TablaColaboradores'


class NuevaAsignacion extends Component {

    
    constructor(props) {
        super(props);
     
        this.state  = {
            cargando : false,
            IdSubAreaOrigen : 0,
            IdSubAreaDestino : 0,
            subAreas : []
        }

        this.AreaChangedHandler = this.AreaChangedHandler.bind(this)
        this.AreaDestinoChangedHandler = this.AreaDestinoChangedHandler.bind(this)
        this.AgregarReasiginacion = this.AgregarReasiginacion.bind(this)
        this.ValidarNuevaReasignacion= this.ValidarNuevaReasignacion.bind(this)
        
    }


    componentDidMount()
    {
        ObtenerSubAreas()
    }


    AreaChangedHandler(event)
    {
        var IdSubAreaOrigen = event.target.value
        this.setState({IdSubAreaOrigen})
        ObtenerColaboradoresPorArea(IdSubAreaOrigen)
    }
   
    AreaDestinoChangedHandler(event)
    {
        var IdSubAreaDestino = event.target.value
        this.setState({IdSubAreaDestino})
    }


    AgregarReasiginacion()
    {
        var areaOrigen = parseInt( this.state.IdSubAreaOrigen)
        var areaDestino = parseInt( this.state.IdSubAreaDestino)
        var colaboradorId = this.props.colaboradorSelected.colaboradorId.toString()


        if(!this.ValidarNuevaReasignacion())
            return

        var asignacion = {
            IdColaborador : colaboradorId,
            IdSubAreaResta: areaOrigen,
            IdSubAreaSuma: areaDestino,
            IdUsuarioModifico: 0,
            Activo : true
            
        }


        NuevaReasignacionService(asignacion)
        this.setState({IdSubAreaOrigen : 0,IdSubAreaDestino : 0,})
    }

    ValidarNuevaReasignacion()
    {
        if(parseInt( this.state.IdSubAreaOrigen) === 0)
        {
            Swal.fire({
                title: 'Debes seleccionar un área de origen',
                icon: 'warning',
                text: "Atención"
            });
            return false
        }

        if(this.props.colaboradorSelected.colaboradorId === 0)
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
                title: 'Debes seleccionar un área de destino',
                icon: 'warning',
                text: "Atención"
            });
            return false
        }
       

        return true


    }



    render() {
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                                <strong>¡Pasos a seguir!</strong> You should check in on some of those fields below.
                            </div>

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="form-group">
                                <h4 className="card-title font-weight-bold">Área origen:</h4>
                                <select 
                                    value={this.state.IdSubAreaOrigen} 
                                    className="custom-select col-12 col-md-4 form-control" 
                                    id="cmbSubAreas" 
                                    onChange={ this.AreaChangedHandler }>
                                        <option value="0" >Seleccionar Área</option>
                                        { this.props.subAreas.map((subArea, index) => <option key={index} value={subArea.IdSubArea}>{subArea.SubArea}</option>) }
                                </select>
                            </div>
                        </div>
                    </div>  


                    <div className={"row " + (this.props.colaboradorSelected.colaboradorId > 0 ? "d-none" : "")}>
                        <div className="col-12 col-md-10 offset-md-1 ">
                            <div style={{maxHeight: '400px',overflow: 'auto'}}>
                                <TablaColaboradores SelectUser={true}> 
                                </TablaColaboradores>
                            </div>
                        </div>
                    </div>


                    <div className={"row " + (this.props.colaboradorSelected.colaboradorId > 0 ? "" : "d-none")}>
                        <div className="col">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-secondary d-flex">
                                    <div className="flex-fill">

                                        <span className="font-weight-bold">
                                            {this.props.colaboradorSelected.colaboradorId} -
                                        </span>
                                        {this.props.colaboradorSelected.nombreColaborador} 
                                    </div>
                                    <div>
                                        <button 
                                            className="btn btn-danger "
                                            onClick={()=> RemoverFromListService()}>
                                            Remover
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="form-group">
                                <h4 className="card-title font-weight-bold">Área destino:</h4>
                                <select 
                                    value={this.state.IdSubAreaDestino} 
                                    className="custom-select col-12 col-md-4 form-control" 
                                    id="cmbSubAreasDestino" 
                                    onChange={ this.AreaDestinoChangedHandler }>
                                        <option value="0" >Seleccionar Área</option>
                                        { this.props.subAreas.map((subArea, index) => <option key={index} value={subArea.IdSubArea}>{subArea.SubArea}</option>) }
                                </select>
                            </div>
                        </div>
                    </div>  

                    <div className="row">
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
    };
}


export default connect(
    mapStateToProps,
)(NuevaAsignacion);