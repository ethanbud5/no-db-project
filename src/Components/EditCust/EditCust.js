import React,{Component} from "react";
import CustInfo from "./../CustInfo/CustInfo"

class EditCust extends Component {
    
    render(){
        
        return(
            <div>
                <CustInfo 
                    title="Edit Customer"
                    clickHandler={this.props.editClickHandler}
                    btnText="Change"
                    isEdit={true}
                    customer={this.props.customer}
                    deleteClickHandler={this.props.deleteClickHandler}
                 />
            </div>
        )
    }
}

export default EditCust