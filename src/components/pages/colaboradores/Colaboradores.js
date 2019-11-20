import React, { Component } from 'react';
import { connect } from 'react-redux';

import {ObtenerEquipoPorEvaluacion} from '../../../services/ColaboradoresService'

import TituloPrincipal from '../../common/TituloPrincipal'
import NoData from '../../common/NoData'
import TablaColaboradores from './TablaColaboradores'
import EvaluacionSelected from '../evaluaciones/EvaluacionSelected'
import { Link } from "react-router-dom";


class Colaboradores extends Component {



    
    constructor(props) {
        super(props);
        
        if(this.props.evaluacionSelected.evluacionId===0)
        {
            this.props.history.push("/")
        }
        
        this.state = {
            colaboradores: [],
            cargando : false
        }

        this.ObtenerEquipo = this.ObtenerEquipo.bind(this)

    }

    componentDidMount()
    {
        this.props.dispatch({type:'LOAD_COLABORADORES', data: []}) 
        this.ObtenerEquipo()
    }


    ObtenerEquipo()
     {
    //     var user = JwtPayload().usuario      
    //     var  usuario = user.IdColaborador

        this.setState({cargando : true})
        
        // axios.get('/GetEquipoEvaluacion/'+usuario+"/"+this.props.evaluacionSelected.evluacionId )
        ObtenerEquipoPorEvaluacion(this.props.evaluacionSelected.evluacionId )
        .then(res => {
            this.props.dispatch({type:'LOAD_COLABORADORES', data: res.data}) 
            this.setState({colaboradores :res.data , cargando : false})

        }).catch((error) => {
            console.log(error)
            this.setState(state => ({ cargando: false }));
        })
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Colaboradores" BackButton={true}/>
                        </div>
                    </div>

                 
                    
                    <div className="row mb-4">
                        <div className="col col-md-10 offset-md-1 ">
                            <EvaluacionSelected/>
                        </div>
                    </div>

                   

                    <div className="row">
                        <div className="col-12 col-md-10 offset-md-1 ">
                            <TablaColaboradores ShowChild={false} VerEvaluacion={true}>
                                <Link to={{
                                    pathname: '/evaluacion',
                                    }}>
                                    <button className=" btn btn-outline-primary m-1" data-toggle="tooltip" data-placement="top" title="Ingresar resultados" >
                                        Evaluación
                                    </button>
                                </Link> 
                            </TablaColaboradores>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col text-center">
                            <NoData NoData={this.state.colaboradores.length === 0 && !this.state.cargando}/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        evaluacionSelected : state.EvaluacionSelectedReducer
    };
}

export default connect(
    mapStateToProps,
)(Colaboradores);