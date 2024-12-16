
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import MapView from '../views/mapView';


const MapPresenter = observer(function MapsRender(props) {
    const [isLoaded, setIsLoaded] = useState(false);
    if(!isLoaded){
      const query = {
        lat: 59.3293,
        lng: 18.0686
      }

    props.model.loadGoogleMaps(query);
    props.model.initializeMap(query);
    setIsLoaded(true);
    }

    
    const updateMapCenter = () => {
      const query = {
          lat: 40.7128, 
          long: -74.0060, 
          zoom: 12, 
      };

      props.model.initializeMap(query);
  };

    return (
        <div><h3>Google maps: </h3>
        <MapView model={props.model} src={props.src} />
        <button onClick={updateMapCenter} style={{ marginTop: "20px" }}>
                Update Map Center
            </button>
      </div>
    );
});

export default MapPresenter;