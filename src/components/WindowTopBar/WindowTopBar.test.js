import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import WindowTopBar from './WindowTopBar';

describe('<WindowTopBar />', function() {
	it('should render window-top-bar', function() {
		const windowTopBar = shallow(<WindowTopBar />);
		expect(windowTopBar.find('.window-top-bar').length).to.be.equal(1);
	});

	it('should render image if props.image provided', function() {
		const image = '/image.png';
		const windowTopBar = shallow(<WindowTopBar image={image} />);
		expect(windowTopBar.find('img.window-top-bar__image[src="'+image+'"]').length).to.be.equal(1);
	});

	it('should render title if props.title provided', function() {
		const title = 'title';
		const windowTopBar = shallow(<WindowTopBar title={title} />);
		expect(windowTopBar.find('.window-top-bar__title').length).to.be.equal(1);
		expect(windowTopBar.find('.window-top-bar__title').contains(title)).to.be.equal(true);
		});

	it('should render meta if props.meta provided', function() {
		const meta = 'meta';
		const windowTopBar = shallow(<WindowTopBar meta={meta} />);
		expect(windowTopBar.find('.window-top-bar__meta').length).to.be.equal(1);
		expect(windowTopBar.find('.window-top-bar__meta').contains(meta)).to.be.equal(true);
		});
});
