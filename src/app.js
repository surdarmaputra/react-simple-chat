import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { setWindowInformation } from './actions/WindowActions';
import { initiateContacts } from './actions/ContactsActions';
import { initiateMessages } from './actions/MessagesActions';
import configureStore from './configureStore';

import './app.scss';
import Sidebar from './containers/Sidebar';
import MainWindow from './containers/MainWindow';

import contacts from './samples/contacts';
import messages from './samples/messages';

const store = configureStore();
store.dispatch(initiateContacts(contacts));
store.dispatch(initiateMessages(messages));

const App = (props) => (
	<Provider store={store}>
		<div className='app'>
			<Sidebar />
			<MainWindow />
		</div>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
