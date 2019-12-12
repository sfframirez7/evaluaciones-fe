import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router'

import TituloPrincipal from '../../common/TituloPrincipal';
import MenuReportes from './MenuReportes';
import PendientesDeEvaluacion from './PendientesDeEvaluacion';
import RptResumenGeneral from './RptResumenGeneral';
import ReporteHistoricoDeNotas from './ReporteHistoricoDeNotas';
import ReporteCompetenciasConductuales from './ReporteCompetenciasConductuales';
import ReporteGeneral from './ReporteGeneral';

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
                    <Route path={`${this.props.match.path}/reporteGeneral`} component={ReporteGeneral} />
                    <Route path={`${this.props.match.path}/compentenciasConductuales`} component={ReporteCompetenciasConductuales} />
                    <Route path={`${this.props.match.path}/pendientesDeEvaluacion`} component={PendientesDeEvaluacion} />
                    <Route path={`${this.props.match.path}/resumenGeneral`} component={RptResumenGeneral} />
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