const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const { findByIdAndUpdate } = require("../models/Note");

//Route 1: Getting all notes: GET "/api/notes/fetchallnotes" ,  require Auth (login)
router.get("/fechallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occured");
  }
});

//Route 2: Adding new note using: POST "/api/notes/addnote" ,  require Auth (login)
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Enter the decription minimum 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();

      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

//Route 3: Update a note using: PUT "/api/notes/updatenote" ,  require Auth (login)
router.put('/updatenote/:id',fetchuser,async (req, res) => {
const {title,description,tag} = req.body;

try{
//create a newNote object
const newNote={};
if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag};

//Finding note which is going to be updated and update it
let note= await Note.findById(req.params.id);
if(!note){ return res.status(404).send("Not Found")}

if(note.user.toString()!==req.user.id)
{
    return res.status(401).send("Not Allowed");
}

note= await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
res.json({note});
}

catch(error){
  console.error(error.message);
  res.status(500).send("Some Error Occured");
}
})

//Route 4: Delete a note using: delete "/api/notes/deletenote" ,  require Auth (login)
router.delete('/deletenote/:id',fetchuser,async (req, res) => {
  const {title} = req.body;
  try{
  //Finding note which is going to be deleted and delete it
  let note= await Note.findById(req.params.id);
  if(!note){ return res.status(404).send("Not Found")}
  
  if(note.user.toString()!==req.user.id)
  {
      return res.status(401).send("Not Allowed");
  }
  note= await Note.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted",note:note});
}
catch(error){
  console.error(error.message);
  res.status(500).send("Some Error Occured");
}
})

module.exports = router;
