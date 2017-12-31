import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

class MessageBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			footerOpened: false
		};
		this.toggleFooter = this.toggleFooter.bind(this);
	}

	toggleFooter() {
		this.props.options && this.props.options.length > 0 && this.setState({
			footerOpened: !this.state.footerOpened
		});
	}

	render() {
		return (
			<div className={`message-box ${ this.props.messageFromMyself ? 'message-box--from-me' : '' }`}>
				<div className='message-box__body' onClick={this.toggleFooter}>
					<div className='message-box__meta'>
						{ this.props.meta && this.props.meta } 
						{ this.props.date && <div className='message-box__date'>{ this.props.date }</div> }
					</div>
					<div className='message-box__content'>
						{ this.props.content && this.props.content.split('\n').map((text, index) => {
							return (
								<div key={index}>
									{ text }
									<br/>
								</div>
							);
						}) }
					</div>
				</div>
				<div className={`message-box__footer ${this.state.footerOpened ? '' : 'message-box__footer--hidden'}`}>
					{ 
						this.props.options && this.props.options.map((option, index) => {
							return (
								<div key={`option-${index}`} className={`message-box__option ${option.type ? 'message-box__option--' + option.type : ''}`} onClick={option.callback}>
									{ option.text }
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
}

MessageBox.propTypes = {
	content: PropTypes.string,
	meta: PropTypes.string,
	date: PropTypes.string,
	options: PropTypes.array,
	messageFromMyself: PropTypes.bool
};

export default MessageBox;
