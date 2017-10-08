import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postReview } from '../../../actions/fetchRecipe';

import UserImg from '../UserImg.jsx';

/**
 * @param {*} props
 * @return {JSX} - Add review form
 */
class AddReviewForm extends Component {
  addReview = () => {
    const content = this.reviewInput.value.trim();
    if (content) {
      this.props.dispatch(postReview(content, this.props.id));
    }
  }
  render() {
    const { user } = this.props;

    return (
      <li className="review__card review__card-edit card" id="write-review">
        <div className="card-image">
          <UserImg user={user} type="inReview"/>
          <h5 className="card-title">{user.fullname}</h5>
        </div>
        <div className="card-content">
          <textarea placeholder="your review..." ref={(node) => this.reviewInput = node}/>
          <button type="submit" className="z-depth-1" onClick={this.addReview}>Submit</button>
        </div>
      </li>
    );
  }
}
export default connect(null)(AddReviewForm);
