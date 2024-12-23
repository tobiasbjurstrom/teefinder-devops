import React from 'react';

export function FavouritesView(props){
  let fav = props.favourites;
  return (
    <div className="favourite-content">
      <h1>Favourite Courses</h1>
        {fav.map((club, index) => (
          <li key={index}>
          <span onClick={() => props.clickOnCourse(club.club_name)}>
              {club.club_name}
            </span>
              <button className="favourite-button"
              onClick={() => props.removeFavourite(club.club_name)}>
                Remove from Favourites
              </button>
          </li>
        ))} 
    </div>
  );
};
export default FavouritesView;
