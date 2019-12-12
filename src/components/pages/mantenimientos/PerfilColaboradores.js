import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


class PerfilColaboradores extends Component {
    render() {
        return (
            <div>
               
               <nav aria-label="breadcrumb bg-white d-print-none">
                <ol className="breadcrumb bg-white">
                    <li className="breadcrumb-item">
                        <Link to={{ pathname: '/settings', }}>
                            Mantenimientos
                        </Link>
                    
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Perfil colaboradores</li>
                </ol>
            </nav>


            <h2>
                Perfil colaboradores
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
)(PerfilColaboradores);