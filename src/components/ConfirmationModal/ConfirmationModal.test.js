import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import ConfirmationModal from './ConfirmationModal';
import Modal from '../Modal';
import Button from '../Button';

describe('<ConfirmationModal />', function() {
	it('should contains <Modal />', function() {
		const confirmationModal = shallow(<ConfirmationModal />);
		expect(confirmationModal.find(Modal).length).to.be.equal(1);
	});

	it('should render confirmation-modal inside <Modal />', function() {
		const confirmationModal = shallow(<ConfirmationModal />);
		expect(confirmationModal.find(Modal).find('.confirmation-modal').length).to.be.equal(1);
	});

	it('should have ref to <Modal /> with initial state isOpen set to false', function() {
		const confirmationModal = mount(<ConfirmationModal />);
		expect(confirmationModal.instance().modal).to.be.instanceOf(Modal);
		expect(confirmationModal.instance().modal.state['isOpen']).to.be.equal(false);
	});

	it('should have okay and cancel button', function() {
		const confirmationModal = shallow(<ConfirmationModal />);
		expect(confirmationModal.find(Modal).find('.confirmation-modal__button').length).to.be.equal(2);
		expect(confirmationModal.find(Modal).find('.confirmation-modal__button').at(0).find(Button).prop('type')).to.be.equal('primary');			
		expect(confirmationModal.find(Modal).find('.confirmation-modal__button').at(0).find(Button).prop('text')).to.be.equal('Okay');		
		expect(confirmationModal.find(Modal).find('.confirmation-modal__button').at(1).find(Button).prop('type')).to.be.equal('default');	
		expect(confirmationModal.find(Modal).find('.confirmation-modal__button').at(1).find(Button).prop('text')).to.be.equal('Cancel');		
	});

	it('should has default state carriedObject to be empty object ', function() {
		const confirmationModal = shallow(<ConfirmationModal />);
		expect(confirmationModal.state('carriedObject')).to.be.empty;
	});

	it('should execute modal.toggle() and set carriedObject state when toggle() method invoked', function() {
		const confirmationModal = mount(<ConfirmationModal />);
		const carriedObject = { title: 'sample' };
		const modalToggle = sinon.spy(confirmationModal.instance().modal, 'toggle');
		confirmationModal.instance().toggle(carriedObject);
		expect(modalToggle.called).to.be.equal(true);
		expect(confirmationModal.state('carriedObject')).to.be.equal(carriedObject);
		modalToggle.restore();
	});

	it('should only execute modal.toggle() without setting state.carriedObject if toggle() method invoked without carriedObject argument', function() {
		const confirmationModal = mount(<ConfirmationModal />);
		const modalToggle = sinon.spy(confirmationModal.instance().modal, 'toggle');
		confirmationModal.instance().toggle();
		expect(modalToggle.called).to.be.equal(true);
		expect(confirmationModal.state('carriedObject')).to.be.deep.equal({});
		modalToggle.restore();
	});

	it('should execute callback for okay action when props.onOkacyClick provided', function() {
		const callback = sinon.spy();
		const confirmationModal = shallow(<ConfirmationModal onOkayClick={callback} />);
		confirmationModal.find(Modal).find('.confirmation-modal__button').at(0).find(Button).simulate('click');
		expect(callback.called).to.be.equal(true);
	});

	it('should execute callback for cancel action when props.onCancelClick provided', function() {
		const callback = sinon.spy();
		const confirmationModal = shallow(<ConfirmationModal onCancelClick={callback} />);
		confirmationModal.find(Modal).find('.confirmation-modal__button').at(1).find(Button).simulate('click');
		expect(callback.called).to.be.equal(true);
	});

	it('should render text when props.text provided', function() {
		const text = 'Sample text';
		const confirmationModal = shallow(<ConfirmationModal text={text} />);
		expect(confirmationModal.find(Modal).find('.confirmation-modal__text').contains(text)).to.be.equal(true);
	});

	it('should pass title to <Modal /> title props when props.title provided', function() {
		const title = 'Sample Confirmation';
		const confirmationModal = mount(<ConfirmationModal title={title} />);
		expect(confirmationModal.instance().modal.props['title']).to.be.equal(title);
	});
});
