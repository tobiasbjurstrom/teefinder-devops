import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { DetailsView } from "../views/detailsView";
import ReviewForm from "../views/reviewForm";
import ReviewList from "../views/reviewList";

const DetailsPresenter = observer(function DetailsRender(props) {
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const course = props.model.getSelectedCourse();
    if (course) {
      props.model.loadCourseReviews(course.club_name, setReviews);
    }
  }, [props.model.selectedCourse]);

  const handleAddReview = async (courseId, userId, userName, rating, reviewText) => {
    await props.model.addReview(courseId, userId, userName, rating, reviewText);
    props.model.loadCourseReviews(courseId, setReviews); 
  };

  return (
    <DetailsView
      course={props.model.getSelectedCourse()}
      reviews={reviews}
      userId={props.model.loginStore.currentUser?.id}
      userName={props.model.loginStore.currentUser?.name || "Guest"}
      onAddReview={handleAddReview}
    />
  );
});

export default DetailsPresenter;
