import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SidebarTabMenu from './SidebarTabMenu';
import TabMenu from '../../components/TabMenu';

describe('<SidebarTabMenu />', function() {
	beforeEach(function() {
		this.sidebarTabMenu = shallow(<SidebarTabMenu />);
	});
	
	it('should render sidebar__tab-menu', function() {
		expect(this.sidebarTabMenu.find('.sidebar__tab-menu').length).to.be.equal(1);
	});

	it('should contains <TabMenu />', function() {
		expect(this.sidebarTabMenu.find('.sidebar__tab-menu').at(0).find(TabMenu).length).to.be.equal(1);
	});
});
