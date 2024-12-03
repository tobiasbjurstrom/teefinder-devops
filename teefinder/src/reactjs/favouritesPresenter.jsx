import React from 'react';
import { observer } from 'mobx-react-lite';
import FavouritesView from '../views/favouritesView';

const FavouritesPresenter = observer(({ model, onBackClickk }) => {
  return (
    <div>
      <button onClick={onBackClickk}>Back to Courses</button>
        <FavouritesView />
    </div>
  );
});

export default FavouritesPresenter;