import React, { useState } from "react";

import noteContext from "./NoteContext";

const NoteState = (props) => {
    const host='http://localhost:5000';
   const notesInitial= []
    const [notes, setNotes] = useState(notesInitial);

    // Get all notes
    const getNotes= async () => {
        const response= await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setNotes(data);
    }

    // Add a Note
    const addNote = async ({title, description, tag}) => {
        const response= await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })
        const data=await response.json();
        setNotes(notes.concat(data));
    }
    // Delete a Note
    const deleteNote = async (id) => {
        const response= await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const data=await response.json();
        console.log('Deleting the note with id ' + data._id);
        const newNotes = notes.filter((note)=> {
            return note._id !== id
        });
        setNotes(newNotes);

    }
    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        debugger
        const response= await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })
        const data=await response.json();
        console.log(data)
        debugger
        const newNotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                
                newNotes[index].title= title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
        }
        debugger
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;