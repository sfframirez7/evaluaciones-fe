import React from 'react'


class Loading extends React.Component {

    constructor(props)
    {
        super(props)

        this.state = {Cargando : this.props.Cargando}

    }
  
    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({Cargando: newProps.Cargando});
    }

    render() {

        if (this.state.Cargando) {
            return (
                <div>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="text-center">
                        <p className="text-muted">Cargando...</p>
                    </div>
                </div>
            )
        } else {
            return (null )
        }

    }

}

export default Loading