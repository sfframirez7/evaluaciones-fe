import React, { Component } from 'react';
import { connect } from 'react-redux';

import {NuevaEvaluacionPorMetaService} from '../../../services/EvaluacionesService'
import {ObtenerEquipoPorEvaluacion} from '../../../services/ColaboradoresService'

import Swal from "sweetalert2";
import Loading from '../../common/Loading';
import { RegistrarEventoDelSistema } from '../../../services/Utilidades';

class NuevEvaluacionArea extends Component {


    constructor(props) {
        super(props);

        this.state = {
            cargando : true,
            EvaluacionPadre : this.props.EvaluacionPadre,
            metricas : [],
            colaboradores : [],
            colaboradersSelected : [],
            Titulo : "",
            Descripcion : "",
            chkTodaElArea : false,
            txtMetricaDescripcion : "",
            txtValorMetrica : 0,
            totalPorcentajeMetrica : 0
        }

        this.chkTodaElAreaHanlder = this.chkTodaElAreaHanlder.bind(this)
        this.TxtDescripcionMetricaChange = this.TxtDescripcionMetricaChange.bind(this)
        this.TxtValorMetricaChange = this.TxtValorMetricaChange.bind(this)
        this.TxtTituloHandler = this.TxtTituloHandler.bind(this)
        this.TxtDescripcionHandler = this.TxtDescripcionHandler.bind(this)
        this.ValidatarNuevaMetrica = this.ValidatarNuevaMetrica.bind(this)
        this.ValidateDataNuevaEvaluacion = this.ValidateDataNuevaEvaluacion.bind(this)
        this.CalcularTotalMetrica = this.CalcularTotalMetrica.bind(this)
        this.AddSection = this.AddSection.bind(this)
        this.RemoveSection = this.RemoveSection.bind(this)
        this.ClearData = this.ClearData.bind(this)
        this.CrearNuevaEvaluacion = this.CrearNuevaEvaluacion.bind(this)
        this.ObtenerEquipo = this.ObtenerEquipo.bind(this)
        this.RemoverFromListService = this.RemoverFromListService.bind(this)
    }


    componentDidMount()
    {
        this.ObtenerEquipo()
    }


    chkTodaElAreaHanlder(event)
    {
        var checked = event.target.checked
        this.setState({chkTodaElArea : checked})
    }

    TxtDescripcionMetricaChange(event)
    {
        var txtMetricaDescripcion = event.target.value
        this.setState({txtMetricaDescripcion})
    }

    TxtValorMetricaChange(event)
    {
        var txtValorMetrica = event.target.value
        this.setState({txtValorMetrica})
    }
    
    TxtTituloHandler(event)
    {
        var txtTitulo = event.target.value
        this.setState({Titulo : txtTitulo})
    }
    
    TxtDescripcionHandler(event)
    {
        var txtDescripcion = event.target.value
        this.setState({Descripcion: txtDescripcion})
    }

    AddSection()
    {
        if(!this.ValidatarNuevaMetrica())
            return

        this.CalcularTotalMetrica()


        var txtDescripcionMetrica = this.state.txtMetricaDescripcion
        var txtValorMetrica = parseInt( this.state.txtValorMetrica)


        var nuevaMetrica = {
            "Pregunta":txtDescripcionMetrica,
            "Meta": txtValorMetrica,
            "IdTipoRespuesta" :2
        }

        var metricas = this.state.metricas
        metricas.push(nuevaMetrica)
        this.setState({metricas: metricas,txtMetricaDescripcion : "", txtValorMetrica: 0 })

        this.CalcularTotalMetrica()
    }


    ObtenerEquipo()
    {
        this.setState({ cargando : true})

        ObtenerEquipoPorEvaluacion(this.state.EvaluacionPadre)
        .then(res => {
            this.setState({colaboradores :res.data , cargando : false})

        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
        })
    }

    SelectUser(colaboradorId, Nombre)
    {

        var colaborador = {
            nombreColaborador: Nombre,
            IdColaborador: colaboradorId
        }

        var colaboradersSelected = this.state.colaboradersSelected.filter((colaborador, index)=>{
            if(colaborador.IdColaborador !== colaboradorId)
                return true
                else {
                    return false
                }
        });


        colaboradersSelected.push(colaborador)

        this.setState({colaboradersSelected}) 
    }

    RemoverFromListService(colaboradorId)
    {
        var colaboradersSelected = this.state.colaboradersSelected.filter((colaborador, index)=>{
            if(colaborador.IdColaborador !== colaboradorId)
                return true
            else
                return false
        });

        this.setState({colaboradersSelected}) 
    }

    ValidateDataNuevaEvaluacion()
    {
        if(this.state.Titulo === "")
        {
            Swal.fire({
                title: 'Debes ingresar el título de la evaluación',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }

        if(this.state.Descripcion === "")
        {
            Swal.fire({
                title: 'Debes ingresar la descripción de la evaluación',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }
        if(this.state.metricas.length === 0)
        {
            Swal.fire({
                title: 'Debes agregar métricas',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }

        if(parseInt(this.state.totalPorcentajeMetrica) !== 100 )
        {
            Swal.fire({
                title: 'El valor total de las métricas debe ser 100%',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }
       
        if(!this.state.chkTodaElArea && this.state.colaboradersSelected.length === 0 )
        {
            Swal.fire({
                title: 'Debes seleccionar al menos un colaborador',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }

        return true

    }

    ValidatarNuevaMetrica()
    {
        if(this.state.txtMetricaDescripcion === "")
        {
            Swal.fire({
                title: 'Debes ingresar la descripción de la métrica',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }
       
        if(this.state.txtValorMetrica <= 0 || this.state.txtValorMetrica > 100)
        {
            Swal.fire({
                title: 'El valor de métrica no es válido',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }

        var valorActual = this.CalcularTotalMetrica() || 0
        var nuevoValor = parseInt( valorActual) + parseInt( this.state.txtValorMetrica)

        if(nuevoValor > 100)
        {
            Swal.fire({
                title: 'Al parecer tus métricas superan el 100%. Debes asegurarte que la suma de tus métricas sea 100%',
                icon: 'warning',
                text: "Atención",
            });

            return false
        }


        return true
    }

    CalcularTotalMetrica()
    {
        var metricas = this.state.metricas

        var totalPorcentajeMetrica = 0

        metricas.map((metrica, index)=>{
            return totalPorcentajeMetrica += parseInt( metrica.Meta)
        })

        this.setState({totalPorcentajeMetrica})

        return totalPorcentajeMetrica


    }

    RemoveSection(index)
    {
        var metricas = this.state.metricas
        delete metricas[index]
        this.setState({metricas})
        this.CalcularTotalMetrica()
    }

    ClearData()
    {
        this.setState({
            metricas : [],
            Titulo : "",
            Descripcion : "",
            chkTodaElArea : true,
            txtMetricaDescripcion : "",
            txtValorMetrica : 0,
            totalPorcentajeMetrica : 0
        })
    }


    CrearNuevaEvaluacion()
    {
        if(!this.ValidateDataNuevaEvaluacion())
            return

        this.setState({cargando : true})

        var metricas = this.state.metricas.filter(function(metrica, index, arr){
            return parseInt( metrica.Meta) > 0;
        });

        var nuevaEvaluacion =
        {
            "IdEvaluacionAnual": parseInt( this.state.EvaluacionPadre),
            "Titulo": this.state.Titulo,
            "Descripcion": this.state.Descripcion,
            "CreadaPor": 0,
            "ModificadaPor": 0,
            "IdCargoPadre": 0,
            "IdPadre": parseInt( this.state.EvaluacionPadre),
            "TodoElEquipo": this.state.chkTodaElArea,
            "Preguntas": metricas,
            "Colaboradores" : this.state.colaboradersSelected
            }


        NuevaEvaluacionPorMetaService(nuevaEvaluacion)
        .then(res => {
            this.ClearData()
            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });
            this.setState({cargando : false})
            RegistrarEventoDelSistema("Creó evaluación por meta. Colaboradores :"+JSON.stringify( this.state.colaboradersSelected) + "Preguntas-> Total:" +metricas.length + ", preguntas:" + JSON.stringify(metricas))
            window.history.back();

        }).catch((error) => {
            this.setState({cargando : false})
            Swal.fire({
                title: 'No se ha podido crea la nueva evaluación.'+error.response ? error.response.data : "",
                icon: 'error',
                text: "Error",
            });
        })

    }

    render() {
        return (
            <div>
                 
                    
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="form-group">
                            <h3>Título:</h3>
                            <input 
                                className="form-control" 
                                type="text" 
                                placeholder="Título..."
                                maxLength="150"
                                value={this.state.Titulo}
                                onChange={this.TxtTituloHandler}/>
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
                                maxLength="250"
                                rows={3} 
                                placeholder="Descripción..." 
                                value={this.state.Descripcion}
                                onChange={this.TxtDescripcionHandler}>

                            </textarea>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">

                        <div className="alert alert-info alert-dismissible fade show" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong>Instrucciones:</strong> Selecciona los colaboradores a aplicar esta evaluación ó selecciona <i>toda el área</i>
                        </div>

                    </div>
                </div>

                <div className="row m-3">
                    <div className="col-12 col-md-6 offset-md-3 text-center">
                        <div className="custom-control custom-checkbox">
                            <input 
                                type="checkbox" 
                                className="custom-control-input" 
                                id="customCheck1"
                                checked={this.state.chkTodaElArea}
                                onChange={this.chkTodaElAreaHanlder}
                                value={this.state.chkTodaElArea}  />
                            <label className="custom-control-label" htmlFor="customCheck1">Toda el área</label>
                        </div>
                    </div>
                </div>

                
                <div className={"row "+ (this.state.colaboradersSelected.length> 0 ? "" : "d-none")}>
                        <div className="col">
                            <h4>Colaboradores seleccionados: </h4>
                            <ul className="list-group p-2">
                                {this.state.colaboradersSelected.map((colaborador, index)=> {
                                    return (
                                        <li key={index} className="list-group-item list-group-item-secondary d-flex">
                                            <div className="flex-fill">
        
                                                <span className="font-weight-bold">
                                                    {colaborador.IdColaborador} -
                                                </span>
                                                {colaborador.nombreColaborador} 
                                            </div>
                                            <div>
                                                <button 
                                                    className="btn btn-danger "
                                                    onClick={()=> this.RemoverFromListService(colaborador.IdColaborador)}>
                                                    Remover
                                                </button>
                                            </div>
                                        </li>
                                    )
                                })}
                             
                            </ul>
                        </div>
                    </div>

                    <div className={"row mb-4 " + (this.state.chkTodaElArea ? "d-none" : "")} style={{maxHeight: '400px', overflow: 'auto'}}>
                        <div className="col">
                            <h4>Colaboradores: </h4>
                            <table className="table table-striped table-hover  bg-white ">
                                <thead>
                                    <tr>
                                        <th>
                                            Código
                                        </th>
                                        <th>
                                            Nombre
                                        </th>
                                        <th>
                                            Acciones
                                        </th>
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
                                                    {colaborador.Accion==="S" ? (<span className="badge badge-warning m-1">Reasignado</span>) : null }
                                                    {colaborador.Accion==="R" ? (<span className="badge badge-secondary m-1">Removido</span>) : null }
                                                    {colaborador.Completo ? (<i className="fa fa-check-circle text-success m-1 p-1" aria-hidden="true"></i>) : null }                                       
                                                        

                                                </td>
                                                <td>
                                                    <button 
                                                        className=" btn btn-outline-primary m-1" 
                                                        data-toggle="tooltip" 
                                                        data-placement="top" title="Seleccionar"
                                                        onClick={ () => this.SelectUser(colaborador.IdColaborador, colaborador.Nombre)} >
                                                            <i className="fa fa-check-square-o" aria-hidden="true"></i>
                                                            <span className="m-1">
                                                                Seleccionar
                                                            </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>



                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">

                        <div className="alert alert-info alert-dismissible fade show" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong>Instrucciones:</strong> Crea las métricas con su respectivo porcentaje de evaluación con las cuales mediras a tu equipo, la sumatoria de dichas métrias debe ser 100%
                        </div>

                    </div>
                </div>



                <div className="row">
                    <div className="col-12 col-md-10 offset-md-1">
                            
                        <div className="card">
                            <div className="d-flex card-header">
                                <div className="flex-fill ">
                                    <h3 className="">Métricas:</h3>
                                </div>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {this.state.metricas.map((metrica, index)=> {
                                        return (
                                            <div  key={index} >
                                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                                    <p>
                                                        {metrica.Pregunta}
                                                    </p>
                                                    <div>

                                                        <span className="badge badge-primary badge-pill p-2">
                                                            {metrica.Meta} %
                                                        </span>
                                                        <button 
                                                            type="button" 
                                                            className={"btn btn-danger m-1 "  } 
                                                            onClick={() => this.RemoveSection(index)}>
                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                        </button>
                                                        </div>
                                                </li>
                                            </div>
                                        )
                                    })}

                                </ul>

                                <form className="form-inline mt-2 ">


                                    <label className="sr-only" htmlFor="txtMetricaDescripcion">Métrica</label>
                                    <input 
                                        type="text" 
                                        className="form-control mb-2 mr-2 ml-4" 
                                        id="txtMetricaDescripcion" 
                                        placeholder="Descripción métrica"
                                        value={this.state.txtMetricaDescripcion}
                                        onChange={this.TxtDescripcionMetricaChange} />


                                    <label className="sr-only" htmlFor="txtValorMetrica">Valor</label>
                                    <div className="input-group mb-2 mr-sm-2 text-center">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            id="txtValorMetrica" 
                                            min="1" 
                                            max="5"
                                            placeholder="100"
                                            value={this.state.txtValorMetrica}
                                            onChange={this.TxtValorMetricaChange} />
                            
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">%</div>
                                        </div>
                                    </div>


                                            
                                    <button 
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={ this.AddSection}>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            <span className="m-1">
                                                Agregar
                                            </span>
                                    </button>
                                </form>

                            </div>
                                <div className="card-footer text-right">
                                    Porcentaje total:   {this.state.totalPorcentajeMetrica} %
                            </div>
                        </div>

                        </div> 

                </div>
        



                    <div className="row">
                        <div className="col text-center">
                            <Loading Cargando={this.state.cargando} ></Loading>
                        </div>
                    </div>

                    <div className="row m-4">
                        <div className="col text-center">
                            <button 
                                type="button" 
                                disabled={this.state.cargando}
                                className="btn btn-success"
                                onClick={this.CrearNuevaEvaluacion}>
                                    <i className="fa fa-floppy-o" aria-hidden="true"></i>
                                    <span className="m-1">
                                        Guardar
                                    </span>
                            </button>
                        </div>
                    </div>

            </div>

        // </div>

 
        );
     }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(
    mapStateToProps,
)(NuevEvaluacionArea);