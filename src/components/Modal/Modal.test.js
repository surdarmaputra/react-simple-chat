import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Modal from './Modal';

describe('<Modal />', function() {
	it('should render modal', function() {
		const modal = shallow(<Modal />);
		expect(modal.find('.modal').length).to.be.equal(1);
	});

	it('should wrap another component', function() {
		const Child = () => <div className='child'>Child</div>;
		const modal = shallow(<Modal><Child /></Modal>);
		expect(modal.find(Child).length).to.be.equal(1);
	});

	it('should render modal title if props.title provided', function() {
		const title = 'Modal title';
		const modal = shallow(<Modal title={title} />);
		expect(modal.find('.modal__title').length).to.be.equal(1);
		expect(modal.find('.modal__title').contains(title)).to.be.equal(true);
	});

	it('should change isOpen state if toggle() method called', function() {
		const modal = mount(<Modal />);
		expect(modal.state('isOpen')).to.be.equal(false);
		modal.instance().toggle();
		expect(modal.state('isOpen')).to.be.equal(true);
	});
});
