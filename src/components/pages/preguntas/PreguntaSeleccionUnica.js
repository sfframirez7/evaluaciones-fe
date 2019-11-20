import React, { Component } from 'react';
import { connect } from 'react-redux';



class PreguntaSeleccionUnica extends Component {

    
    constructor() {
        super();
    
        this.state = {
            cargarndo : false,
            generos : ['Hombre', 'Mujer', 'Otro'],
            chosen : ''
        }

        this.RespuestaUnicaHandlerChange = this.RespuestaUnicaHandlerChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    RespuestaUnicaHandlerChange(event)
    {
        const value = event.target.value
        this.setState({chosen : value})
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }


    render() {
        return (
            <div>
                
                <h4>
                    Género
                </h4>

                    {this.state.generos.map((genero, index)=> {
                        return (
                            <div key={index}>
                                
                                    <div className="custom-control custom-radio m-2">
                                        <input 
                                            type="radio" 
                                            id={"customRadio" +index } 
                                            name="customRadio" 
                                            className="custom-control-input"
                                            value={genero}
                                            required
                                            onClick={this.RespuestaUnicaHandlerChange}/>
                                        <label className="custom-control-label" htmlFor={"customRadio" +index }>{genero}</label>
                                    </div>
                            </div>
                            )
                        })}
 

                <div>
                    {this.state.chosen}
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
)(PreguntaSeleccionUnica);