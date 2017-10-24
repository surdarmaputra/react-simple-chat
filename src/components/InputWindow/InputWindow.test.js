import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

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
		expect(inputWindow.find(Input).length).to.be.equal(1);
		expect(inputWindow.find(Button).length).to.be.equal(1);
	});
});
