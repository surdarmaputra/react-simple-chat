import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import ContactWindow from './ContactWindow';
import Contact from '../Contact';

describe('<ContactWindow />', function() {
	beforeEach(function() {
		this.contacts = [
			{
				id: 1,
				image: '/image.png',
				title: 'contact 1',
				meta: 'meta 1',
				date: 'Oct 21'
			}
		];
	});

	it('should render contact-window', function() {
		const contactWindow = shallow(<ContactWindow />);
		expect(contactWindow.find('.contact-window').length).to.be.equal(1);
	});

	it('should render <Contact /> for each props.contacts', function() {
		const contactWindow = shallow(<ContactWindow contacts={this.contacts} />);
		expect(contactWindow.find(Contact).length).to.be.equal(1);
	});

	it('should pass callback to each props.contacts when props.onContactClick provided', function() {
		const callback = sinon.spy();
		const contactWindow =  shallow(<ContactWindow contacts={this.contacts} onContactClick={callback} />);
		contactWindow.find(Contact).at(0).simulate('click');
		expect(callback.called).to.be.equal(true);
	});

	it('should set contact to active when props.activeContactId provided and match one of contact id', function() {
		const activeContactId = 1;
		const contactWindow = shallow(<ContactWindow contacts={this.contacts} activeContactId={activeContactId} />);
		expect(contactWindow.find(Contact).at(0).prop('active')).to.be.equal(true);
	});
});
