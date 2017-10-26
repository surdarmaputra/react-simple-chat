import React from 'react';

import Input from '../Input';
import Button from '../Button';

class InputWindow extends React.Component { 
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.focusInput = this.focusInput.bind(this);
	}

	handleSubmit() {
		let input = this.input.getInput();
		this.input.clearInput();
		this.props.onSubmit(input);
	}
	
	focusInput() {
		this.input.focusInput();
	}

	render() {
		return (
			<div className='input-window'>
				<div className='input-window__form'>
					<Input ref={input => this.input = input} placeholder={this.props.placeholder} onSubmit={this.handleSubmit} />
				</div>
				<div className='input-window__action'>
					<Button text='Send' icon={<i className='lnr lnr-upload'></i>} onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default InputWindow;
