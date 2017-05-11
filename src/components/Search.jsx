import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ onSearch, searchValue }) => {
    return (
        <div className='search'>
            <div className='row'>
                <div className='col-md-4'>
                    <input
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder='Search'
                        value={searchValue}
                    />
                </div>
            </div>
        </div>
    );
};

Search.filterItems = (items, searchString = '', searchProperties=[]) => {
    return items.filter((item) => {
        return searchProperties.some((property) => {
            return (
                typeof item[property] === 'string' &&
                item[property].toLowerCase().indexOf(searchString.toLowerCase()) !== -1
            );
        });
    });
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
};

export default Search;
