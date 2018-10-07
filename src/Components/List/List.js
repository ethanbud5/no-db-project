import React from "react";
import "./List.css"

function List(props){
    let listCustomers = props.customers.map((customer,i)=>(
        <div key={i} 
            className="customer_list_card"
            onClick={()=>props.viewCustomerInfo(customer.login.uuid)}
         >
            <img src={customer.picture.large} alt="Avatar"/>
            <div className="list_card_details">
                <p className="list_card_name">{customer.name.first} {customer.name.last}</p>
                <p className="list_card_email">{customer.email}</p>
            </div>
        </div>
    ))
    return(
        <div>
            {listCustomers}
        </div>
    )
}

export default List;