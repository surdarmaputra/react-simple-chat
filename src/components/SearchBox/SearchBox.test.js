import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

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
		expect(searchBox.find('.search-box__icon').hasClass(icon)).to.be.equal(true);
	});

	it('should render placeholder if props.placeholder provided', function() {
		const placeholder = 'search';
		const searchBox = shallow(<SearchBox placeholder={placeholder} />);
		expect(searchBox.find('.search-box__form[placeholder="' + placeholder + '"]').length).to.be.equal(1);
	});

	it('should execute handleInputChange() method when input change', function() {
		const handleInputChange = sinon.spy(SearchBox.prototype, 'handleInputChange');
		const searchBox = mount(<SearchBox />);		
		searchBox.find('.search-box__form').simulate('change', { target: { value: 'A' } });
		expect(handleInputChange.called).to.be.equal(true);
		handleInputChange.restore();
	});

	it('should execute props.onInputChange() when handleInputChange() called and props.onInputChange() provided', function() {
		const onInputChange = sinon.spy();
		const value = 'test';
		const searchBox = mount(<SearchBox onInputChange={onInputChange}/>);		
		searchBox.find('.search-box__form').instance().value = value;
		searchBox.find('.search-box__form').simulate('change');
		expect(onInputChange.calledWith(value)).to.be.equal(true);
	});

	it('should clear input value when clearInput() method called', function() {
		const searchBox = mount(<SearchBox />);
		searchBox.find('.search-box__form').instance().value = 'test';
		expect(searchBox.instance().input.value).to.be.equal('test');
		searchBox.instance().clearInput();
		expect(searchBox.instance().input.value).to.be.equal('');
	});
});
