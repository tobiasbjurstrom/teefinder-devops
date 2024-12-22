import React from 'react';

export function FavouritesView(props){
  return (
    <div>
      <h1>Favourite Courses</h1>
      <ul>
        {props.favourites.map((course, index) => (
          <li key={index}>
            {course.club_name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FavouritesView;
