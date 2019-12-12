import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../common/Loading';

import {CambiarcontrasenaService} from '../../../services/UsuarioService'

import Swal from "sweetalert2";
import {  CerrarSesionService } from '../../../services/LoginService';
import { PasswordValidate } from '../../../services/RegExpToPassword';

class CambiarContrasena extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cargando : false,
            txtCurrentPassword : "",
            txtNewPassword : "",
            txtConfirmPassword : "",

        }

        this.TxtFieldChangeHandler = this.TxtFieldChangeHandler.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.ValidateData = this.ValidateData.bind(this)
        this.onEnterPress = this.onEnterPress.bind(this)
        
    }

    TxtFieldChangeHandler(event)
    {
        const name = event.target.name;
        this.setState({[name] : event.target.value})
    }

    onEnterPress = (e) => {
        if(e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault();
          this.changePassword()
        }
      }
     

    changePassword()
    {
        this.setState({cargando : true})
        
        if(!this.ValidateData())
        {
            this.setState({cargando : false})
            return
        }

        var data = {
            ColaboradorId     : 0,
            ClaveActual       : this.state.txtCurrentPassword,
            ClaveNueva        : this.state.txtNewPassword,
            ClaveConfirmacion : this.state.txtConfirmPassword,
            Usuario           : ""
        }

        CambiarcontrasenaService(data)
        .then((res) => {
            Swal.fire({
                title: 'Información guardada exitosamente',
                icon: 'success',
                text: "Éxito",
            });
            this.setState({cargando : false})
            CerrarSesionService()
            
        }).catch((err) => {
            this.setState({cargando : false})
            Swal.fire({
                title: 'No se ha podido crea la nueva evaluación.'+err.response ? err.response.data : "",
                icon: 'error',
                text: "Error",
            });
        });
        
    }



    ValidateData()
    {
        var currentPassword = this.state.txtCurrentPassword
        var newPassword = this.state.txtNewPassword
        var confirmPassword = this.state.txtConfirmPassword


        if(!currentPassword)
        {
            Swal.fire({
                title: 'Debes ingresar tu contraseña actual',
                icon: 'warning',
                text: "Atención",
            });
            return false

        }
       
        if(currentPassword === newPassword)
        {
            Swal.fire({
                title: 'La nueva contraseña no puede ser igual a la actual',
                icon: 'warning',
                text: "Atención",
            });
            return false

        }

        // if(!newPassword.match(regExpression))
        if(!PasswordValidate(newPassword))
        {
            Swal.fire({
                title: 'La nueva contraseña ingresada no cumple con los estándares',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }

        PasswordValidate(newPassword)
       
        if(newPassword !== confirmPassword)
        {
            Swal.fire({
                title: 'La nueva contraseña no coincide',
                icon: 'warning',
                text: "Atención",
            });
            return false
        }

        return true
       

    }

    render() {
        return (
            
            <div className="col-10 col-md-6 col-lg-4 card-box bg-white" id="cardLogin" >
            
                            
                    <h3 className="text-justify font-weight-bold my-2 text-center">
                        Cambiar contraseña
                    </h3>
                    
                    <label className="sr-only" htmlFor="txtCurrentPassword">Usuario</label>
                    <div className="input-group mb-2 mr-sm-2 pt-3 mt-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                        </div>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="txtCurrentPassword" 
                            id="txtCurrentPassword" 
                            value = { this.state.txtCurrentPassword } 
                            placeholder="Contraseña actual" 
                            onChange={this.TxtFieldChangeHandler} 
                            // onKeyDown={this.next}
                            //ref={(input) => { this.txtUsuario = input; }}
                            />
                    </div>
            
                    <label className="sr-only" htmlFor="txtNewPassword">Password</label>
                    <div className="input-group mb-2 mr-sm-2 pt-3 mt-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                        </div>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="txtNewPassword" 
                            id="txtNewPassword" 
                            value = { this.state.txtNewPassword } 
                            placeholder="Nueva contraseña"  
                            onChange={this.TxtFieldChangeHandler} 
                            // onKeyDown={this.onEnterPress}
                            //ref={(input) => { this.txtPassword = input; }}
                            />
                    </div>
                    
                    <label className="sr-only" htmlFor="txtConfirmPassword">Password</label>
                    <div className="input-group mb-2 mr-sm-2 pt-3 mt-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </div>
                        </div>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="txtConfirmPassword" 
                            id="txtConfirmPassword" 
                            value = { this.state.txtConfirmPassword } 
                            placeholder="Confirmar contraseña"  
                            onChange={this.TxtFieldChangeHandler} 
                            onKeyDown={this.onEnterPress}
                            //ref={(input) => { this.txtPassword = input; }}
                            />
                    </div>
            
                    <div className="row"> 
                        <div className="col text-center">
                                <Loading Cargando={this.state.cargando} />
                        </div>
                    </div>

                    <div className="row p-1">
                        <div className="col">
                            <div className="alert alert-primary" role="alert">
                                Al cambiar tu contraseña será necesario iniciar sesión nuevamente
                            </div>
                        </div>
                    </div>
            
                    <div className="form-group mt-3">
                        <div className="row ">
                            <div className="col col-sm-12 col-md-8 offset-md-2  justify-content-center d-flex pt-2 mt-2" >
                                <button 
                                    type="submit" 
                                    className="btn btn-primary" 
                                    disabled={this.state.cargando}
                                    onClick={this.changePassword}>
                                        Cambiar contraseña 
                                </button>
                            </div>
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
)(CambiarContrasena);