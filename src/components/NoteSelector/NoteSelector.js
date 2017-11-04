import React from 'react';
import PropTypes from 'prop-types';

class NoteSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedNotes: []
		};	
		this.getSelectedNotes = this.getSelectedNotes.bind(this);
		this.toggleNote = this.toggleNote.bind(this);
		this.resetState = this.resetState.bind(this);
	}

	getSelectedNotes() {
		return this.state.selectedNotes;
	}

	toggleNote(noteId) {
		let note = this.props.notes.reduce((note, current) => current.id === noteId ? current : note, null);
		let searchNote = this.state.selectedNotes.filter(search => search.id === noteId);
		if (note !== null) {
			if (searchNote.length > 0) {
				this.setState({
					selectedNotes: this.state.selectedNotes.filter(availableNote => availableNote.id !== noteId)
				});
			} else {
				this.setState({
					selectedNotes: [
						...this.state.selectedNotes,
						note
					]
				});
			}
		}
	}

	resetState() {
		this.setState({
			selectedNotes: []
		});
	};

	render() {
		return (
			<div className='note-selector'>
				{
					this.props.notes && this.props.notes.map((note, index) => <div key={index} className='note-selector__item' onClick={() => this.toggleNote(note.id)}><input type='checkbox' checked={this.state.selectedNotes.filter(searchNote => searchNote.id === note.id).length > 0} />{ note.title }</div> )
				}
			</div>
		);
	}
}

NoteSelector.propTypes = {
	notes: PropTypes.array
};

export default NoteSelector;
