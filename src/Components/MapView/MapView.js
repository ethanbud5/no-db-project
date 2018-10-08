import React from "react";
import "./MapView.css"

function MapView(props){

    return(
        <div className="map_div">
            <img src={`https://static-maps.yandex.ru/1.x/?lang=en_US&pt=${props.cord.latitude},${props.cord.longitude},org&size=650,300&z=10&l=map`} alt="No Data for Map"/>
        </div>
    )
}

export default MapView