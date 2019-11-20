import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router'

import TituloPrincipal from '../../common/TituloPrincipal';
import Reporte1 from './Reporte1';
import MenuReportes from './MenuReportes';
import PendientesDeEvaluacion from './PendientesDeEvaluacion';
import ReporteGeneral from './ReporteGeneral';
import ReporteHistoricoDeNotas from './ReporteHistoricoDeNotas';

class Reportes extends Component {


    render() {
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Reportes"></TituloPrincipal>
                        </div>
                    </div>


                    <Route exact path={`${this.props.match.path}`} component={MenuReportes} />
                    <Route path={`${this.props.match.path}/one`} component={Reporte1} />
                    <Route path={`${this.props.match.path}/pendientesDeEvaluacion`} component={PendientesDeEvaluacion} />
                    <Route path={`${this.props.match.path}/reporteGeneral`} component={ReporteGeneral} />
                    <Route path={`${this.props.match.path}/reporteHistoricoNotas`} component={ReporteHistoricoDeNotas} />

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
)(Reportes);