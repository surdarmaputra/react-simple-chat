import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Input from './Input';

describe('<Input />', function() {
	it('should render input', function() {
		const input = shallow(<Input />);
		expect(input.find('textarea.input').length).to.be.equal(1);
	});
});
