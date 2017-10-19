import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SiteNav = ({ user }) => (
  <nav className="site-header__nav">
    <div className="nav-wrapper container">
      <Link to="/" className="brand-logo">MoreRecipes</Link>
      <ul className="right hide-on-med-and-down">
        <li>
          <Link to={`/user/${user.id}`}>Profile</Link>
        </li>
      </ul>
      <ul className="side-nav" id="mobile-nav">
        <li>
          <Link to={`/user/${user.id}`}>Profile</Link>
        </li>
      </ul>
      <a href="#" data-activates="mobile-nav" className="button-collapse">
        <i className="material-icons">menu</i>
      </a>
    </div>
  </nav>
);

SiteNav.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired
};

export default SiteNav;
