import React,{Component} from 'react';
import {Pie} from 'react-chartjs-2';
class PieGraph2 extends Component{
    constructor(props){
        super(props);
        this.state={
           
            HomeGoals:[],
            homeGoal:'',
            awayGoal:'',
        }
    }
    render(){
        let message = this.props.pieteam.HomeGoals;
        let Season = this.props.pieteam.SpecificSeason;
      
            return(
            <div>
                hi
                {message}
                
            </div>
        )
    }
}

export default PieGraph2;