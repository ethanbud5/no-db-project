import React from "react";

function List(props){
    let listCustomers = props.customers.map((customer,i)=>(
        <div key={i}>
            <h1>{customer.name.first} {customer.name.last}</h1>
        </div>
    ))
    return(
        <div>
            {listCustomers}
        </div>
    )
}

export default List;