import { expect } from 'chai';

import reducer from './notesReducer';
import * as types from '../constants/notes';
import notes from '../samples/notes';
import { months } from '../helpers';
 
describe('notesReducer', function() {
	it('should return initial state', function() {
		expect(reducer(undefined, {})).to.be.deep.equal({});
	});

	it('should handle INITIATE_NOTES', function() {
		expect(reducer(undefined, {
			type: types.INITIATE_NOTES,
			notes
		})).to.be.deep.equal(notes);
	});

	it('should handle APPEND_NOTE', function() {
		const now = new Date();
		const availableNoteId = Object.keys(notes)[0];
		const newNoteId = 'new001';
		const note = {
			type: 'message',
			content: 'Hello',
			date: 'Nov 4'
		};
		let expectedMessages1 = Object.assign({}, notes);
		let expectedMessages2 = Object.assign({}, notes);
		expectedMessages1[availableNoteId].notes = [
			...expectedMessages1[availableNoteId].notes,
			note
		];
		expectedMessages2[newNoteId] = {
			title: '- unnamed -',
			date: `${months[now.getMonth()]} ${now.getDate()}`,
			meta: null,
			notes: [note]
		};
		expect(reducer(notes, {
			type: types.APPEND_NOTE,
			noteId: availableNoteId,
			note
		})).to.be.deep.equal(
			expectedMessages1
		);
		expect(reducer(notes, {
			type: types.APPEND_NOTE,
			noteId: newNoteId,
			note
		})).to.be.deep.equal(
			expectedMessages2
		);
	});

	it('should handle UPDATE_NOTE_INFORMATION', function() {
		const id = Object.keys(notes)[0];
		const updatedNote = {
			meta: 'updated'
		};
		let expectedState = Object.assign({}, notes);
		expectedState[id] = Object.assign({}, expectedState[id], updatedNote);
		expect(reducer(notes, {
			type: types.UPDATE_NOTE_INFORMATION,
			noteId: id,
			information: updatedNote
		})).to.be.deep.equal(expectedState);
	});

	it('should handle REMOVE_NOTE', function() {
		const noteId = Object.keys(notes)[0];
		const noteIndex = 0;
		let expectedState = Object.assign({}, notes);
		expectedState[noteId].notes = expectedState[noteId].notes.filter((note, index) => index !== noteIndex);
		expect(reducer(notes, {
			type: types.REMOVE_NOTE,
			noteId,
			noteIndex
		})).to.be.deep.equal(expectedState);
	});
});
