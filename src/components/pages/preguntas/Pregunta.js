import React, { Component } from 'react';
import { connect } from 'react-redux';

import PreguntaAbierta from './PreguntaAbierta'
import PreguntaSeleccionMultiple from './PreguntaSeleccionMultiple';
import PreguntaSeleccionUnica from './PreguntaSeleccionUnica';


class Pregunta extends Component {

    
    constructor(props) {
        super(props);

        this.state = {
            pregunta : this.props.Pregunta,
            chosen : ''
        }

        
    }

    

    render() {

        
        
        if(this.state.pregunta.tipoPregunta === 1)
        {
            return (
                <div className="m-4 p-2">
                    {/* <PreguntaSeleccionUnica></PreguntaSeleccionUnica> */}

                    <h4>
                        {this.state.pregunta.tituloPregunta}
                    </h4>

                    {this.state.pregunta.opcionesRespuesta.map((opcion, index)=> {
                        return (
                            <div key={index}>
                                
                                    <div className="custom-control custom-radio m-2">
                                        <div className="custom-control custom-radio">
                                            <input 
                                                type="radio" 
                                                id={"customRadio1"+this.state.pregunta.idPregunta +index} 
                                                name="customRadio" 
                                                value={opcion.valor}
                                                className="custom-control-input"
                                                onClick={this.RespuestaUnicaHandlerChange}/>
                                            <label className="custom-control-label" htmlFor={"customRadio1" +this.state.pregunta.idPregunta +index}>
                                                {opcion.descripcion}
                                            </label>
                                        </div>
                             
                                    </div>


                            </div>
                            )
                        })}
                        <span>
                            {this.state.chosen}
                        </span>
                </div>
            )
        }
        
        if(this.state.pregunta.tipoPregunta === 2)
        {
            return (
                <div className="m-4 p-2">
                    <PreguntaSeleccionMultiple></PreguntaSeleccionMultiple>                
                </div>
            )
        }
       
        if(this.state.pregunta.tipoPregunta === 3)
        {
            return (
                <div className="m-4 p-2">
                    <PreguntaAbierta/>              
                </div>
            )
        }


        return (
            <div>
                <h2>
                    Error
                </h2>

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
)(Pregunta);