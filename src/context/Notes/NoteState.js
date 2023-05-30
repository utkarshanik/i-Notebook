import NoteContext from "./NoteContext";
import React, { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

//Fetch all NOtes
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fechallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "https://utkarshanik.github.io"
      },
    });
    const json = await response.json();
    // console.log(json)hh
    setnotes(json);
  };

//Add a note//
  const addNote = async (title, description, tag) => {
    // API call ********
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "https://utkarshanik.github.io"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    //  const json= response.json();
     const note = await response.json();
     setnotes(notes.concat(note))

     // console.log("added");
    // setnotes(notes.concat(note));
  };

//Delete a note //
  const deleteNote = async (id) => {
    // API call  *****
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "https://utkarshanik.github.io"
      },
   });
    const json = response.json();
    console.log(json)


    console.log("Deleteing note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

// Edit a note //
  const editNote = async (id, title, description, tag) => {
    // API call  *****
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
        "Access-Control-Allow-Origin": "https://utkarshanik.github.io"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();
 console.log(json)  
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  const [mes, setAlert] = useState(null);
  const showAlert = (message) => {
    setAlert({mas:message});
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  }

  return (
    <NoteContext.Provider
      value={{ notes, getNote, editNote, addNote, deleteNote,showAlert,mes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
