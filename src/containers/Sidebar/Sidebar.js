import React from 'react';

import ContactWindow from '../../components/ContactWindow';

const contacts = [
	{
		title: 'Surya',
		meta: 'Hloo',
		date: 'Oct 21'
	},
	{
		title: 'Jon',
		meta: 'Hloo',
		date: 'Oct 21'
	}
];

class Sidebar extends React.Component {
	render() {
		return (
			<div className='sidebar'>
				<ContactWindow contacts={contacts} />
			</div>
		);
	}
}

export default Sidebar;
