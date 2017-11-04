import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Input from './Input';

describe('<Input />', function() {
	it('should render textarea with class name input', function() {
		const input = shallow(<Input />);
		expect(input.find('textarea.input').length).to.be.equal(1);
	});

	it('should set placeholder of textarea if props.placeholder provided', function() {
		const placeholder = 'Writing something...';
		const input = shallow(<Input placeholder={placeholder} />);
		expect(input.find('textarea').at(0).prop('placeholder')).to.be.equal(placeholder);
	});

	it('should execute listenKeyPress method on keyUp event at textarea', function() {
		const listenKeyPress = sinon.spy(Input.prototype, 'listenKeyPress');
		const input = shallow(<Input />);
		input.find('textarea').simulate('keyup', { key: 'A' });
		expect(listenKeyPress.called).to.be.equal(true);
		listenKeyPress.restore();
	});

	it('should execute props.onSubmit and clearInput method if key pressed is Enter', function() {
		const sampleText = 'sample';
		const onSubmit = sinon.spy();
		const clearInput = sinon.spy(Input.prototype, 'clearInput');
		const input = mount(<Input onSubmit={onSubmit} />);
		input.find('textarea').instance().value = sampleText;
		input.find('textarea').simulate('keyup', { keyCode: 13 });
		expect(onSubmit.calledWith(sampleText)).to.be.equal(true);
		expect(clearInput.calledAfter(onSubmit)).to.be.equal(true);
		clearInput.restore();
	});

	it('should append new line and prevent the execution of props.onSubmit if Enter and Ctrl Key pressed simultaneously', function() {
		const sampleText = 'sample';
		const onSubmit = sinon.spy();
		const input = mount(<Input onSubmit={onSubmit} />);
		input.find('textarea').instance().value = sampleText;
		input.find('textarea').simulate('keyup', { keyCode: 13, ctrlKey: true });
		expect(onSubmit.notCalled).to.be.equal(true);
		expect(input.instance().input.value).to.be.equal(sampleText + '\n');
	});

	it('should return trimmed input value when getInput method called', function() {
		const sampleText = '\nsample\n';
		const expectedOutput = 'sample';
		const input = mount(<Input />);
		input.find('textarea').instance().value = sampleText;
		expect(input.instance().getInput()).to.be.equal(expectedOutput);
	});

	it('should clear input value when clearInput method called', function() {
		const sampleText = 'sample';
		const expectedOutput = '';
		const input = mount(<Input />);
		input.find('textarea').instance().value = sampleText;
		input.instance().clearInput();
		expect(input.instance().input.value).to.be.equal(expectedOutput);
	});

	it('should focus on textarea when focusInput method called', function() {
		const input = mount(<Input />);
		input.find('textarea').instance().blur();
		expect(input.find('textarea').instance() === document.activeElement).to.be.equal(false);
		input.instance().focusInput();
		expect(input.find('textarea').instance() === document.activeElement).to.be.equal(true);
	});
});
