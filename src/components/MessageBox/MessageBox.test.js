import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MessageBox from './MessageBox';

describe('<MessageBox />', function() {
	beforeEach(function() {
		this.content = 'content';
		this.meta = 'meta';
		this.component = shallow(<MessageBox meta={this.meta} content={this.content} />);
	});

	it('should render content and meta', function() {
		const messageBox = shallow(<MessageBox />);
		expect(messageBox.find('.message-box__meta').length).to.be.equal(1);
		expect(messageBox.find('.message-box__content').length).to.be.equal(1);
	});

	it('should render props.content and props.meta', function() {
		const meta = 'meta';
		const content = 'content';
		const messageBox = shallow(<MessageBox meta={meta} content={content} />);
		expect(messageBox.find('.message-box__meta').contains(meta)).to.be.equal(true);
		expect(messageBox.find('.message-box__content').contains(content)).to.be.equal(true);
	});
});
