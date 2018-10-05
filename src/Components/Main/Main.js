import React, { Component } from 'react';
import axios from "axios";
import Header from "./../Header/Header"
import CustomerList from "./../CustomerList/CustomerList"

class Main extends Component {
  constructor(){
    super()
    this.state = {
      customers:[]
    }
    this.findCustHandler = this.findCustHandler.bind(this)
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/customers").then(res=>{
      console.log("response: " ,res)
      this.setState({
        customers:res.data
      })
    }).catch(err=>alert(err))
  }
  findCustHandler(str){
       axios.get("http://localhost:3001/api/customers/search/?name="+str).then(res=>{
           this.setState({
               customers:res.data
           })
       }).catch(err=>alert(err))
  }
  render() {
    console.log(this.state)
    return (
      <div>
        <Header/>
        <CustomerList customers={this.state.customers} findCustHandler={this.findCustHandler}/>
      </div>
    );
  }
}

export default Main;
