import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import MessageBox from './MessageBox';

describe('<MessageBox />', function() {
	beforeEach(function() {
		this.content = 'content';
		this.meta = 'meta';
		this.component = shallow(<MessageBox meta={this.meta} content={this.content} />);
	});

	it('should render empty message-box if no props provided', function() {
		const messageBox = shallow(<MessageBox />);
		expect(messageBox.find('.message-box').length).to.be.equal(1);
	});

	it('should render content if props.content provided', function() {
		const content = 'content';
		const messageBox = shallow(<MessageBox content={content} />);
		expect(messageBox.find('.message-box__content').length).to.be.equal(1);
		expect(messageBox.find('.message-box__content').contains(content)).to.be.equal(true);

	});

	it('should render content with <br/> for every word in props.content', function() {
		const singleLineContent = 'content';
		const multiLineContent = 'new\ncontent';
		let messageBox = shallow(<MessageBox content={singleLineContent} />);
		expect(messageBox.find('.message-box__content').find('br').length).to.be.equal(1);
		messageBox = shallow(<MessageBox content={multiLineContent} />);
		expect(messageBox.find('.message-box__content').find('br').length).to.be.equal(2);

	});

	it('should render meta if props.meta provided', function() {
		const meta = 'meta';
		const messageBox = shallow(<MessageBox meta={meta} />);
		expect(messageBox.find('.message-box__meta').length).to.be.equal(1);
		expect(messageBox.find('.message-box__meta').contains(meta)).to.be.equal(true);
	});

	it('should render date if props.date provided', function() {
		const date = 'Nov 1';
		const messageBox = shallow(<MessageBox date={date} />);
		expect(messageBox.find('.message-box__date').length).to.be.equal(1);
		expect(messageBox.find('.message-box__date').contains(date)).to.be.equal(true);
	});

	it('should render options if props.options provided', function() {
		const options = [
			{
				text: 'Sample',
				callback: () => console.log('option callback')
			}
		];
		const messageBox = shallow(<MessageBox options={options} />);
		expect(messageBox.find('.message-box__footer').find('.message-box__option').length).to.be.equal(1);
		expect(messageBox.find('.message-box__footer').find('.message-box__option').at(0).contains(options[0].text)).to.be.equal(true);
	});

	it('should set option class name based on type if option.type provided', function() {
		const options = [
			{
				type: 'danger',
				text: 'Sample',
				callback: () => console.log('option callback')
			}
		];
		const messageBox = shallow(<MessageBox options={options} />);
		expect(messageBox.find('.message-box__footer').find('.message-box__option').at(0).hasClass(`message-box__option--${options[0].type}`)).to.be.equal(true);
	});


	it('should call option.callback when option clicked', function() {
		const callback = sinon.spy();
		const options = [
			{
				text: 'Sample',
				callback: callback
			}
		];
		const messageBox = shallow(<MessageBox options={options} />);
		messageBox.find('.message-box__option').at(0).simulate('click');
		expect(callback.called).to.be.equal(true);	
	});

	it('should call toggleFooter() method when message-box__body clicked', function() {
		const toggleFooter = sinon.spy(MessageBox.prototype, 'toggleFooter');
		const messageBox = shallow(<MessageBox />);
		messageBox.find('.message-box__body').simulate('click');
		expect(toggleFooter.called).to.be.equal(true);
		toggleFooter.restore();
	});

	it('should check availability of props.options before deciding to set component state in toggelFooter() method', function() {
		const options = [
			{
				text: 'Sample',
				callback: () => console.log('callback')
			}
		];
		let messageBox = shallow(<MessageBox />);
		messageBox.find('.message-box__body').simulate('click');
		expect(messageBox.state('footerOpened')).to.be.equal(false);
		messageBox = shallow(<MessageBox options={[]} />);
		messageBox.find('.message-box__body').simulate('click');
		expect(messageBox.state('footerOpened')).to.be.equal(false);
		messageBox = shallow(<MessageBox options={options} />);	
		messageBox.find('.message-box__body').simulate('click');
		expect(messageBox.state('footerOpened')).to.be.equal(true);

	});
});
