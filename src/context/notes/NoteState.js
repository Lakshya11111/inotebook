import noteContext from "./noteContext.js";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial)
    let auth = localStorage.getItem('token');

    // Add note
    const getNote = async () => {
        // Api call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth
            },
        });
        const json = await response.json();

        setNotes(json);
    }

    // Add note
    const addNote = async (title, description, tags) => {
        // Api call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth
            },

            body: JSON.stringify({ title, description, tags }),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete note
    const deleteNote = async (id) => {
        // Api call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth
            },
        });
        const json = response.json();
        console.log(json);

        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }

    // Update note
    const editNote = async (id, title, description, tags) => {
        // Api call
        const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth
            },

            body: JSON.stringify({ title, description, tags }),
        });
        const json = response.json();
        console.log(json);

        // logic fo updating notes
        let newNote = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element.id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tags = tags;
                break;
            }
        }
        setNotes(newNote);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;