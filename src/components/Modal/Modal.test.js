import React from 'react';
import { shallow } from 'enzyme';
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
});
