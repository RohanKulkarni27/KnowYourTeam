import React,{Component} from 'react';
import CardSection from './CardSection'
class Cards extends Component{
    constructor(props){
        super(props);
        this.state={
            Teams:[],
            SpecificSeason:this.props.value.selectValue
        }
        
    }
    /*Fetch the team played during first season. This is basically used on page load. It will be shown as a default value */
    componentDidMount() {
        var season=this.props.value.selectValue;
        let intialTeams =[];
        fetch('https://infinite-reef-93456.herokuapp.com/'+season)
        .then(response => {
            return response.json();
        }).then(data => {
            intialTeams = data.map((team) => {
            return team
        });
       //console.log(intialTeams);
        this.setState({
            Teams: intialTeams,
            SpecificSeason:this.props.value.selectValue
        });
    });
      }

    /*This will update the list of the teams when the drop down value has been changed */  
    componentDidUpdate(prevProps) {
        
        if (prevProps.value.selectValue !== this.props.value.selectValue) {
            
            var season=this.props.value.selectValue;
        let intialTeams =[];
        fetch('https://infinite-reef-93456.herokuapp.com/'+season)
        .then(response => {
            return response.json();
        }).then(data => {
            intialTeams = data.map((team) => {
            return team
        });
       //console.log(intialTeams);
        this.setState({
            Teams: intialTeams,
            SpecificSeason:this.props.value.selectValue
        });
    });
        }
      }
  
    render(){
        
        return(
            <div className="container">
                <CardSection teams={this.state}/>
            </div>
        )

    }
        

  
}
export default Cards;