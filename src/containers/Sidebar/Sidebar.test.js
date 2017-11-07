import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Sidebar from './Sidebar';
import SidebarTabMenu from './SidebarTabMenu';
import SidebarSearchBox from './SidebarSearchBox';
import SidebarContactWindow from './SidebarContactWindow';
import configureStore from '../../configureStore';
import { setSearchKeyword } from '../../actions/SearchActions';

const store = configureStore();
store.dispatch(setSearchKeyword('test'));

const App = () => (
	<Provider store={store}>
		<MemoryRouter>
			<Sidebar />
		</MemoryRouter>
	</Provider>
);

describe('<Sidebar> container', function() {
	beforeEach(function() {
		this.sidebar = mount(<App />);
	});

	it('should render sidebar', function() {
		expect(this.sidebar.find('.sidebar').length).to.be.equal(1);
	});

	it('should contains <SidebarTabMenu />, <SidebarSearchBox /> and <SidebarContactWindow />', function() {
		expect(this.sidebar.find(SidebarTabMenu).length).to.be.equal(1);
		expect(this.sidebar.find(SidebarSearchBox).length).to.be.equal(1);
		expect(this.sidebar.find(SidebarContactWindow).length).to.be.equal(1);
	});
});
