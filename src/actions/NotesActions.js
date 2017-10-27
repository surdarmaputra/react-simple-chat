import * as actions from '../constants/notes';

export const initiateNotes = (notes) => {
	return {
		type: actions.INITIATE_NOTES,
		notes
	}
}

export const appendNote = (noteId, note) => {
	return {
		type: actions.APPEND_NOTE,
		noteId,
		note
	}
}

export const updateNoteInformation = (noteId, information) => {
	return {
		type: actions.UPDATE_NOTE_INFORMATION,
		noteId,
		information	
	}
}
