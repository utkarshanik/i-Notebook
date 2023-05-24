import notecontext from "../context/Notes/NoteContext"
import React, { useState,useContext } from 'react';


const AddNote = () => {
    const context = useContext(notecontext)
    const{addNote,showAlert}=context;

    const [note, setNote] = useState({title:"",description:"",tag:"default"})
    
    const handleClick=(e)=>
    {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        showAlert("Note Added!!");
    }

    const onchange=(e)=>
    {
        setNote({...note,[e.target.name]:e.target.value})
    }
    
    return (
    <div>
      <div className="contaier my-3">
        <h1>Add Some Note </h1>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"
             onChange={onchange} />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
             Description
            </label>
            <input type="text" className="form-control" id="description" name="description" onChange={onchange}/>
          </div>
          
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onchange}/>
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddNote;
