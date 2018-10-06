import React,{Component} from "react";
import CustInfo from "./../CustInfo/CustInfo"

class AddCust extends Component {
    
    render(){
        
        return(
            <div>
                <CustInfo 
                    title="Create New Customer"
                    clickHandler={this.props.addClickHandler}
                    btnText="Create"
                    addEdit={false}
                 />
            </div>
        )
    }
}

export default AddCust