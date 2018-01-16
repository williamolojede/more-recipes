import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export default function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired
    };

    render() {
      return (
        <div>
          {this.props.isAuthenticated
            ? <Component {...this.props} />
            :
            <Redirect to={{
              pathname: '/login',
              state: { from: this.props.location }
            }}
            />
          }
        </div>
      );
    }
  }

  const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated,
    token: auth.token
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
