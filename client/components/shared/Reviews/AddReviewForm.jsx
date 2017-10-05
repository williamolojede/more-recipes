import React from 'react';
import UserImg from '../UserImg.jsx';

const AddReviewForm = props => (
  <li className="review__card review__card-edit card" id="write-review">
    <div className="card-image">
      <UserImg user={props.user} type="inReview"/>
      <h5 className="card-title">{props.user.fullname}</h5>
    </div>
    <div className="card-content">
      <textarea placeholder="your review..." />
      <button type="submit" className="z-depth-1">Submit</button>
    </div>
  </li>
);

export default AddReviewForm;
