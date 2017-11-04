import { expect } from 'chai';

import reducer from './searchReducer';
import * as types from '../constants/search';

describe('searchReducer', function() {
	it('should return initial state', function() {
		expect(reducer(undefined, {})).to.be.equal('');
	});

	it('should handle SET_SEARCH_KEYWORD', function() {
		const keyword = 'test';
		expect(reducer('', {
			type: types.SET_SEARCH_KEYWORD,
			keyword
		})).to.be.equal(keyword);
	});

	it('should handle CLEAR_SEARCH_KEYWORD', function() {
		expect(reducer('test', {
			type: types.CLEAR_SEARCH_KEYWORD
		})).to.be.equal('');
	});
});
