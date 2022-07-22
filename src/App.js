import NotesList from './components/NotesList';
import { useState, useEffect } from 'react';
import api from './api';
import Loading from './components/loading';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const startUp = () => {
        api.readall().then((notes) => {
            let newNotes = [];
            //map over the data retrieved from the api call
            notes.map((note) => {
                //get the id from the db
                const key = getnoteId(note);
                newNotes.push({
                    //keep original formatting when pushing
                    data: {
                        note: note.data.note,
                        date: note.data.date,
                        id: key,
                    },
                });
                return newNotes;
            });
            console.log(newNotes)
            setNotes(newNotes);
            setLoading(false);
        });
    };

    useEffect(() => {
        startUp();
    }, []);

    const addNote = async (newNote) => {
      //create copy of original
        const original = [notes];

        await api
            .create(newNote)
            .then((response) => {
                console.log(response);
                //call startUp so the new note gets an ID, change loading to false
                startUp();
            })
            .catch((err) => {
                console.log('API error ', err);
                //if error, revert back to original
                setNotes(original);
            });
    };

    const deleteNote = async (id) => {
        const original = [...notes];
        //const newNotes = notes.filter((note) => note.id !== id);
        //setNotes(newNotes);

        await api
            .erase(id)
            .then((response) => {
              console.log(response)
              startUp()
            })
            .catch((err) => {
                console.log('API whoopsie ', err);
                setNotes(original);
            });
    };
    return (
        <div className='container'>
            {loading && <Loading />}
            <NotesList
                setLoading={setLoading}
                notes={notes}
                addNote={addNote}
                deleteNote={deleteNote}
            />
        </div>
    );
};

function getnoteId(note) {
    //if note doesn't have a ref
    if (note.ref === undefined) {
        console.log('ID not retrieved');
        return null;
    }
    //otherwise, return the id
    return note.ref['@ref'].id;
}

export default App;
