import React, { Component } from 'react';
import { connect } from 'react-redux';
import {JwtPayload} from '../../config/config'

function mapStateToProps(state) {
    return {

    };
}

class UsuarioLogueado extends Component {


    constructor(props) {
        super(props);

        var user = JwtPayload().usuario

        this.state = {
            NombreUsuario : user.Nombre,
            CodigoUsuario : user.IdColaborador
        }
        
    }

    render() {
        return (
            <div>
                 <div className={"card " }>
                    <div className="card-body">
                        <p className="card-text font-weight-bold">{this.state.CodigoUsuario} - {this.state.NombreUsuario}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(UsuarioLogueado);