import React, { Component } from 'react';
import {withRouter  } from 'react-router-dom'
  
import {PanelMenu} from 'primereact/panelmenu';
import {SlideMenu} from 'primereact/slidemenu';

import './SideMenu.css'

class SideMenu extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            items : []
        }

        this.closeNav       = this.closeNav.bind(this)
        this.navigateToPage = this.navigateToPage.bind(this)
        this.FormatMenuItems = this.FormatMenuItems.bind(this)

    }

    componentDidMount()
    {
        this.FormatMenuItems()
    }

    closeNav() 
    {
       document.getElementById("mySidenav").style.width = "0";
    }
     
    navigateToPage = (path) => {
        this.props.history.push(path);
        this.closeNav()
    }
    
    FormatMenuItems()
    {
        var data = [{
                "Id": 1,
                "label": "	Evaluaciones",
                "Ruta": "",
                "icon": "",
                "PadreId": 0,
                "Orden": 0,
            }, {
                "Id": 2,
                "label": "	Mis Evaluaciones",
                "Ruta": "/",
                "icon": "fa fa-list",
                "PadreId": 1,
                "Orden": 0,
            }, {
                "Id": 3,
                "label": "Evaluaciones Equipo",
                "Ruta": "/evaluacionesEquipo",
                "icon": "fa fa-file-text",
                "PadreId": 1,
                "Orden": 0,
            }, {
                "Id": 4,
                "label": "Reportes",
                "Ruta": "/reportes",
                "icon": "fa fa-file-text",
                "PadreId": 1,
                "Orden": 0,
                "command": "/",
            }, {
                "Id": 5,
                "label": "Settings",
                "Ruta": "/settings",
                "icon": "fa fa-cog",
                "PadreId": 1,
                "Orden": 0,
                "command": "/",
            }

        ]
        
        const root = [];

        data.forEach(node => {
            if (node.PadreId === 0) return root.push(node);

            const parentIndex = data.findIndex(el => el.Id === node.PadreId);
            if (node.Ruta) {
                node.command = () => {
                    this.navigateToPage(node.Ruta)
                }
            }
            if (!data[parentIndex].items) {
                return data[parentIndex].items = [node];
            }

            data[parentIndex].items.push(node);
        });

        this.setState({ items : root})
    }
    

    render() {

        return (
            <div>
                <div id="mySidenav" className="sidenav">
                    <div className="row">
                        <div className="col-6">
                            <h3 className="font-weight-bold text-center text-white m-1" >Portal BP</h3>
                        </div>
                        <div className="col-6 text-right ">
                            <button type="button" className="btn btn-link iconoMenu " data-toggle="modal" data-target="#exampleModal3">
                                <i className="fa fa-user-circle-o fa-lg "  aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <button className="btn closebtn text-white" onClick={this.closeNav}>
                        &times;
                    </button>

                    <hr className="bg-white"/>
                    
                    <PanelMenu model={this.state.items} style={{width:'300px', paddingLeft:'3px'}} className=" iconoMenu font-weight-bold"/>
                    {/* <SlideMenu model={this.state.items} style={{width:'300px', paddingLeft:'3px'}} className=" iconoMenu font-weight-bold"/> */}

                </div>
                
            </div>
        );
    }
}


 

export default withRouter(SideMenu)

// export default connect(
//     mapStateToProps,
// )(SideMenu);