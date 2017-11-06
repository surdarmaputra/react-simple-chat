import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import SidebarSearchBox from './SidebarSearchBox';
import SearchBox from '../../components/SearchBox';
import { setSearchKeyword, clearSearchKeyword } from '../../actions/SearchActions';

describe('<SidebarSearchBox />', function() {
	beforeEach(function() {
		this.search = sinon.spy(SidebarSearchBox.prototype, 'search');
		this.clearSearch = sinon.spy(SidebarSearchBox.prototype, 'clearSearch');
		this.dispatch = sinon.spy();
		this.keyword = 'search this';
		this.sidebarSearchBox = mount(<SidebarSearchBox dispatch={this.dispatch} />);
	});

	afterEach(function() {
		this.search.restore();
		this.clearSearch.restore();
	});
	
	it('should render sidebar__search-box', function() {
		expect(this.sidebarSearchBox.find('.sidebar__search-box').length).to.be;
	});

	it('should render <SearchBox />', function() {
		expect(this.sidebarSearchBox.find('.sidebar__search-box').at(0).find(SearchBox).length).to.be.equal(1);
	});

	it('should execute search(keyword) with keyword as string when SearchBox.onInputChange called', function() {
		this.sidebarSearchBox.find(SearchBox).get(0).props.onInputChange(this.keyword);
		expect(this.search.called).to.be.equal(true);
	});

	it('should execute props.dispatch with setSearchKeyword(keyword) action as argument when search(keyword) method called', function() {
		this.sidebarSearchBox.find(SearchBox).get(0).props.onInputChange(this.keyword);	
		expect(this.dispatch.calledWith(setSearchKeyword(this.keyword))).to.be.equal(true);
	});

	it('should execute searchBox.clearInput() and props.dispatch with clearSearchKeyword action as argument when clearSearch() method called', function() {
		const clearInput = sinon.spy(this.sidebarSearchBox.instance().searchBox, 'clearInput');
		this.sidebarSearchBox.instance().clearSearch();
		expect(clearInput.called).to.be.true;
		expect(this.dispatch.calledWith(clearSearchKeyword())).to.be.true;
		clearInput.restore();
	});
});
