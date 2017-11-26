import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { postReview } from '../../../actions/recipe';

import UserImg from '../UserImg.jsx';
import Preloader from '../Preloader';

/**
 * @param {*} props
 * @return {JSX} - Add review form
 */
class AddReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingreview: false
    };
  }
  addReview = () => {
    const content = this.reviewInput.value.trim();
    if (content) {
      this.setState({
        sendingreview: true,
      });
      this.props.dispatch(postReview(content, this.props.id))
        .then(() => {
          this.setState({
            sendingreview: false,
          });
        });
      this.reviewInput.value = '';
    }
  }
  render() {
    const { user } = this.props;

    return (
      <li className="review__card review__card-edit" id="write-review">
        {this.state.sendingreview ?
          <div className="wrapper">
            <Preloader />
          </div>
          :
          <div className="wrapper">
            <UserImg user={user} type="inReview" />
            <div className="review__card-edit__form">
              <textarea placeholder="your review..." ref={node => this.reviewInput = node} />
              <button type="submit" className=" btn z-depth-1" onClick={this.addReview}>Submit</button>
            </div>
          </div>
        }

      </li>
    );
  }
}

AddReviewForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired
};

export default connect(null)(AddReviewForm);
