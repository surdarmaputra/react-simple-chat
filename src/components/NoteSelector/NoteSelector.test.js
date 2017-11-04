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

	it('should call toggleNote() method with note.id as argument when note-selector__item clicked', function() {
		const toggleNote = sinon.spy(NoteSelector.prototype, 'toggleNote');
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		noteSelector.find('.note-selector__item').at(0).simulate('click');
		expect(toggleNote.calledWith(notes[0].id)).to.be.equal(true);
		toggleNote.restore();
	});

	it('should add note to state.selectedNotes if note isn\'t toggled yet', function() {
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		noteSelector.find('.note-selector__item').at(0).simulate('click');
		expect(noteSelector.state('selectedNotes')[0].id === notes[0].id).to.be.equal(true);
	});

	it('should remove note from state.selectedNotes if note has been toggled', function() {
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		noteSelector.find('.note-selector__item').at(0).simulate('click');
		expect(noteSelector.state('selectedNotes')[0].id === notes[0].id).to.be.equal(true);
		noteSelector.find('.note-selector__item').at(0).simulate('click');
		expect(noteSelector.state('selectedNotes').length).to.be.equal(0);
	});

	it('should do nothing if toggleNote() argument is not available in props.notes', function() {
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		noteSelector.instance().toggleNote('notAvailable');
		expect(noteSelector.state('selectedNotes').length).to.be.equal(0);
	});

	it('should set checkbox to be checked if note available in state.selectedNotes', function() {
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		expect(noteSelector.find('.note-selector__item').at(0).find('input[type="checkbox"]').at(0).props().checked).to.be.equal(false);
		noteSelector.find('.note-selector__item').at(0).simulate('click');
		expect(noteSelector.find('.note-selector__item').at(0).find('input[type="checkbox"]').at(0).props().checked).to.be.equal(true);
	});

	it('should return state.selectedNotes if getSelectedNotes() method called', function() {
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		noteSelector.find('.note-selector__item').at(0).simulate('click');
		const selectedNotes = noteSelector.instance().getSelectedNotes();
		expect(selectedNotes.length).to.be.equal(1);
		expect(selectedNotes[0].id === notes[0].id && selectedNotes[0].title === notes[0].title).to.be.equal(true);
	});

	it('should reset state.selectedNotes to empty array if resetState() method called', function() {
		const notes = [
			{
				id: 'note1',
				title: 'Note 1'
			}
		];
		const noteSelector = shallow(<NoteSelector notes={notes} />);
		noteSelector.find('.note-selector__item').at(0).simulate('click');
		expect(noteSelector.instance().getSelectedNotes().length).to.be.equal(1);
		noteSelector.instance().resetState();
		expect(noteSelector.instance().getSelectedNotes().length).to.be.equal(0);

	});
});
