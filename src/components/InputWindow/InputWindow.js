import React from 'react';

import Input from '../Input';
import Button from '../Button';

class InputWindow extends React.Component { 
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit() {
		let input = this.input.getInput();
		this.input.clearInput();
		this.props.onSubmit(input);
	}
	
	render() {
		return (
			<div className='input-window'>
				<div className='input-window__form'>
					<Input ref={input => this.input = input} placeholder={this.props.placeholder} />
				</div>
				<div className='input-window__action'>
					<Button text='Send' onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}

export default InputWindow;
