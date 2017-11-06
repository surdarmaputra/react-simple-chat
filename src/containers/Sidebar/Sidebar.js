import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SidebarTabMenu from './SidebarTabMenu';
import SidebarSearchBox from './SidebarSearchBox';
import SidebarContactWindow from './SidebarContactWindow';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.location.pathname !== nextProps.location.pathname && nextProps.search.length > 0) {
			this.sidebarSearchBox.clearSearch();
		}
	}

	render() {
		return (
			<div className='sidebar'>
				<SidebarTabMenu />
				<SidebarSearchBox ref={sidebarSearchBox => this.sidebarSearchBox = sidebarSearchBox} dispatch={this.props.dispatch} />			
				<SidebarContactWindow />
			</div>
		);
	}
}

export default withRouter(connect(state => ({
	search: state.search
}))(Sidebar));
