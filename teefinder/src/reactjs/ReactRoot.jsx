import React from 'react';
import { observer } from 'mobx-react-lite';
import CoursesPresenter from './coursesPresenter';

const ReactRoot = observer(function ReactRoot(props) {
  if (!props.model.golfCoursesPromiseState.promise) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
  }
  return (
    <div className="flexParent">
      <div className="mainContent">
        <CoursesPresenter model={props.model} />
      </div>
    </div>
  );
});

export { ReactRoot };