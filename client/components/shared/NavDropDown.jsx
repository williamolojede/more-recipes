import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavDropDown = ({ fullname, handleLogout }) => (
  <ul className="dropdown-menu z-depth-1">
    <li className="dropdown-header">Signed in as
      <p>{ fullname }</p>
    </li>
    <li className="dropdown-item divider" />
    <li className="dropdown-item"><Link to="/user">Your Profile</Link></li>
    <li className="dropdown-item"><Link to="/user/recipes">Your Recipes</Link></li>
    <li className="dropdown-item"><Link to="/user/favorites">Your Favorite Recipes</Link></li>
    <li className="dropdown-item divider" />
    <li className="dropdown-item"><Link to="/user/recipes/create">Create New Recipe</Link></li>
    <li className="dropdown-footer">
      <Link
        to="/logout"
        className="logout__button"
        onClick={handleLogout}
      >
        Sign Out
      </Link>
    </li>
  </ul>
);

NavDropDown.propTypes = {
  fullname: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default NavDropDown;
