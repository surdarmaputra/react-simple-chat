import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Button from './Button';

describe('<Button />', function() {
	it('should render button', function() {
		const button = shallow(<Button />);
		expect(button.find('.button').length).to.be.equal(1);
	});

	it('should render button text if props.text provided', function() {
		const text = 'submit';	
		const button = shallow(<Button text={text} />);
		expect(button.find('.button__text').contains(text)).to.be.equal(true);
	});

	it('should render button icon if props.icon provided', function() {
		const icon ='fa fa-home';
		const button = shallow(<Button icon={icon} />);
		expect(button.find('.button__icon').contains(icon)).to.be.equal(true);
	});

	it('should add button type class name if props.type provided', function() {
		const type ='primary';
		const expectedTypeClassName = 'button--primary';
		const button = shallow(<Button type={type} />);
		expect(button.find('.button--primary').length).to.be.equal(1);
	});

	it('can have onClick props', function() {
		const callback = sinon.spy();
		const button = shallow(<Button onClick={callback} />);
		button.find('.button').simulate('click');
		expect(callback.called).to.be.equal(true);
	});
});
