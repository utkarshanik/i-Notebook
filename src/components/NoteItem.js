import React,{useContext,useRef} from 'react'
import notecontext from "../context/Notes/NoteContext"

const NoteItem = (props) => {
  const context = useContext(notecontext)
  const { deleteNote,showAlert} = context;
  const ref = useRef(null)
  const {note,updateNote}=props;

const  Clickdelete=()=>
  {
    ref.current.click();
  
  }

const del=()=>
{
    deleteNote(note._id)
    showAlert("Note Deleted")
}

  return (
<>    
{/* Delete A note */}
<button  className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModa">
 Delete Note !!
</button>
<div className="modal fade" id="exampleModa" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabe">Delete Note !!!</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div className="modal-body">
      
          <div className="mb-3">
            <label htmlFor="etitle fs-4" className="form-label">
                Do you really want to delete ?
            </label>
                </div>
            </div>  
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={del}>Delete Note</button>
      </div>
    </div>
  </div>
</div>

    <div className="col-md-3">
      <div className="card my-3">
         <div className="card-body">
         <div className="d-flex align-items-center">
          <h5 className="card-title">{note.title} </h5>
          <i className="fa-solid fa-trash mx-2" onClick={Clickdelete}> </i>
          <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
          </div>
          <p className="card-text">
            {note.description} </p>
        </div>
      </div>
      
    </div>
    </>

  );
};

export default NoteItem;
