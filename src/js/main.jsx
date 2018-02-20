import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
require('../sass/main.scss');

class Game extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{width:'1000px', height:'1000px', background:'red'}}></div>
        )
    }
};




document.addEventListener("DOMContentLoaded", function () {

    ReactDOM.render(
        <Game/>,
        document.getElementById("app")
    )
 })