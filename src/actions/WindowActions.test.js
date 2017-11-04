import { expect } from 'chai';

import * as types from '../constants/window';
import * as actions from './WindowActions';

describe('WindowAction', function() {
	it('should have setWindowInformation(title, meta) with title as string and meta as string to set window title and meta information', function() {
		const title = 'Title';
		const meta = 'meta';
		const expectedAction = {
			type: types.SET_WINDOW_INFORMATION,
			title,
			meta
		};
		expect(actions.setWindowInformation(title, meta)).to.be.deep.equal(expectedAction);
	});
});
