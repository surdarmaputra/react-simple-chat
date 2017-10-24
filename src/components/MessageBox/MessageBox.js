import React from 'react';

const MessageBox = (props) => (
	<div className='message-box'>
		<div className='message-box__meta'>
			{ props.meta } 
			{ props.date && <div className='message-box__date'>{ props.date }</div> }
		</div>
		<div className='message-box__content'>{ props.content && props.content.split('\n').map((text, index) => {
			return (
				<div key={index}>
					{ text }
					<br/>
				</div>
			);
		}) }</div>
	</div>
);

export default MessageBox;
