import React, { Component } from 'react';
import { connect } from 'react-redux';



class PreguntaSeleccionMultiple extends Component {

    constructor() {
        super();
        
        this.state = {
            generosPeliculas : ['Ciencia ficción', 'Fantasía', 'Acción', 'Comedia', 'Horror', 'Romance'],
            generosSelected : []
        }
        
        this.RespuestaMultipleHandleChange = this.RespuestaMultipleHandleChange.bind(this)
    }


    RespuestaMultipleHandleChange(event) {
        const target = event.target
        const cheked = target.checked
        const name = target.name;
        
        if(cheked)
        {
            var generosSelected = this.state.generosSelected
            generosSelected.push(name)
            this.setState({  generosSelected  });
        }
        else
        {
            var generosSelected = this.state.generosSelected

            var filtered = generosSelected.filter(function(value, index, arr){
                return value !== name;
            });

            this.setState({  generosSelected : filtered });

        }
    
        
      }


    render() {
        return (
            <div>
                <h4>
                    Selecciona tus géneros favoritos de películas
                </h4>


                {this.state.generosPeliculas.map((genero, index)=>
                {
                    return (
                        <div key={index}>
                            
                            <div className="custom-control custom-checkbox m-2">
                                <input 
                                    type="checkbox" 
                                    className="custom-control-input" 
                                    name={genero} 
                                    id={"customCheck"+index}
                                    onChange={this.RespuestaMultipleHandleChange}/>
                                <label className="custom-control-label" htmlFor={"customCheck"+index}>{genero}</label>
                            </div>
                        </div>
                    )
                })}
              
                {this.state.generosSelected.map((genero, index)=>
                {
                    return (
                        <div key={index}>
                            {genero}
                        </div>
                    )
                })}


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
)(PreguntaSeleccionMultiple);