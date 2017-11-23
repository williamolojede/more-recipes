import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { hideNotification } from '../../actions/notification';

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
    const { notification } = this.props;
    return (
      <CSSTransition
        classNames="notification"
        in={!!notification}
        timeout={this.state.timeout}
      >
        <div className="notification z-depth-1">
          <p>{notification}</p>
        </div>
      </CSSTransition>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};
export default Notification;
