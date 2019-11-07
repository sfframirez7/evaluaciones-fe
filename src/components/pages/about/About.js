import React from 'react'
import TituloPrincipal from '../../common/TituloPrincipal'

class About extends React.Component {

    render() {
        return (
            <div>
                <TituloPrincipal Titulo="About"/>
                <div className="p-2">
                    <table className="table p-2">
                        <thead className="thead-dark">
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default About