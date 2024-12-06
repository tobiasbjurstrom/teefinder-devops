import React from 'react';
import { observer } from 'mobx-react-lite';
import CoursesPresenter from './coursesPresenter';
import MapPresenter from './mapPresenter';

const ReactRoot = observer(function ReactRoot(props) {
  if (!props.model.golfCoursesPromiseState.promise) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
  }
  
  return (
    <div className="flexParent">
      <div className="mainContent">
      <MapPresenter model ={props.model}/>
      
    
      </div>
    </div>
  );
});
//<CoursesPresenter model={props.model} />
//<MapPresenter model ={props.model}/>

export { ReactRoot };
/* <CoursesPresenter model={props.model} />
<MapPresenter model ={props.model}/>
https://www.google.com/maps/embed/v1/view?key=AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5gqY&center=59.3293,18.0686&zoom=12&maptype=roadmap
*/