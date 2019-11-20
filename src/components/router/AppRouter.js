import React from 'react'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './AppRouter.css';

import { JwtPayload } from "../../config/config";

import BtnLogOut from '../login/BtnLogOut'

import Colaboradores from '../pages/colaboradores/Colaboradores'
import Evaluacion from '../pages/evaluaciones/Evaluacion'
import Reasignaciones from '../pages/reasignaciones/Reasignaciones'
import Evaluaciones from '../pages/evaluaciones/Evaluaciones';
import Mantenimientos from '../pages/mantenimientos/Mantenimientos';
import Reportes from '../pages/reportes/Reportes';

import {LoadOpcionesDeMenuService} from '../../services/MenuService'
class AppRouter extends React.Component {

    constructor(props)
    {
        super(props)

        var user = JwtPayload().usuario      

        this.state = {
            EmpleadoNombre: user.Nombre,
            PerfilId: user.PerfilCod,
            opcioneDeMenu : []
        }
    }

   componentDidMount()
   {
    var opcioneDeMenu = LoadOpcionesDeMenuService()
    if(opcioneDeMenu === null)
        this.setState({opcioneDeMenu: []})
    else
        this.setState({opcioneDeMenu})
   }

    render() {
        return (
            <Router>

                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-banpais">
                        <span className="navbar-brand font-weight-bold" >Evaluaciones</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">

                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold" to="/">
                                    <i className="fa fa-file-text iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Evaluaciones
                                        </span> 
                                    </Link>
                                </li>

                                {this.state.opcioneDeMenu.map((opcion, index)=> {
                                    return (
                                        <li key={index} className={"nav-item active " }>
                                            <Link className="nav-link font-weight-bold" to={opcion.Ruta}>
                                            <i 
                                                className={"fa  iconoMenu pt-1 " +(opcion.Icono)} 
                                                aria-hidden="true"></i>
                                                <span className="menuItem">
                                                    {opcion.Menu}
                                                </span> 
                                            </Link>
                                        </li>
                                    )
                                })}
{/*                                 
                                <li className={"nav-item active " }>
                                    <Link className="nav-link font-weight-bold" to="/reasignaciones">
                                    <i className="fa fa-pencil-square iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Reasignaciones
                                        </span> 
                                    </Link>
                                </li>
                               
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold" to="/settings">
                                    <i className="fa fa-cog iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Settings
                                        </span> 
                                    </Link>
                                </li>
                               
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold" to="/reportes">
                                    <i className="fa fa-line-chart iconoMenu pt-1" aria-hidden="true"></i>
                                        <span className="menuItem">
                                            Reportes
                                        </span> 
                                    </Link>
                                </li> */}
                                
                            </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <span className="p-2">
                                {this.state.EmpleadoNombre}
                            </span>
                            <BtnLogOut />
                        </form>
                        </div>
                    </nav>
                </div>


                <Route path="/" exact component={Evaluaciones} />
                <Route path="/equipo/:data?" exact component={Colaboradores} />
                <Route path="/evaluacion/:data?/:data2?" component={Evaluacion} />
                {/* <Route path="/settings" component={Mantenimientos} />
                <Route path="/reportes" component={Reportes} /> */}
                {/* <Route path="/reasignaciones" component={Reasignaciones} /> */}
                {/* <PrivateRoute authed={true} route="/reasignaciones" path='/reasignaciones' component={Reasignaciones} /> */}
                <PrivateRoute authed={true} route="/reasignaciones" path='/reasignaciones' component={Reasignaciones} />
                <PrivateRoute authed={true} route="/reportes" path='/reportes' component={Reportes} />
                <PrivateRoute authed={true} route="/settings" path='/settings' component={Mantenimientos} />
            </Router>
        )
    }
   

}

function PrivateRoute ({component: Component, authed, route, ...rest}) {

    var opcionesDeMenu = LoadOpcionesDeMenuService()
    var found = opcionesDeMenu.filter((opcion)=> {
        if(opcion.Ruta === route)
            return true
        else
            return ""
    })
    var letIn = false

    if(found && found.length > 0)
        letIn = true

    return (
      <Route
        {...rest}
        render={(props) => letIn === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
    )
  }






export default AppRouter