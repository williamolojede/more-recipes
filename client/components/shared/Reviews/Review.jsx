import React from 'react';
import PropTypes from 'prop-types';
import UserImg from '../UserImg.jsx';
import { reviewPropTypes } from '../../../config/proptypes';

const Review = ({ review }) => (
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

Review.propTypes = {
  ...reviewPropTypes
};
export default Review;
