import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import CoursesView from '../views/coursesView';
import DetailsPresenter from './detailsPresenter';
import FavouritesView from '../views/favouritesView';
import FavouritesPresenter from './favouritesPresenter';


const CoursesPresenter = observer(({ model }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);


  if (!model.clubinformation.length && !model.isLoading() && !model.getError()) {
    model.loadGolfCourses();
  }

  if (model.isLoading()) {
    return <div>Loading...</div>
  }

  if (model.getError()) {
    return <div>Error: {model.getError().message}</div>;
  }

  const handleCourseClick = (courseName) => {
    model.setSelectedCourse(courseName);
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
    model.hideDetails();
  };
///////////////
  const handleShowFavourites = () => {
    setShowFavourites(true);
  };

  const handleHideFavourites = () => {
    setShowFavourites(false);
  };



  const renderContent = () => {
    if (showDetails) {
      return <DetailsPresenter model={model} onBackClick={handleBackClick} />;
    } else if (showFavourites) {
      return <FavouritesPresenter model={model} onBackClickk={handleHideFavourites} />;
    } else {
      return (
        <CoursesView
          courses={model.getCourseNames()}
          loading={model.isLoading()}
          onCourseClick={handleCourseClick}
          onShowFavourites={handleShowFavourites}
        />
      );
     
    
      
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
});

export default CoursesPresenter;