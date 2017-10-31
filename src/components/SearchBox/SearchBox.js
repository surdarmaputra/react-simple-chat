import React from 'react';

class SearchBox extends React.Component {
	constructor(props) {
		super(props);	
		this.handleInputChange = this.handleInputChange.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	handleInputChange() {
		let keyword = this.input.value;
		this.props.onInputChange && this.props.onInputChange(keyword);
	}

	clearInput() {
		this.input.value = '';
	}

	render() {
		return (
			<div className='search-box'>
				{ this.props.icon && <i className={'search-box__icon ' + this.props.icon}></i> }
				<input ref={input => this.input = input} type='text' className='search-box__form' placeholder={this.props.placeholder ? this.props.placeholder : 'Search'} onChange={this.handleInputChange} />
			</div>
		);
	}
}

export default SearchBox;
