import React,{useContext, useEffect,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import notecontext from "../context/Notes/NoteContext"
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = () => {
    const context = useContext(notecontext)
    const{notes,getNote,editNote,showAlert}=context;
    const ref = useRef(null)
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    let navigate=useNavigate();

    useEffect( () => {
      if(localStorage.getItem('token'))
      {
     getNote()
    }
    else{
        navigate("/login")
    } 
     /* eslint-disable */ 
    },[])
    

const updateNote=(currentnote)=>
{
  ref.current.click();
  setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
}


const handleClick=(e)=>
{
  console.log("edited",note)
  editNote(note.id,note.etitle,note.edescription,note.etag); 
  e.preventDefault();
    // addNote(note.title,note.description,note.tag);
  showAlert("Note Edited")
}

const onchange=(e)=>
{
    setNote({...note,[e.target.name]:e.target.value})
}

return (
    <>
       <AddNote/>
{/* //Edit a note */}
<button  className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"
             onChange={onchange} />
          </div>

          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
             Description
            </label>
            <input type="text" value={note.edescription} className="form-control" id="edescription" name="edescription" onChange={onchange}/>
          </div>
          
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input type="text" value={note.etag} className="form-control" id="etag" name="etag" onChange={onchange}/>
          </div>
        </form>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className="row my-3">
        <h1>Your Note</h1>
        {notes.map((note)=>{
        return <NoteItem key={note._id} updateNote={updateNote} note={note}/>;
        })}
     </div>
    </> 
  )
}

export default Notes
