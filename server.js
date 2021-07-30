const express = require("express");
const { notes } = require("./db/db.json");
const app = express();
const fs = require("fs");
const path = require("path");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


// const createNote = function (body, array){
//     //pass in new note with req.body and existing note array
//     //push new note to notes array => fs.WriteFile(notesarray)
// }

////one get route for the homepage
////2 api routes to get and post /api/notes 

const notesArray = [];

//homepage
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
//notespage
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    let results = notes;

    res.json(results);
  });

app.post("/api/notes", (req, res) =>{
    // req.body.id = notes.length.toString();  //// add unique id to each new note
    // const note = createNote(req.body, notes);
    const note = req.body;
    notesArray.push(note)
    res.json(note);
})





app.listen(3001, () => {
    console.log("API server now on port 3001");
  });