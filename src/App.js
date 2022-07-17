import NotesList from './components/NotesList';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const App = () => {
    const [notes, setNotes] = useState([
        {
            id: nanoid(),
            text: 'Placeholder text 1',
            date: 'insert date here',
        },
        {
            id: nanoid(),
            text: 'Placeholder text 2',
            date: 'insert date here',
        },
        {
            id: nanoid(),
            text: 'Placeholder text 3',
            date: 'insert date here',
        },
    ]);

    //retrieves notes from local storage upon start-up
    useEffect(() => {
        const saved = JSON.parse(
            window.localStorage.getItem('react-app-notes-data')
        );
        console.log(saved);
        if (saved) {
            setNotes(saved);
        }
    }, []);

    //saves notes to local storage
    useEffect(() => {
        window.localStorage.setItem(
            'react-app-notes-data',
            JSON.stringify(notes)
        );
    }, [notes]); //causes hook to run on change versus just onload

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString(),
        };
        const newEntry = [...notes, newNote];
        setNotes(newEntry);
    };
    
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    };
    return (
        <div className='container'>
            <NotesList
                notes={notes}
                handleAdd={addNote}
                deleteNote={deleteNote}
            />
        </div>
    );
};

export default App;
