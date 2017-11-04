import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component { 
	constructor(props) {
		super(props);
		this.listenKeyPress = this.listenKeyPress.bind(this);
		this.getInput = this.getInput.bind(this);
		this.clearInput = this.clearInput.bind(this);
		this.focusInput = this.focusInput.bind(this);
	}

	listenKeyPress(event) {
		if (event.keyCode === 13 && !event.ctrlKey && this.props.onSubmit) {
			this.props.onSubmit(this.input.value);
			this.clearInput();
		} else if (event.keyCode === 13 && event.ctrlKey) {
			this.input.value = this.input.value + '\n';
			return true;
		} else {
			return true;
		}
	}

	getInput() {
		return this.input.value.trim();
	}

	clearInput() {
		this.input.value = '';
	}
	
	focusInput() {
		this.input.focus();
	}

	render() {
		return (
			<textarea ref={input => this.input = input} autoFocus={true} className='input' onKeyUp={this.listenKeyPress} placeholder={this.props.placeholder}></textarea>
		);
	}
}

Input.propTypes = {
	placeholder: PropTypes.string,
	onSubmit: PropTypes.func
};

export default Input;
