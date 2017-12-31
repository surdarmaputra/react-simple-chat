import * as notes from '../constants/notes';
import { months } from '../helpers';

const notesReducer = (state = {}, action) => {
	let noteId, currentNotes, now;
	switch(action.type) {
		case notes.INITIATE_NOTES:
			return action.notes;
		case notes.APPEND_NOTE:
			noteId = action.noteId;
			if (state.hasOwnProperty(`${noteId}`)) {
				currentNotes = Object.assign({}, state);
			} else {
				now = new Date();
				currentNotes = {};
				currentNotes[`${noteId}`] = {};
				currentNotes[`${noteId}`].title = '- unnamed -';
				currentNotes[`${noteId}`].meta = null;
				currentNotes[`${noteId}`].date = `${months[now.getMonth()]} ${now.getDate()}`;
				currentNotes[`${noteId}`].notes = [];
			}
			currentNotes[`${noteId}`].notes = [
				...currentNotes[`${noteId}`].notes,
				action.note
			];
			return Object.assign({}, state, currentNotes);
		case notes.UPDATE_NOTE_INFORMATION:
			noteId = action.noteId;
			currentNotes = Object.assign({}, state);
			currentNotes[`${noteId}`] = Object.assign({}, state[`${noteId}`], action.information);
			return currentNotes;
		case notes.REMOVE_NOTE:
			noteId = action.noteId;
			if (state.hasOwnProperty(noteId)) {
				currentNotes = Object.assign({}, state);
				currentNotes[noteId].notes = currentNotes[noteId].notes.map((note, index) => index !== action.noteIndex ? note : { type: 'badge', content: '- Note has been removed -' });
				return currentNotes;
			} else return state;
		default:
			return state;
	}
} 

export default notesReducer;
