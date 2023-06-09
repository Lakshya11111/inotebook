import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote();
        }
        else {
            navigate("/login");
        }
    })

    const ref = useRef(null);
    const closeRef = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etags: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags })
    }

    const handleOnclick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etags);
        closeRef.current.click();
        props.showAlert("Updated succesfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnote showAlert={props.showAlert} />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                    <div id="emailHelp" className="form-text">Enter a good title</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etags" name="etags" value={note.etags} onChange={onChange} />
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleOnclick}>Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleOnclick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-4'>
                <h1>Your note</h1>
                <div className="container mx-2">
                    {notes.length === 0 && "No note to display"}
                </div>
                {notes.map((notes) => {
                    return <NoteItem key={notes._id} showAlert={props.showAlert} updateNote={updateNote} note={notes} />
                })}
            </div>
        </>
    )
}

export default Notes
