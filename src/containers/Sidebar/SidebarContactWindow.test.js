import React from 'react';
import { Route, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { expect } from 'chai';

import SidebarContactWindow from './SidebarContactWindow';
import configureStore from '../../configureStore';

const store = configureStore();
const App = () => (
	<Provider store={store}>
		<MemoryRouter>
			<SidebarContactWindow />
		</MemoryRouter>
	</Provider>
);

describe('<SidebarContactWindow />', function() {
	beforeEach(function() {
		this.sidebarContactWindow = mount(<App />);
	});

	it('should render sidebar__contact-window', function() {
		expect(this.sidebarContactWindow.find('.sidebar__contact-window').length).to.be.equal(1);
	});

	it('should contain Route for messages window', function() {
		//expect(this.sidebarContactWindow.find(Route));
	});
});
