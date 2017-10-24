import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MessageWindow from './MessageWindow';
import MessageBox from '../MessageBox';

describe('<MessageWindow />', function() {
	it('should render message-window', function() {
		const messageWindow = shallow(<MessageWindow />);
		expect(messageWindow.find('.message-window').length).to.be.equal(1);
	});

	it('should render <MessageBox /> for each props.messages', function() {
		const messages = [
			{
				meta: 'first meta',
				content: 'message'
			}
		];
		const messageWindow = shallow(<MessageWindow messages={messages} />);
		expect(messageWindow.find(MessageBox).length).to.be.equal(1);
	});

});
