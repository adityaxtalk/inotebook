import React, {useContext, useState} from "react";
import noteContext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote}= context;
    const [note, setNote] = useState({title: '', description: '', tag: ''});
    const onChange = (e ) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
    const handleSubmit =(e) => {
        e.preventDefault();
        addNote(note);
        props.showAlert('Note Added Successfully', 'success');
        setNote({title: '', description: '', tag: ''});
    }
    return (
        <>
        <div className="container my-3">
                <h1>Add a Notes</h1>
                <form onSubmit={handleSubmit} className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" minLength={5} required className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" minLength={5} required className="form-control" id="description" name="description" value={note.description} onChange={onChange}/>
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <input type="text" className="form-control"  id="tag" name="tag" onChange={onChange} value={note.tag} />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" >Submit</button>
                    </form>
            </div>
        </>
    )
};

export default AddNote;