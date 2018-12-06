import React, { Component } from "react";
import NavBar from './navbar'
import axios from 'axios';
import DropDown from './DropDown'
import '../styles/app.css';


class App extends Component {
    constructor(){
        super();
        this.state={
            seasons:[]
        };
        
    }

    /* For loading the drop down with the values on page load and state of this component is send to DropDown component */
    componentDidMount(){
        let firstseason =[];
        fetch('https://infinite-reef-93456.herokuapp.com/')
        .then(response => {
            return response.json();
        }).then(data => {
            firstseason = data.map((season) => {
            return season
        });
       
        this.setState({
            seasons: firstseason,
        });
    });

    
      
    }
    render() {
        return (
            
            <div>
               <NavBar />
               
              <DropDown state={this.state}/>
            </div>
        );
    }
}

export default App;