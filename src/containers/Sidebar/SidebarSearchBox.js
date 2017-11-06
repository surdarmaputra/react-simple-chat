import React from 'react';
import PropTypes from 'prop-types';

import SearchBox from '../../components/SearchBox';
import { setSearchKeyword, clearSearchKeyword } from '../../actions/SearchActions';

class SidebarSearchBox extends React.Component {
	constructor(props) {
		super(props);
		this.search = this.search.bind(this);
		this.clearSearch = this.clearSearch.bind(this);
	}

	search(keyword) {
		this.props.dispatch(setSearchKeyword(keyword));
	}

	clearSearch() {
		this.searchBox.clearInput();
		this.props.dispatch(clearSearchKeyword());
	}

	render() {
		return (
			<div className='sidebar__search-box'>
				<SearchBox ref={searchBox => this.searchBox = searchBox} icon='lnr lnr-magnifier' placeholder='Search for ...' onInputChange={(keyword) => this.search(keyword)} />
			</div>
		);
	}
}

SidebarSearchBox.propTypes = {
	dispatch: PropTypes.func 
};

export default SidebarSearchBox;
