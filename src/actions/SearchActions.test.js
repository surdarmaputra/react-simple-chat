import { expect } from 'chai';

import * as types from '../constants/search';
import * as actions from './SearchActions';

describe('SearchActions', function() {
	it('should have setSearchKeyword(keyword) with keyword as string to set search keyword', function() {
		const keyword = 'test';
		const expectedAction = {
			type: types.SET_SEARCH_KEYWORD,
			keyword
		};
		expect(actions.setSearchKeyword(keyword)).to.be.deep.equal(expectedAction);
	});

	it('should have clearSearchKeyword() to clear search keyword', function() {
		const expectedAction = {
			type: types.CLEAR_SEARCH_KEYWORD
		};
		expect(actions.clearSearchKeyword()).to.be.deep.equal(expectedAction);
	});
});
