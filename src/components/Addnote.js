import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tags: "" })

    const handleAddnote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        setNote({ title: "", description: "", tags: "" });
        props.showAlert("Added succesfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-4'>
            <h1>Add note</h1>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title} />
                    <div id="emailHelp" className="form-text" >Enter a good title</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tags" name="tags" onChange={onChange} value={note.tags} />
                </div>

                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAddnote}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
