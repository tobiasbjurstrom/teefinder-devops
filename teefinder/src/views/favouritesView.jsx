import React from 'react';

export function FavouritesView(props) {
  
  return (
    <div>
      <h1>Favourites</h1>
      <ul>
        {props.model.getFavourites().map((courseName, index) => (
          <li key={index}>
              {courseName}
            
          </li>
        ))}
      </ul>
      <button onClick={props.goBack}>Back to Courses</button>
    </div>
  );
}