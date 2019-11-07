import React from 'react';


class Menu extends React.Component {
    render() {

        greeting()
        return (
            <div> 
                <h2> Menu {this.props.Name} </h2> 
            </div>
        )
    } 
}

function greeting() {
    console.log("object");
}


export default Menu