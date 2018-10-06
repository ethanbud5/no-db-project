import React from "react";
import "./List.css"

function List(props){
    let listCustomers = props.customers.map((customer,i)=>(
        <div key={i} 
            className="customer_list_card"
            onClick={()=>props.viewCustomerInfo(customer.login.uuid)}
         >
            <img src={customer.picture.medium} alt="Avatar"/>
            <p>{customer.name.first} {customer.name.last}</p>
        </div>
    ))
    return(
        <div>
            {listCustomers}
        </div>
    )
}

export default List;