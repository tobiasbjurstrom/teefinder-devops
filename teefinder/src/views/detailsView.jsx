import React from 'react';

const DetailsView = ({ course }) => {
    return (
        <div>
            <h1>{course.club_name}</h1>
            <p>Address: {course.address}</p>
            <p>City: {course.city}</p>
            <p>Country: {course.country}</p>
            <p>Number of Holes: {course.number_of_holes}</p>
            <p>Phone: {course.phone}</p>
            <p>Email: {course.email_address}</p>
        </div>
    )
}
export default DetailsView;