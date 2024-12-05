import React from 'react';
import { FavouritesView } from '../views/favouritesView';

const FavouritesPresenter = (props) => {
  return (
    <FavouritesView model={props.model}  
    goBack={props.goBack}  
    clickOnFavourites={props.clickOnFavourites}
     showFavourites={props.showFavourites}/>
    
  );
}
export default FavouritesPresenter;