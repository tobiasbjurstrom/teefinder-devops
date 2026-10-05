import React from 'react';
import { observer } from 'mobx-react-lite';
import FavouritesView from '../views/favouritesView';
import { toJS } from 'mobx';

const FavouritesPresenter = observer(function FavouritesRender(props) {

function clickOnCourseACB(event) {
  props.model.setSelectedCourse(event);
  props.onCourseClick(event);
}
function removeFavouriteACB(courseName) {
  console.log('Attempting to remove favourite:', courseName);
  console.log('Current favourites:', toJS(props.model.favourites.slice()));

  const course = props.model.favourites.find(fav => fav.club_name === courseName);
  if (course) {
    console.log('Course found in favourites:', course);
    props.model.removeFavourite(course);
    console.log('Current favourites after removal:', props.model.favourites.slice());
  } else {
    console.log('Course not found in favourites:', courseName);
  }
}
  return (
      <FavouritesView
      model={props.model}
      favourites={props.model.getFavourites()}
      clickOnCourse={clickOnCourseACB}
      removeFavourite={removeFavouriteACB}
      />
  );
});

export default FavouritesPresenter;
