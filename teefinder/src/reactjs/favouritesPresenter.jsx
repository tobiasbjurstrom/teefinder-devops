import React from 'react';
import { observer } from 'mobx-react-lite';
import FavouritesView from '../views/favouritesView';

const FavouritesPresenter = observer(function FavouritesRender(props) {
  return (
    <div>
      <FavouritesView favourites={props.model.getFavourites()} goBack={props.goBack}/>
    </div>
  );
});

export default FavouritesPresenter;
