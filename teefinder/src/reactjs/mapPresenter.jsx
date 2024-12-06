
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import MapView from '../views/mapView';


const MapPresenter = observer(function MapsRender(props) {

    return (
        <div><h3>Google maps: </h3>
          <MapView model = {props.model} src = {props.src} />
        </div>
    );
});

export default MapPresenter;