import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, pages, getRecipesForPage }) => (
  <ul className="pagination">
    <li
      className={currentPage === 1 ? 'disabled' : 'waves-effect'}
      id="pagination__prev"
    >
      <a href="#!" onClick={() => getRecipesForPage(currentPage - 1)}>
        <i className="material-icons">chevron_left</i>
      </a>
    </li>
    {
      pages.map(page => (
        <li
          className={page === currentPage ? 'active' : 'waves-effect'}
          key={page}
        >
          <a href="#!" onClick={() => getRecipesForPage(page)}>
            {page}
          </a>
        </li>
      ))
    }
    <li
      className={
        currentPage === pages[pages.length - 1] ?
          'disabled' : 'waves-effect'
      }
      id="pagination__next"
    >
      <a href="#!" onClick={() => getRecipesForPage(currentPage + 1)}>
        <i className="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
);


Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  getRecipesForPage: PropTypes.func.isRequired
};

export default Pagination;
