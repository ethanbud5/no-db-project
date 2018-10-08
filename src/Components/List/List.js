import React from "react";
import "./List.css"

function List(props){
    let listCustomers = props.customers.map((customer,i)=>(
        <div key={i} 
            className="customer_list_card"
            onClick={()=>props.viewCustomerInfo(customer.login.uuid)}
         >
            <img key={customer.picture.large} src={customer.picture.large} alt="Avatar"/>
            <div key={customer.phone} className="list_card_details">
                <p key={customer.email} className="list_card_name">{customer.name.first} {customer.name.last}</p>
                <p key={customer.login.uuid} className="list_card_email">{customer.email}</p>
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