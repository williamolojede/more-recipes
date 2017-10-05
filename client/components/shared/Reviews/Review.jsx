import React from 'react';
import UserImg from '../UserImg.jsx';

const Review = ({review}) => (
  <li className="review__card card">
    <div className="card-image">
      <UserImg user={review.User} type="inReview" />
      <h5 className="card-title">{review.User.fullname}</h5>
    </div>
    <div className="card-content">
      <p>{review.content}</p>
    </div>
  </li>
);

export default Review;
