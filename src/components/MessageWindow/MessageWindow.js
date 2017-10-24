import React from 'react';

import MessageBox from '../MessageBox';

const MessageWindow = (props) => (
	<div className='message-window'>
		{
			props.messages && props.messages.map((message, index) => <MessageBox key={`message-${index}`} meta={message.meta} date={message.date} content={message.content} />)
		}
	</div>
);

export default MessageWindow;
