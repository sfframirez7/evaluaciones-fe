import React, { Component } from 'react';
import { connect } from 'react-redux';
import TituloPrincipal from '../../common/TituloPrincipal';
import ResumenGeneral from '../reportes/ResumenGeneral';



class ResumenEvaluaciones extends Component {
    render() {
        return (
            <div>

                <div className="container">
                    

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Resumen evaluaciones" BackButton={true} ></TituloPrincipal>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <ResumenGeneral></ResumenGeneral>
                        </div>
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
)(ResumenEvaluaciones);