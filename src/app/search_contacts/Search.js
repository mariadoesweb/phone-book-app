import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'reactstrap';



const Search = (props) => {
    // console.log(props.searchValue)
    return <div><span><i className="fa fa-search" aria-hidden="true"></i></span><Input className='search-for-contact' type='search' value={props.searchValue} onChange={props.updateSearch}  placeholder='Search for contact by last name...'/></div>
    
};

// Validation of forwarded props to component Search

Search.propTypes = {
    updateSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired
};

export default Search;