import React from "react";
import "./MapView.css"

function MapView(props){

    return(
        <div className="map_div">
            <img src={`https://static-maps.yandex.ru/1.x/?lang=en_US&ll=${props.cord.latitude},${props.cord.longitude}&size=600,300&z=10&l=map`} alt="Location Map"/>
        </div>
    )
}

export default MapView