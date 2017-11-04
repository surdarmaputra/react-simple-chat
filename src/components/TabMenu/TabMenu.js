import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const TabMenu = (props) => {
	const itemWidth = (props.menus && props.menus.length > 0) ? 100 / props.menus.length : 100;
	return (
		<div className='tab-menu'>
			{
				props.menus && props.menus.map((menu, index) => (
					<NavLink key={index} exact={menu.exact ? menu.exact : false} to={menu.href} className='tab-menu__item' activeClassName='tab-menu__item--active' style={{ width: `${itemWidth}%` }}>
						<i className={menu.icon + ' tab-menu__icon'}></i>
					</NavLink>
				))
			}
		</div>
	);
}

TabMenu.propTypes = {
	menus: PropTypes.array
};

export default TabMenu;
