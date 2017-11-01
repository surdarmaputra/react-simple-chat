import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Contact from './Contact';

describe('<Contact />', function() {
	it('should render contact', function() {
		const contact = shallow(<Contact />);
		expect(contact.find('.contact').length).to.be.equal(1);
	});

	it('should render image if props.image provided', function() {
		const image = '/image.png';	
		const contact = shallow(<Contact image={image} />);
		expect(contact.find('img.contact__image[src="' + image + '"]').length).to.be.equal(1);	
	});

	it('should render title if props.title provided', function() {
		const title = 'title';
		const contact = shallow(<Contact title={title} />);
		expect(contact.find('.contact__title').length).to.be.equal(1);
		expect(contact.find('.contact__title').contains(title)).to.be.equal(true);
	});

	it('should render meta if props.meta provided', function() {
		const meta = 'meta';
		const contact = shallow(<Contact meta={meta} />);
		expect(contact.find('.contact__meta').length).to.be.equal(1);
		expect(contact.find('.contact__meta').contains(meta)).to.be.equal(true);
	});

	it('should render date if props.date provided', function() {
		const date = 'Oct 21';
		const contact = shallow(<Contact date={date} />);
		expect(contact.find('.contact__date').length).to.be.equal(1);
		expect(contact.find('.contact__date').contains(date)).to.be.equal(true);
	});

	it('should add contact--active class name if props.active set to true', function() {
		const contact = shallow(<Contact active={true} />);
		expect(contact.find('.contact--active').length).to.be.equal(1);
	});

	it('can have onClick callback when props.onClick provided', function() {
		const callback = sinon.spy();
		const contact = shallow(<Contact onClick={callback} />);
		contact.find('.contact').simulate('click');
		expect(callback.called).to.be.equal(true);
	});
});
