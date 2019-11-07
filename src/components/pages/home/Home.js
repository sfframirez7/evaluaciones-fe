import React from 'react'
import TituloPrincipal from '../../common/TituloPrincipal'

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {txtInput : ""}
        this.handleTextChange = this.handleTextChange.bind(this)
    }

    handleTextChange(event) {
        this.setState({txtInput: event.target.value});
      }

    render() {
        return (
            <div>
                
                
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <TituloPrincipal Titulo="Home"/>
                        </div>
                    </div>

                    <div className="row p-3">
                        <div className="col-12 col-md-10 col-lg-6 offset-md-1 offset-lg-3">
                            <input className="form-control form-control-lg" type="text" placeholder="Type something" value={this.state.txtInput} onChange={this.handleTextChange}/>
                            <h2> {this.state.txtInput} </h2>
                        </div>
                    </div>

                    
                    
                    <div className="row p-3">
                        <div className="col-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
                            <p className="p-2"> 
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, soluta autem qui sit blanditiis veritatis laudantium rerum repellendus quaerat doloribus! Maiores, officiis inventore! Alias nobis placeat, iusto perspiciatis commodi vitae?
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        <div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    }

}

export default Home