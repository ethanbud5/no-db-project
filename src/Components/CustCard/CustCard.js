import React from "react";
import "./CustCard.css"
import Button from "./../Button/Button"

function CustCard(props){
    // console.log(props.customer[0])
    return(
        <div className="cust_container">
            <div className="cust_info_box">
                <img src={props.customer.picture.large} alt="Avatar"/>
                <div className="cust_name"><strong>Name:</strong> {props.customer.name.first} {props.customer.name.last}</div>
                <div className="cust_email"><strong>Email:</strong> {props.customer.email}</div>
                <div className="cust_phone"><strong>Phone:</strong> {props.customer.phone}</div>
                <div className="address_box">
                    <div className="address_title"><strong>Address:</strong> </div>
                    <div>Street: {props.customer.location.street}</div>
                    <div>City: {props.customer.location.city}</div>
                    <div>Zipcode: {props.customer.location.postcode}</div>
                </div>
                <Button 
                    btnText="Edit Customer" 
                    clickHandler={props.editBtnHandler}
                    btnStyle="edit_btn"
                />
            </div>
        </div>
    )
}

export default CustCard;