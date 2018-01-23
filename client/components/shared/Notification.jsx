import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { hideNotification } from '../../actions/notification';
import { notificationPropTypes } from '../../config/proptypes';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: 3000
    };
  }
  componentWillReceiveProps(newprops) {
    if (newprops.notification) {
      setTimeout(() => {
        this.props.dispatch(hideNotification());
      }, this.state.timeout);
    }
  }

  render() {
    const { notification: { message, type } } = this.props;
    return (
      <CSSTransition
        classNames="notification"
        in={!!message}
        timeout={this.state.timeout}
      >
        <div className={`notification z-depth-1 ${type}`}>
          <p>{message}</p>
        </div>
      </CSSTransition>
    );
  }
}

Notification.propTypes = {
  ...notificationPropTypes,
  dispatch: PropTypes.func.isRequired,
};
export default Notification;
