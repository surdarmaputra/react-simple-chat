import React from 'react';

class Input extends React.Component { 
	constructor(props) {
		super(props);
		this.getInput = this.getInput.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}

	getInput() {
		return this.input.value;
	}

	clearInput() {
		this.input.value = '';
	}

	render() {
		return (
			<textarea ref={input => this.input = input} className='input' placeholder={this.props.placeholder}></textarea>
		);
	}
}

export default Input;
