import React from 'react';
import { observer } from 'mobx-react-lite';
import DetailsView from '../views/detailsView';

const DetailsPresenter = observer(({ model, onBackClick }) => {
    const course = model.getSelectedCourse();

    if (!course) {
        return <div>No course selected.</div>;
    }
    
    return (
        <div>
            <button onClick={onBackClick}>Back to Courses</button>

            <DetailsView course={course} />

        </div>
    );
});

export default DetailsPresenter;