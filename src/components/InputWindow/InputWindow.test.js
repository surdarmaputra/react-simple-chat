import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import InputWindow from './InputWindow';
import Input from '../Input';
import Button from '../Button';

describe('<InputWindow />', function() {
	it('should render input-window', function() {
		const inputWindow = shallow(<InputWindow />);
		expect(inputWindow.find('.input-window').length).to.be.equal(1);
	});

	it('should contains <Input /> and <Button />', function() {
		const inputWindow = shallow(<InputWindow />);
		expect(inputWindow.find('.input-window__form').length).to.be.equal(1);	
		expect(inputWindow.find('.input-window__action').length).to.be.equal(1);
		expect(inputWindow.find(Input).length).to.be.equal(1);
		expect(inputWindow.find(Button).length).to.be.equal(1);
	});

	it('should pass props.placeholder to <Input />', function() {
		const placeholder = 'Type message here...';
		const inputWindow = shallow(<InputWindow placeholder={placeholder} />);
		expect(inputWindow.find(Input).prop('placeholder')).to.be.equal(placeholder);
	});

	it('should execute props.onSubmit method when button clicked', function() {
		const onSubmit = sinon.spy();
		const handleSubmit = sinon.spy(InputWindow.prototype, 'handleSubmit');
		const getInput = sinon.spy(Input.prototype, 'getInput');
		const clearInput = sinon.spy(Input.prototype, 'clearInput');
		const inputWindow = mount(<InputWindow onSubmit={onSubmit}/>);
		inputWindow.find(Button).simulate('click');
		expect(handleSubmit.called).to.be.equal(true);	
		expect(getInput.calledAfter(handleSubmit)).to.be.equal(true);	
		expect(clearInput.calledAfter(getInput)).to.be.equal(true);
		expect(onSubmit.calledAfter(clearInput)).to.be.equal(true);
		handleSubmit.restore();
		getInput.restore();
		clearInput.restore();
	});

	it('should execute input.focusInput() when focusInput() method called', function() {
		const focusInput = sinon.spy(Input.prototype, 'focusInput');
		const inputWindow = mount(<InputWindow />);
		inputWindow.instance().focusInput();
		expect(focusInput.called).to.be.equal(true);
	});
});
