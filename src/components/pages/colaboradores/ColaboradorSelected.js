import React, { Component } from 'react';
import { connect } from 'react-redux';



class ColaboradorSelected extends Component {
    render() {
        return (
            <div>
                <div className={"card " +( this.props.colaboradorSelected.colaboradorId === 0 ? "d-none" : "" )}>
                    <div className="card-body">
                        <p className="card-text font-weight-bold">{this.props.colaboradorSelected.colaboradorId} -{this.props.colaboradorSelected.nombreColaborador}</p>
                    </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
 

    return {
        colaboradorSelected : state.ColaboradorSelectedReducer
    };
}
export default connect(
    mapStateToProps,
)(ColaboradorSelected);