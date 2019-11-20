import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'

class TablaColaboradores extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
            SelectUser : this.props.SelectUser,
            VerEvaluacion : this.props.VerEvaluacion,
            ShowChild : this.props.ShowChild
        }
        
        
        this.MostraEvaluacion = this.MostraEvaluacion.bind(this)
        this.SelectUser = this.SelectUser.bind(this)
        this.VerEvaluacion = this.VerEvaluacion.bind(this)
    }

    MostraEvaluacion()
    {
        this.props.history.push("/evaluacion")
    }

    SelectUser(colaboradorId, Nombre)
    {

        var colaborador = {
            nombreColaborador: Nombre,
            colaboradorId: colaboradorId
        }
        this.props.dispatch({type:'SELECT_COLABORADOR', data: colaborador}) 
    }
   
    VerEvaluacion(colaboradorId, Nombre)
    {

        var colaborador = {
            nombreColaborador: Nombre,
            colaboradorId: colaboradorId
        }

        console.log(colaborador)

        this.props.dispatch({type:'SELECT_COLABORADOR', data: colaborador}) 
        this.props.history.push("/evaluacion/"+btoa(colaboradorId)+"/"+btoa(this.props.evaluacionSelected.evluacionId))
    }


    render() {
        return (
            <div className="bg-white">

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
                       
                        {this.props.colaboradores.map((colaborador, index)=>{
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
                                        {this.state.ShowChild ? (
                                            this.props.children
                                        ): null}


                                        {this.state.SelectUser ?
                                            (
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
                                        ) :
                                        (
                                            null
                                        ) }
                                       
                                        {(this.state.VerEvaluacion && colaborador.Accion!=="R")?
                                            (
                                                <button 
                                                className=" btn btn-outline-primary m-1" 
                                                data-toggle="tooltip" 
                                                data-placement="top" title="Ingresar resultados" 
                                                onClick={()=> this.VerEvaluacion(colaborador.IdColaborador, colaborador.Nombre)}>
                                                Evaluación
                                            </button>
                                               
                                        ) :
                                        (
                                            null
                                        ) }
                                       
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                
            </div>
        );
    }
}


function mapStateToProps(state) {

    return {
        colaboradores : state.ColaboradoresReducer ,
        evaluacionSelected : state.EvaluacionSelectedReducer,
        colaboradorSelected : state.ColaboradorSelectedReducer,
    };
}


export default connect(
    mapStateToProps,
)(withRouter(TablaColaboradores));