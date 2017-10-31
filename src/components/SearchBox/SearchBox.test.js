import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SearchBox from './SearchBox';

describe('<SearchBox />', function() {
	it('should render search-box', function() {
		const searchBox = shallow(<SearchBox />);
		expect(searchBox.find('.search-box').length).to.be.equal(1);
	});

	it('should render icon if props.icon provided', function() {
		const icon = 'fa fa-home';
		const searchBox = shallow(<SearchBox icon={icon} />);
		expect(searchBox.find('.search-box__icon').length).to.be.equal(1);
	});

	it('should render placeholder if props.placeholder provided', function() {
		const placeholder = 'search';
		const searchBox = shallow(<SearchBox placeholder={placeholder} />);
		expect(searchBox.find('.search-box__form[placeholder="' + placeholder + '"]').length).to.be.equal(1);
	});
});
