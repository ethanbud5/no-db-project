import React,{Component} from "react";

class SearchCustomers extends Component{
    constructor(props){
        super(props)
        this.state = {
            input:""
        }
        this.inputChange = this.inputChange.bind(this)
    }
    inputChange(e){
        this.props.findCustHandler(e.target.value);
        this.setState({input:e.target.value});
    }
    render(){
        // console.log(this.state)
        return(
            <input type="text" value={this.state.input} onChange={this.inputChange}/>
        )
    }
}

export default SearchCustomers;