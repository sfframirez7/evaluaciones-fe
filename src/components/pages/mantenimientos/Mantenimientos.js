import React, { Component } from 'react';
import { connect } from 'react-redux';
import TituloPrincipal from '../../common/TituloPrincipal';

import {Route} from 'react-router'
import MenuMantenimientos from './MenuMantenimientos';
import PerfilColaboradores from './PerfilColaboradores';
import NuevaEvaluacion from './NuevaEvaluacion';
import Reasignaciones from '../reasignaciones/Reasignaciones';
import CargoGrado from './CargoGrado';
import MantenimientoColaboradores from './MantenimientoColaboradores';
import NuevoColaborador from '../colaboradores/NuevoColaborador';
import MantenimientoCargos from './MantenimientoCargos';
import NuevoCargo from '../cargos/NuevoCargo';
import MantenimientoEvaluaciones from './MantenimientoEvaluaciones';
import MantenimientoUsuarios from './MantenimientoUsuarios';
import NuevoUsuario from './NuevoUsuario';



class Mantenimientos extends Component {


    render() {
        return (
            <div>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Mantenimientos"></TituloPrincipal>
                        </div>
                    </div>


                    <Route exact path={`${this.props.match.path}`} component={MenuMantenimientos} />
                    <Route path={`${this.props.match.path}/evaluaciones`} component={MantenimientoEvaluaciones} />
                    <Route path={`${this.props.match.path}/nuevaEvaluacion`} component={NuevaEvaluacion} />
                    <Route path={`${this.props.match.path}/colaboradores`} component={MantenimientoColaboradores} />
                    <Route path={`${this.props.match.path}/nuevoColaborador`} component={NuevoColaborador} />
                    <Route path={`${this.props.match.path}/usuarios`} component={MantenimientoUsuarios} />
                    <Route path={`${this.props.match.path}/nuevoUsuario`} component={NuevoUsuario} />
                    <Route path={`${this.props.match.path}/cargos`} component={MantenimientoCargos} />
                    <Route path={`${this.props.match.path}/nuevoCargo`} component={NuevoCargo} />
                    <Route path={`${this.props.match.path}/perfilColaboradores`} component={PerfilColaboradores} />
                    <Route path={`${this.props.match.path}/cargoGrado`} component={CargoGrado} />
                    <Route path={`${this.props.match.path}/reasignaciones`} component={Reasignaciones} />
                    
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
)(Mantenimientos);