import React from "react";
import "./Header.css"

function Navbar(props){

    return(
        <div>
            <header>
                <img src="https://via.placeholder.com/350x100" alt="Logo"/>
                <div className="title">Customer Management Portal</div>
            </header>
        </div>
    )
}

export default Navbar;