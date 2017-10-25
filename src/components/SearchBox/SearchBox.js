import React from 'react';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);	
	}

	render() {
		return (
			<div className='search-box'>
				{ this.props.icon && <i className={'search-box__icon ' + this.props.icon}></i> }
				<input type='text' className='search-box__form' placeholder={this.props.placeholder ? this.props.placeholder : 'Search'} />
			</div>
		);
	}
}

export default SearchBox;
