import React from 'react'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './AppRouter.css';

import { JwtPayload } from "../../config/config";

import Home from '../pages/home/Home'
import About from '../pages/about/About'
import Users from '../pages/users/Users'
import BtnLogOut from '../login/BtnLogOut'

class AppRouter extends React.Component {

    constructor(props)
    {
        super(props)

        var user = JwtPayload().usuario      

        this.state = {
            EmpleadoNombre: user.EmpleadoNombre
        }
    }

   

    render() {
        return (
            <Router>

                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-banpais">
                        <span className="navbar-brand font-weight-bold" >Plantilla</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold" to="/">Home</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold" to="/users/">Users</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link font-weight-bold" to="/about/">About</Link>
                                </li>
                            </ul>
                        </div>
                        <form class="form-inline my-2 my-lg-0">
                            <span className="p-2">
                                {this.state.EmpleadoNombre}
                            </span>
                            <BtnLogOut />
                        </form>
                    </nav>
                </div>

                <Route path="/" exact component={Home} />
                <Route path="/about/" component={About} />
                <Route path="/users/" component={Users} />
            </Router>
        )
    }
   

}






export default AppRouter