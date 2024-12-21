import React from 'react';
import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';

const DetailsPresenter = observer(function DetailsRender(props) {
    function goBackACB() {
        props.model.setSelectedCourse(null);
      }
      function getCourseACB() {
        return props.model.getSelectedCourse();
      }

    return (
        <DetailsView model={props.model} goBack={goBackACB} getCourse={getCourseACB}  />
    );
});

export default DetailsPresenter;