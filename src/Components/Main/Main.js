import React, { Component } from 'react';
import axios from "axios";
import Header from "./../Header/Header"
import CustomerList from "./../CustomerList/CustomerList"
import Footer from "./../Footer/Footer"
import EditCust from "./../EditCust/EditCust"
import AddCust from "./../AddCust/AddCust"
import CustCard from "./../CustCard/CustCard"
import "./Main.css"

class Main extends Component {
  constructor(){
    super()
    this.state = {
      customers:[],
      addCust:false,
      editCust:false,
      custToView:null
    }
    this.findCustHandler = this.findCustHandler.bind(this)
    this.toggleAddCustomer = this.toggleAddCustomer.bind(this)
    this.createNewCustomer = this.createNewCustomer.bind(this)
    this.viewCustomerInfo = this.viewCustomerInfo.bind(this)
    this.customerObjForCard = this.customerObjForCard.bind(this)
    this.toggleEditCustomer = this.toggleEditCustomer.bind(this)
    this.editClickHandler = this.editClickHandler.bind(this)
    this.deleteClickHandler = this.deleteClickHandler.bind(this)
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/customers").then(res=>{
      console.log("response: " ,res)
      this.setState({
        customers:res.data,
        custToView:res.data[0].login.uuid
      })
    }).catch(err=>alert(err))
    
  }
  findCustHandler(str){
       axios.get("http://localhost:3001/api/customers/search/?name="+str).then(res=>{
           if(res.data.length>0){
               this.setState({
                   customers:res.data,
                   custToView:res.data[0].login.uuid
               })
           }
           else{
            this.setState({
                customers:res.data
            })
           }
       }).catch(err=>alert(err))
       if(this.state.customers.length >0){
           this.setState({custToView:this.state.customers[0].login.uuid})
       }
  }
  toggleAddCustomer(){
    this.setState(prevState=>({
        addCust:!prevState.addCust
    }))
  }
  createNewCustomer(customer){
      if(customer.name.first === ""||customer.name.last ===""){
          alert("Must enter name.")
          return
      }
      if(customer.location.city === ""){
          alert("Must enter valid city.");
          return
      }
      if(customer.email === ""){
          alert("Must enter valid email.")
          return
      }

      axios.post("http://localhost:3001/api/customers/add",customer).then(res=>{
          console.log(res)
          this.setState({
              customers:res.data,
              addCust:false
            })
      }).catch(err=>alert(err))
  }
  viewCustomerInfo(uuid){
      this.setState({custToView:uuid})
  }
  customerObjForCard(){
      let customerToView = this.state.customers.filter(customer=>{
          return customer.login.uuid === this.state.custToView;
      })
      return customerToView[0];
  }
  toggleEditCustomer(){
    this.setState({editCust:!this.state.editCust})
  }
  editClickHandler(customer){
    // alert("edit handler")
    axios.put("http://localhost:3001/api/customers/edit",customer).then(res=>{
        this.setState({
            customers:res.data,
            editCust:false
        })
    }).catch(err=>alert(err))
  }
  deleteClickHandler(uuid){
    axios.delete("http://localhost:3001/api/customers/delete/"+uuid).then(res=>{
        //console.log("dfjkdjfd",res)
        this.setState({
            customers:res.data,
            editCust:false,
            custToView:res.data[0].login.uuid
        })
    }).catch(err=>alert(err))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <Header 
            addHandler={this.toggleAddCustomer} 
            editHandler={this.toggleEditCustomer} 
            addCust={this.state.addCust}
            editCust={this.state.editCust}
        />
        {this.state.editCust ?(
                <EditCust customer={this.customerObjForCard()}
                editClickHandler={this.editClickHandler}
                deleteClickHandler={this.deleteClickHandler}
            />
        ):(
        [this.state.addCust?(
         <AddCust addClickHandler={this.createNewCustomer}/>):
         (
             <div className="main_content_container">
                <CustomerList 
                    customers={this.state.customers} 
                    findCustHandler={this.findCustHandler}
                    viewCustomerInfo={this.viewCustomerInfo}
                />
                {(this.state.custToView !==null && this.state.customers.length) &&
                <CustCard 
                    customer={this.customerObjForCard()}
                    editBtnHandler={this.toggleEditCustomer}
                    editClickHandler = {this.editClickHandler}
                /> 
                }
            </div>
         )]
         )}
        <Footer/>
      </div>
    );
  }
}

export default Main;
