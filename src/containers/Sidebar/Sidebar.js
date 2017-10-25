import React from 'react';

import TabMenu from '../../components/TabMenu';
import ContactWindow from '../../components/ContactWindow';
import SearchBox from '../../components/SearchBox';

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

const menus = [
	{
		icon: 'lnr lnr-bubble',
		href: '#'
	},
	{
		icon: 'lnr lnr-users',
		href: '#'
	},	
	{
		icon: 'lnr lnr-file-empty',
		href: '#'
	},
];

class Sidebar extends React.Component {
	render() {
		return (
			<div className='sidebar'>
				<div className='sidebar__tab-menu'>
					<TabMenu menus={menus} />
				</div>
				<div className='sidebar__search-box'>
					<SearchBox icon='lnr lnr-magnifier' placeholder='Search...' />
				</div>
				<div className='sidebar__contact-window'>
					<ContactWindow contacts={contacts} />
				</div>
			</div>
		);
	}
}

export default Sidebar;
