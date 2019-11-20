import React, { Component } from 'react';
import { connect } from 'react-redux';


class PreguntaAbierta extends Component {


    constructor() {
        super();        

        this.state = {
            txtRespuesta : ""
        }

        this.txtRespuestahandleChange = this.txtRespuestahandleChange.bind(this)

    }


    txtRespuestahandleChange(event) {
        this.setState({txtRespuesta: event.target.value});
      }


    render() {
        return (
            <div>
                <h4>
                    ¿Qué es lo más bonito de ser programador?
                </h4>
                
                <input 
                    className="form-control form-control-lg" 
                    type="text" 
                    placeholder="Respuesta..."
                    // value={this.state.txtRespuesta}
                    onChange={ this.txtRespuestahandleChange}
                    >

                </input>

                <p>
                    {this.state.txtRespuesta}
                </p>
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
)(PreguntaAbierta);