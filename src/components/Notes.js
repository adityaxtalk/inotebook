import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({_id: '', title: '', description: '', tag: ''});
    const onChange = (e ) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
    const handleClick =(e) => {
        console.log('Updating the note', note);
        editNote(note._id, note.title, note.description, note.tag);
        props.showAlert('Note updated successfully', 'success');
        refClose.current.click();
    }
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  };
  const ref = useRef(null);
  const refClose=useRef(null);

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form  className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                    minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.description}
                    minLength={5} required
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3 ">
                  <label htmlFor="tags" className="form-label">
                    Tags
                  </label>
                  <input
                    value={note.tag}
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.length === 0 && <div className="container">No notes to display</div>}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
