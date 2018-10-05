import React from "react";
import SearchCustomers from "./../SearchCustomers/SearchCustomers";
import List from "./../List/List"
import "./CustomerList.css"

function CustomerList(props){

    return(
        <div className="list_container">
            <SearchCustomers findCustHandler={props.findCustHandler}/>
            <List customers={props.customers}/>
        </div>
    )
}

export default CustomerList;