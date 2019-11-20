import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'


class Reporte1 extends Component {


    render() {
        return (
            <div>

                <nav aria-label="breadcrumb bg-white">
                    <ol className="breadcrumb bg-white">
                        <li className="breadcrumb-item">
                            <Link to={{
                                    pathname: '/reportes',
                                    }}>
                                    Reportes
                            </Link>
                        
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Reporte 1</li>
                    </ol>
                </nav>


                <h2>
                    Reporte1
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
)(Reporte1);