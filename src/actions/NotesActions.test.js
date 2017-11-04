import { expect } from 'chai';

import * as types from '../constants/notes';
import * as actions from './NotesActions';
import notes from '../samples/notes';

describe('NotesActions', function() {
	beforeEach(function() {
		this.notes = notes;
		this.noteId = Object.keys(notes)[0];
		this.note = {
			type: 'message',
			content: 'Hello',
			date: 'Nov 4'
		};
		this.information = {
			meta: 'Hello',
			date: 'Nov 4'
		};
	});

	it('should have initiateNotes(notes) with notes as array to initiate notes', function() {
		const expectedAction = {
			type: types.INITIATE_NOTES,
			notes: this.notes
		};
		expect(actions.initiateNotes(this.notes)).to.be.deep.equal(expectedAction);
	});

	it('should have appendNote(noteId, note) with noteId as string or integer and note as object to append note', function() {
		const expectedAction = {
			type: types.APPEND_NOTE,
			noteId: this.noteId,
			note: this.note
		};	
		expect(actions.appendNote(this.noteId, this.note)).to.be.deep.equal(expectedAction);
	});	

	it('should have updateNoteInformation(noteId, information) with noteId as string or integer and information as object to update certain note information', function() {
		const expectedAction = {
			type: types.UPDATE_NOTE_INFORMATION,
			noteId: this.noteId,
			information: this.information
		};	
		expect(actions.updateNoteInformation(this.noteId, this.information)).to.be.deep.equal(expectedAction);
	});	

	it('should have removeNote(noteId, noteIndex) with noteId as string or integer and noteId as integer to remove certain note', function() {
		const expectedAction = {
			type: types.REMOVE_NOTE,
			noteId: this.noteId,
			noteIndex: 0
		};	
		expect(actions.removeNote(this.noteId, 0)).to.be.deep.equal(expectedAction);
	});	

});

