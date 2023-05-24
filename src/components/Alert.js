import React, { useState,useContext } from 'react';
import notecontext from "../context/Notes/NoteContext"


const Alert = (props) => {
  const context = useContext(notecontext)
  const{mes}=context;

  return (
    <div>
    {mes &&<div className="alert alert-primary" role="alert" >
        {mes.mas}
      </div>}
    </div>
  )
}

export default Alert
