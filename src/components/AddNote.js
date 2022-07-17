import { useState } from 'react';

const AddNote = ({ addNote }) => {
    const [noteText, setNoteText] = useState('');
    const count = 200;

    const handleChange = (e) => {
        const value = e.target.value;
        //prevent count from going negative
        if (count - value.length >= 0) {
            setNoteText(value);
        }
    };
    const handleSubmit = () => {
        //verify the note isn't empty or just whitespace
        if (noteText.trim().length > 0) {
            addNote(noteText);
            setNoteText('');
        }
    };

    return (
        <div className='note new'>
            <textarea
                rows='8'
                columns='10'
                placeholder='Type to add note...'
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className='note-footer'>
                <small>{count - noteText.length} Characters Reamining</small>
                <button onClick={handleSubmit} className='save'>
                    Save Note
                </button>
            </div>
        </div>
    );
};

export default AddNote;
