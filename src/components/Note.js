import { MdDeleteForever } from 'react-icons/md';

const Note = ({ id, text, date, deleteNote }) => {
    return (
        <div className='inner'>
            <span>{text}</span>
            <div className='note-footer'>
                <small>{date}</small>
                <MdDeleteForever
                    onClick={() => deleteNote(id)}
                    className='delete-icon'
                    size='1.5em'
                    alt='delete note'
                />
            </div>
        </div>
    );
};

export default Note;