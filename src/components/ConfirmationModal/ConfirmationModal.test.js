import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ConfirmationModal from './ConfirmationModal';
import Modal from '../Modal';

describe('<ConfirmationModal />', function() {
	it('should contains <Modal />', function() {
		const confirmationModal = shallow(<ConfirmationModal />);
		expect(confirmationModal.find(Modal).length).to.be.equal(1);
	});

	it('should render confirmation-modal inside <Modal />', function() {
		const confirmationModal = shallow(<ConfirmationModal />);
		expect(confirmationModal.find(Modal).find('.confirmation-modal').length).to.be.equal(1);
	});
});
