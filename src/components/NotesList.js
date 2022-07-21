import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({ notes, addNote, deleteNote, setLoading }) => (
    
        <div className='wrapper'>
            <div className='notes-list'>
                {notes.map((note, i) => (
                    <div className='note' key={i}>
                        <Note
                            id={note.data.id}
                            text={note.data.note}
                            date={note.data.date}
                            deleteNote={deleteNote}
                        />
                    </div>
                ))}
            </div>
            <AddNote addNote={addNote} setLoading={setLoading} />
        </div>
        )

export default NotesList;
