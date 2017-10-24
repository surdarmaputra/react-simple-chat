import React from 'react';

class Input extends React.Component { 
	constructor(props) {
		super(props);
		this.listenKeyPress = this.listenKeyPress.bind(this);
		this.getInput = this.getInput.bind(this);
		this.clearInput = this.clearInput.bind(this);
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

	render() {
		return (
			<textarea ref={input => this.input = input} className='input' onKeyUp={this.listenKeyPress} placeholder={this.props.placeholder}></textarea>
		);
	}
}

export default Input;
