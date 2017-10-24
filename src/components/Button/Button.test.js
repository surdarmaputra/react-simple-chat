import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Button from './Button';

describe('<Button />', function() {
	it('should render button', function() {
		const button = shallow(<Button />);
		expect(button.find('.button').length).to.be.equal(1);
	});

	it('should render button text with props.text', function() {
		const text = 'submit';	
		const button = shallow(<Button text={text} />);
		expect(button.find('.button__text').contains(text)).to.be.equal(true);
	});

	it('should render button icon with props.icon', function() {
		const icon ='fa fa-home'
		const button = shallow(<Button icon={icon} />);
		expect(button.find('.button__icon').contains(icon)).to.be.equal(true);
	});
});
