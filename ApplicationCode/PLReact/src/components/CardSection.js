import React,{Component} from 'react';
import SpecificTeam from './SpecificTeam'
class CardSection extends Component{
    constructor(props){
        super(props);
       this.state={
           specificTeam:''
       }
    }
    /* Onclicking it sends the selected team as a prop to SpecificTeam Component */
    handleClick(data,event){
       
       
        this.setState({
            specificTeam:data,
            SpecificSeason:this.props.teams.SpecificSeason
        })
     
        
    }
    render(){
        const i=0;
        let teams = this.props.teams.Teams;
        const logo='logo'
        let AllTeams = teams.map((team,i)=>
          
            <div className="TeamCardDiv"  key={team.home_team} onClick={this.handleClick.bind(this,team.home_team)}>
               <div className="card"> 
               <div className="imageDiv"><img src={require(`../Images/${team.home_team}.png`)} className="cardImage card-img-top" /></div>
               <div className="card-body TeamCard">
                    {team.home_team} 
               </div>
               </div> 
            </div>
        );
        return(
            <div className="row">
            <div className="col-md-6 teamDiv">
                {AllTeams}
            </div>
           <div className="col-md-6">
                <SpecificTeam steam={this.state} />
            </div>
            </div>
        )
    }

}

export default CardSection;