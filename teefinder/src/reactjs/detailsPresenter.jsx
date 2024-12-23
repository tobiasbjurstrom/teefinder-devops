import { observer } from "mobx-react-lite";
import { DetailsView } from "../views/detailsView";


const DetailsPresenter = observer(function DetailsRender(props) {
  function getCourseACB() {
      return props.model.getSelectedCourse();
  }
  function reviewClickACB(){
    props.onReviewClick();
  }
  
  return (
    <DetailsView 
    model={props.model} 
    getCourse={getCourseACB} 
    reviewClick={reviewClickACB} />
  );
  });
  
  export default DetailsPresenter;
