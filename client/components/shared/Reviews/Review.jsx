import React from 'react';
import PropTypes from 'prop-types';
import UserImg from '../UserImg.jsx';

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
  review: PropTypes.shape({
    content: PropTypes.string.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      fullname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};
export default Review;
