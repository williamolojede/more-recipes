import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutUser } from '../../actions/loginUser';

export class SiteNav extends Component {
  componentDidMount() {
    if (typeof $ !== 'undefined') {
      $('.button-collapse').sideNav();
    }
  }

  render() {
    const { user, dispatch } = this.props;
    return (
      <nav className="site-header__nav">
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">MoreRecipes</Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to={`/user/${user.id}`}>Profile</Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="logout__button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logoutUser());
                }}
              >
              Sign Out
              </Link>
            </li>
          </ul>
          <ul className="side-nav" id="mobile-nav">
            <li>
              <Link to={`/user/${user.id}`}>Profile</Link>
            </li>
            <li className="logout__button">
              <Link
                to="/logout"
                className="logout__button"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logoutUser());
                }}
              >
              Sign Out
              </Link>
            </li>
          </ul>
          <button data-activates="mobile-nav" className="button-collapse">
            <i className="material-icons">menu</i>
          </button>
        </div>
      </nav>
    );
  }
}

SiteNav.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(null)(SiteNav);
