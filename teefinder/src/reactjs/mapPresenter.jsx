
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import MapView from '../views/mapView';


const MapPresenter = observer(({ model }) => {
    console.log("Map presenter")

    return (
        <div><h3>Google maps: </h3>
          {MapView(model)}
        </div>
    );
});

export default MapPresenter;