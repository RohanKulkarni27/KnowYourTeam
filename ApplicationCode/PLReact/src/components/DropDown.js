import React,{Component} from 'react';
import Cards from './Cards'
import '../styles/app.css';

class DropDown extends Component{
    constructor(props){
        super();
        this.state={
            selectValue:'2006-2007'
        };
        this.handleChange = this.handleChange.bind(this);
    }
    /* Extracted the current value on drop down change and passed it as a prop to cards component */
    handleChange(e){
        this.setState({
            selectValue:e.target.value
        });
    }
    render(){
        /*Recieved props from the app.js component */
        let seasons = this.props.state.seasons;
        /*Appended every single value inside the drop down */
        let optionItems = seasons.map((season)=>
        <option key={season.season}>{season.season}</option>
        );
       
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Select the Season</label>
                            <select value={this.state.selectValue} onChange={this.handleChange} className="form-control">
                                {optionItems}
                            </select>
                        </div>
                      </div>
                </div>
                <Cards value={this.state} />
                <div>
        
                </div>
            </div>
           )
    }
}

export default DropDown;