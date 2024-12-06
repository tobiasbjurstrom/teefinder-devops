
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import MapView from '../views/mapView';


const MapPresenter = observer(function MapsRender(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    if(!isLoaded){
    const query = {
        long: '59.3293', 
        lat: '18.0686',
        zoom: 12,                 
        maptype: 'roadmap',        
      };
      
    props.model.loadGoogleMaps(query);
    setIsLoaded(true);
    }

  if (!props.model.src?.url) {
    return <p>Loading</p>;
  }

    return (
        <div><h3>Google maps: </h3>
          <MapView model = {props.model} src = {props.src} />
        </div>
    );
});

export default MapPresenter;