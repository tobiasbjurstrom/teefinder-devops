import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import CoursesView from '../views/coursesView';
import DetailsPresenter  from './detailsPresenter';


const CoursesPresenter = observer(({ model }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!model.clubinformation.length && !model.isLoading()  && !model.getError()) {
    model.loadGolfCourses();
  }

  if(model.isLoading()) {
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

  const renderContent = () => {
    if (showDetails) {
      return <DetailsPresenter model={model} onBackClick={handleBackClick} />;
    } else {
      return <CoursesView courses={model.getCourseNames()} loading={model.isLoading()} onCourseClick={handleCourseClick} />;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
});

export default CoursesPresenter;