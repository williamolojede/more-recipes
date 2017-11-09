import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => (
  <CSSTransition
    classNames="notification"
    in={!!notification}
    timeout={2000}
  >
    <div className="notification z-depth-1">
      <p>{notification}</p>
    </div>
  </CSSTransition>
);

Notification.propTypes = {
  notification: PropTypes.string.isRequired
};
export default Notification;
