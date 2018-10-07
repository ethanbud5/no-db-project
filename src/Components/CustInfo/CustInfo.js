import React,{Component} from "react";
import "./CustInfo.css"
import Button from "./../Button/Button"

//CALLED BY EditCust.js AND AddCust.js

class CustInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            customer:this.props.customer || {
               name:{
                   first:"",
                   last:"",
                   
               },
                email:"",
                phone:"",
                location:{
                    street:"",
                    city:"",
                    postcode:"",
                },
                picture:{
                    medium:"https://via.placeholder.com/72x72/?text=Avatar",
                    large:"https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
                },
                login:{
                    uuid:0
                }

            }
        }
        this.inputChange = this.inputChange.bind(this)
        this.addressChange = this.addressChange.bind(this)
        this.pictureURLChange = this.pictureURLChange.bind(this)
    }
    inputChange(e){
        let {name,value} = e.target;

        let newCustomerInfo = {...this.state.customer};
        if(name==="first" ||name==="last"){
            newCustomerInfo.name[name] = value;
        }
        else{
            newCustomerInfo[name] = value;
        }
        this.setState({customer:newCustomerInfo})
    }
    addressChange(e){
        let {name,value} = e.target;

        let newCustomerInfo = {...this.state.customer};
        newCustomerInfo.location[name] = value;
        this.setState({customer:newCustomerInfo})
    }
    pictureURLChange(e){
        let {name,value} = e.target;

        let newCustomerInfo = {...this.state.customer};
        newCustomerInfo.picture[name] = value;
        this.setState({customer:newCustomerInfo})
    }
    render(){
        //console.log(this.state)
        return(
            <div className="cust_info_container">
                <h1>{this.props.title}</h1>
                <div className="input_container">
                    <div>
                        <span>First Name: </span>
                        <input type="text" name="first" value={this.state.customer.name.first} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <span>Last Name: </span>
                        <input type="text" name="last" value={this.state.customer.name.last} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <span>Email: </span>
                        <input type="email" name="email" value={this.state.customer.email} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <span>Phone: </span>
                        <input type="phone" name="phone" value={this.state.customer.phone} onChange={this.inputChange}/>
                    </div>
                    <div>
                        <span>Street: </span>
                        <input type="text" name="street" value={this.state.customer.location.street} onChange={this.addressChange}/>  
                    </div>
                    <div>
                        <span>City: </span>
                        <input type="text" name="city" value={this.state.customer.location.city} onChange={this.addressChange}/>
                    </div>
                    <div>
                        <span>Zipcode: </span>
                        <input type="text" name="postcode" value={this.state.customer.location.postcode} onChange={this.addressChange}/>
                    </div>
                    <div>
                        <span>Image URL: </span>
                        <input type="text" name="large" value={this.state.customer.picture.large} onChange={this.pictureURLChange}/>
                    </div>
                {this.props.isEdit&&(
                    <Button 
                        btnText="Delete" 
                        btnStyle="delete_cust_btn" 
                        clickHandler={()=>this.props.deleteClickHandler(this.state.customer.login.uuid)}
                    />
                )
                }
                <Button 
                    btnText={this.props.btnText} 
                    btnStyle="create_cust_btn" 
                    clickHandler={()=>this.props.clickHandler(this.state.customer)}
                />
                </div>
            </div>
        )
    }
}

export default CustInfo;