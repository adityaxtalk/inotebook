const express=require('express');
const router=express.Router()
const fetchuser= require('../middleware/fetchuser')
const Notes=require('../models/Notes');
const {body, validationResult} = require('express-validator');

// Get All the Notes using: GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser , async (req, res)=> {
    try {
        const notes=await Notes.find({user: req.user.id}); 
        res.json(notes);

    } catch(error) {
        console.log(error.message)
        res.status(500).send('Some error occured');
    }
})

// Add a new Note using: POST "/api/notes/addnote"
router.post('/addnote', fetchuser , [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5})
], async (req, res)=> {
    const {title, description, tag} = req.body;
    console.log(req.body)
    const errors= validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const saveNote= await note.save();
        res.json(saveNote);
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured');
    }
})

// Update an existing Note using: PUT "/api/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try {
      console.log(req.body)
      const { title, description, tag } = req.body;
      // create a newNote object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      // Find the node to be updated and update it
      let note = await Notes.findById(req.params.id);
      console.log(note)

      if (!note) {
        return res.status(404).send("Not Found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      console.log(note);
      res.json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
})

// Delete an existing Note using: DELETE "api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res)=> {

    try {
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
        return res.status(40).send("Not Allowed");
      }
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ Success: "Note has been deleted" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
});

module.exports=router;