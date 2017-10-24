import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Badge from './Badge';

describe('<Badge />', function() {
	it('should render badge', function() {
		const badge = shallow(<Badge />);
		expect(badge.find('.badge').length).to.be.equal(1);
	});

	it('should render props.content', function() {
		const content = 'content';
		const badge = shallow(<Badge content={content} />);
		expect(badge.find('.badge').contains(content)).to.be.equal(true);
	});
});
