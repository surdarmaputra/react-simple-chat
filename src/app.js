import React from 'react';
import ReactDOM from 'react-dom';

import './app.scss';
import Sidebar from './containers/Sidebar';
import MainWindow from './containers/MainWindow';

const App = (props) => (
	<div className='app'>
		<Sidebar />
		<MainWindow />
	</div>
);

ReactDOM.render(<App />, document.getElementById('app'));
