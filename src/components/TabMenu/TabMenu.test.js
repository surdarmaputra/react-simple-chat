import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import TabMenu from './TabMenu';

describe('<TabMenu />', function() {
	it('should render tab-menu', function() {
		const tabMenu = shallow(<TabMenu />);
		expect(tabMenu.find('.tab-menu').length).to.be.equal(1);
	});

	it('should render menus if props.menus provided', function() {
		const menus = [
			{
				icon: 'fa fa-home',
				href: '#'
			}
		];
		const tabMenu = shallow(<TabMenu menus={menus} />);
		expect(tabMenu.find('.tab-menu__item').length).to.be.equal(1);
	});
});
