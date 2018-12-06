import React,{Component} from 'react';
import {Pie} from 'react-chartjs-2';
import PieGraph2 from './PieGraph2'
class SpecificTeam extends Component{
    constructor(props){
        super(props);
       global.result1;
       global.result2;
       global.result3;
        this.state={
            Team:this.props.steam.specificTeam,
            SpecificSeason:this.props.steam.SpecificSeason,
            HomeGoals:[],
            homeGoal:'',
            awayGoal:'',
           
            intialRender:false
        
        }
    }
/* The clicked team is recieved as a prop over here and it displays the the statistical data related to the team */


    componentDidUpdate(prevProps) {
        
        if (prevProps.steam.specificTeam !== this.props.steam.specificTeam) {
            var seasonYear = this.props.steam.SpecificSeason;
            var SeasonTeam = this.props.steam.specificTeam;
            var awayTeam = this.props.steam.specificTeam;
            console.log("TeamClicked:"+SeasonTeam);
            console.log('https://infinite-reef-93456.herokuapp.com/'+seasonYear+'/'+SeasonTeam)
        let initialHomeGoals =[];
        let intitalResults =[];
     

        fetch('https://infinite-reef-93456.herokuapp.com/'+seasonYear+'/'+SeasonTeam+'/'+awayTeam)
    .then(response => {
        return response.json();
    }).then(data => {
        intitalResults = data.map((result) => {
        return result
    });
   global.result1 = intitalResults[0].Draw;
   global.result2 = intitalResults[0].Win
   global.result3 = intitalResults[0].Lost
    console.log(global.result1);
    this.setState({
        Results: intitalResults,
        result1:intitalResults[0].Draw,
         result2:intitalResults[0].Win,
         result3:intitalResults[0].Lost
    });
   
    });
        
        fetch('https://infinite-reef-93456.herokuapp.com/'+seasonYear+'/'+SeasonTeam)
        .then(response => {
            return response.json();
        }).then(data => {
            initialHomeGoals = data.map((homegoal) => {
            return homegoal
        });
       
        this.setState({
            HomeGoals: initialHomeGoals,
            homeGoal:initialHomeGoals[0].HomeGoals,
            awayGoal:initialHomeGoals[0].AwayGoals,
           
            intialRender:true
             });
        });

        

        
      
      }
    }
  
    pageLoad(){
        switch(this.state.intialRender){
            case false:
            
            return(
                <div className="SelectteamText">Please select a team</div>
            );
            case true:{
                return(
                    <div>
                <div className="TeamCardDiv">
                    <div className="card chartDiv">
                        {this.plotChart()}
                     </div>
                </div>
                <div className="TeamCardDiv ">
                <div className="card chartDiv">
                {this.plotChart2()}
                </div>
                </div>
                </div>
                )
            }
        }
        
    }
  plotChart(){
      const homegoal = this.state.homeGoal
      const awaygoal = this.state.awayGoal
      this.state={
        chartData:{
            labels:['Home Goals','Away Goals'],
            datasets:[
                {
                    label:'Goal scored',
                    data:[homegoal,awaygoal],
                    backgroundColor:['rgba(255,99,132,0.6)','rgba(54,162,235,0.6)']
                }
            ]
        }
      }
    
      return(
        <Pie
                data={this.state.chartData}
                
                options={{
                   title:{
                       display:true,
                       text: 'Number of home and away goals scored by '+this.props.steam.specificTeam+' during '+this.props.steam.SpecificSeason,
                       fontSize:25
                   },
                   legend:{
                       display:true,
                       position:'right'
                   }
                }}
            />
      )
  }

  plotChart2(){

    
      const draw = global.result1;
   
      const win = global.result2;
      const lost = global.result3;
      this.state={
        chartData1:{
            labels:['Draws','Wins', 'Lost'],
            datasets:[
                {
                    label:'Goal scored',
                    data:[draw,win,lost],
                    backgroundColor:['rgba(255,206,86,0.6)','rgba(75,192,192,0.6)','rgba(255,99,132,0.6)']
                }
            ]
        }
       
      }
    
      return(
        <Pie
                data={this.state.chartData1}
                
                options={{
                   title:{
                       display:true,
                       text: this.props.steam.specificTeam+' overall performance during '+this.props.steam.SpecificSeason,
                       fontSize:25
                   },
                   legend:{
                       display:true,
                       position:'right'
                   }
                }}
            />
      )

  }
  
    render(){
        let message = this.props.steam.specificTeam;
        let Season = this.props.steam.SpecificSeason;
      
            return(
            <div>
                {this.pageLoad()}
                
            </div>
        )
    }
}

export default SpecificTeam;