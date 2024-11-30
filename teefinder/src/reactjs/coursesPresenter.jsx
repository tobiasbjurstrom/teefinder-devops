import React from 'react';
import { observer } from 'mobx-react-lite';
import CoursesView from '../views/coursesView';

const CoursesPresenter = observer(({ model }) => {
  return <CoursesView />;
});

export default CoursesPresenter;