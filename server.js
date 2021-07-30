const express = require("express");
const { notes } = require("./db/db.json");
const app = express();
const fs = require("fs");
const path = require("path");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));


const notesArray = [];

//homepage
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "./public/index.html"))
})
//notespage
app.get("/notes", (req, res) => {
res.sendFile(path.join(__dirname, "./public/notes.html"))
})
//api get
app.get("/api/notes", (req, res) => {
    console.log(notesArray);
    return res.json(notesArray);  //returns notesArray as json 
  });
//api post 
app.post("/api/notes", (req, res) =>{
    console.log(req);
    console.log(req.body);
    
    const note = req.body;
    note.id = (notesArray.length).toString();  //create unique id for each note
    notesArray.push(note);

    fs.writeFile(notes, JSON.stringify(notesArray), (err) =>{ //write notesArray as json data
    if(err) console.log(err);
    }) 
    res.json(notesArray);
})

app.listen(3001, () => {
    console.log("API server now on port 3001");
  });


////TODO: finish app.get? does it need an fs.ReadFile?  -- no i dont think so 
//// app.get(*) to cover all other cases
//// add a delete api call 