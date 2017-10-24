import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ContactWindow from './ContactWindow';
import Contact from '../Contact';

describe('<ContactWindow />', function() {
	it('should render contact-window', function() {
		const contactWindow = shallow(<ContactWindow />);
		expect(contactWindow.find('.contact-window').length).to.be.equal(1);
	});

	it('should render <Contact /> for each props.contacts', function() {
		const contacts = [
			{
				image: '/image.png',
				title: 'contact 1',
				meta: 'meta 1',
				date: 'Oct 21'
			}
		];
		const contactWindow = shallow(<ContactWindow contacts={contacts} />);
		expect(contactWindow.find(Contact).length).to.be.equal(1);
	});

});
