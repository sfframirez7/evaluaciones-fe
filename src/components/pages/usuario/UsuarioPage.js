import React, { Component } from 'react';
import { connect } from 'react-redux';
import TituloPrincipal from '../../common/TituloPrincipal';
import CambiarContrasenaComponent from './CambiarContrasenaComponent';


class UsuarioPage extends Component {
    render() {
        return (
            <div>

                <div className="container" >

                <div className="row">
                    <div className="col">
                        <TituloPrincipal Titulo="Cambiar contraseña" />
                    </div>
                </div>          
                
                <div className="row mb-n4">
                    <div className="col-12 col-md-10 offset-md-1">
                        <div className="alert alert-warning alert-dismissible fade show p-0" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <strong>¡Crear contraseña!</strong> 
                            <p>
                                Al elegir tu nueva contraseña toma en cuenta los siguientes puntos:
                            </p>
                            <ol>
                                <li>Debe contener al menos un dígito.</li>
                                <li>Al menos una letra mayúscula.</li>
                                <li>Al menos una letra minúscula.</li>
                                <li>Debe comenzar con una letra y debe tener entre 8 y 16 carácteres.</li>
                            </ol>
                            <p>
                                Ejemplo:  <strong>Batm@n_tHeB3st</strong>
                            </p>
                        </div>

                    </div>
                </div>

                <div className="row justify-content-center mb-4 pb-4 slide-bottom">
                    <CambiarContrasenaComponent></CambiarContrasenaComponent>
                </div>

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
)(UsuarioPage);