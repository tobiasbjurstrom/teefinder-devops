
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import MapView from '../views/mapView';



const MapPresenter = observer(function MapsRender(props) {
    
    if(!props.model.isMapsLoaded){
      const query = {
        lat: null, //59.3293,
        lng: null, //18.0686,
      }

    props.model.loadGoogleMaps(query);
    props.model.initializeMap();
    props.model.isMapsLoaded = true;
    }

    function handleSearch() {
      //query.city = document.querySelector(".search-bar").value;

  }

    return (
      
        <div className= "map-presenter">
        <MapView model={props.model} src={props.src} />
        <div className="search-container">
        <input 
            id="city-search"
            type="text" 
            className="search-bar" 
            placeholder="Search location..." 
        />
        <button className="search-button" onClick={handleSearch}>
            <i className="fa fa-search"></i>
        </button>
        </div>
      </div>
    );
});

export default MapPresenter;