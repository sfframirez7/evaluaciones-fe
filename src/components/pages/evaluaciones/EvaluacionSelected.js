import React, { Component } from 'react';
import { connect } from 'react-redux';



class EvaluacionSelected extends Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">{this.props.evaluacionSelected.evaluacion}</h4>
                        <p className="card-text">{this.props.evaluacionSelected.evaluacionDetalle}</p>
                    </div>
                </div>
 
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        evaluacionSelected : state.EvaluacionSelectedReducer
    };
}
export default connect(
    mapStateToProps,
)(EvaluacionSelected);