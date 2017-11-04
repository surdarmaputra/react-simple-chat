import { expect } from 'chai';

import reducer from './windowReducer';
import * as types from '../constants/window';

describe('windowReducer', function() {
	beforeEach(function() {
		this.initialState = {
			title: 'React Simple Chat',
			meta: 'Have fun!'
		};
	});

	it('should return initial state', function() {
		expect(reducer(undefined, {})).to.be.deep.equal(this.initialState);
	});

	it('should handle SET_WINDOW_INFORMATION', function() {
		const title = 'Title';
		const meta = 'meta';
		expect(reducer(this.initialState, {
			type: types.SET_WINDOW_INFORMATION,
			title,
			meta
		})).to.be.deep.equal({
			title,
			meta
		});
	});
});
