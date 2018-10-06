import React from "react";
import "./Header.css"
import Button from "./../Button/Button"

function Header(props){

    return(
        <div>
            <header>
                <img src="https://via.placeholder.com/350x100/000/fff?text=L+o+g+o" alt="Logo"/>
                <div className="title">Customer Management Portal</div>
                <Button btnText={props.addCust || props.editCust?"Go Back":"Add New Customer"} clickHandler={props.editCust?props.editHandler:props.addHandler} btnStyle="add_cust_btn"/>
            </header>
        </div>
    )
}

export default Header;