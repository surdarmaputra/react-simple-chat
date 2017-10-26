import React from 'react';

const TabMenu = (props) => {
	const itemWidth = (props.menus && props.menus.length > 0) ? 100 / props.menus.length : 100;
	return (
		<div className='tab-menu'>
			{
				props.menus && props.menus.map((menu, index) => (
					<a key={index} className='tab-menu__item' href={menu.href} style={{ width: `${itemWidth}%` }}>
						<i className={menu.icon + ' tab-menu__icon'}></i>
					</a>
				))
			}
		</div>
	);
}

export default TabMenu;
