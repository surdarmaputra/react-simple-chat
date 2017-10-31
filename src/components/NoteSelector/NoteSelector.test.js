import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import NoteSelector from './NoteSelector';

describe('<NoteSelector />', function() {
	it('should render note-selector', function() {
		const noteSelector = shallow(<NoteSelector />);
		expect(noteSelector.find('.note-selector').length).to.be.equal(1);
	});

	it('should render list of notes if props.notes provided', function() {
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		expect(noteSelector.find('.note-selector__item').length).to.be.equal(1);
		expect(noteSelector.find('.note-selector__item').at(0).contains(notes[0].title)).to.be.equal(true);
	});
});
