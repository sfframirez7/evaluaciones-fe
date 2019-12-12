import React from 'react'
import { CerrarSesionService } from '../../services/LoginService';

class BtnLogOut extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            Text : this.props.Text
        }

        this.LogOut = this.LogOut.bind(this);
    }

    LogOut() {
        CerrarSesionService()

        // localStorage.removeItem("usr_token")
        // localStorage.removeItem("opciones_menu")
        // localStorage.clear()
        // window.location.href = "/";

    }


    render() {
        return ( 
            <button 
                type ="button" 
                className="btn btn-danger" 
                onClick={this.LogOut}> 
                <span className="m-1">
                    {this.state.Text}
                </span>
                <i className = "fa fa-sign-out aria - hidden = true " > </i>
            </button>
        )
    }
}

export default BtnLogOut