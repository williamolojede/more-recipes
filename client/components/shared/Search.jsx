import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import instance from '../../config/axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }


  componentDidMount() {
    this.searchInput.focus();
  }

  search = () => {
    const searchString = this.searchInput.value;
    instance.get(`/recipes?search=${searchString}`)
      .then((res) => {
        this.setState({
          searchResults: res.data.recipes
        });
      });
  }

  render() {
    const { searchResults } = this.state;
    const { toggleSearch } = this.props;
    return (
      <div className="search">

        <div className="search__container">

          <div className="search__top">
            <p>Search</p>
            <button className="search__cancel-button" onClick={toggleSearch}>
              <i className="material-icons">clear</i>
            </button>
          </div>

          <textarea
            ref={(node) => { this.searchInput = node; }}
            onChange={e => this.search(e)}
          />

          <ul className="search__results">
            {
              searchResults.map(result => (
                <li className="search__resuls-item" key={result.id}>
                  <Link to={`/recipe/${result.id}`}>{result.name}</Link>
                </li>
              ))
            }
          </ul>

        </div>
      </div>
    );
  }
}

Search.propTypes = {
  toggleSearch: PropTypes.func.isRequired
};

export default Search;
