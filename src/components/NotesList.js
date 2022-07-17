import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, handleAdd, deleteNote }) => {
    return (
        <div className='wrapper'>
            <div className='notes-list'>
                {notes.map((note) => (
                    <Note
                        id={note.id}
                        text={note.text}
                        date={note.date}
                        deleteNote={deleteNote}
                    />
                ))}
            </div>
            <AddNote addNote={handleAdd} />
        </div>
    );
};

export default NotesList;
