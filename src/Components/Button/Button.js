import React from "react";
import "./Button.css"

function Button(props){

    return(
        <button className={props.btnStyle} onClick={props.clickHandler}>{props.btnText}</button>
    )
}

export default Button;