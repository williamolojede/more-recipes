import React from 'react';
import moment from 'moment';

import UserImg from '../UserImg.jsx';
import { reviewPropTypes } from '../../../config/proptypes';

const Review = ({ review }) => (
  <li className="review__card">
    <div className="wrapper">
      <UserImg user={review.User} type="inReview" />
      <div className="review__card-card-content">
        <div className="review__card-card-content___top">
          <p className="user-name">{review.User.fullname}</p>
          <span className="time-since">{moment(review.createdAt).fromNow()}</span>
        </div>
        <p className="review__card-card-content">{review.content}</p>
      </div>
    </div>
  </li>
);

Review.propTypes = {
  ...reviewPropTypes
};
export default Review;
