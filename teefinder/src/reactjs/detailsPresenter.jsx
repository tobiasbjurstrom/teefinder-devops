import React from 'react';
import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';

const DetailsPresenter = observer(function DetailsRender(props) {
      
  function getCourseACB() {
        return props.model.getSelectedCourse();
      }

    return (
        <DetailsView model={props.model} getCourse={getCourseACB}  />
    );
});

export default DetailsPresenter;