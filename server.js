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

app.get("/api/notes", (req, res) => {
    console.log(notesArray);
    return res.json(notesArray);
  });

app.post("/api/notes", (req, res) =>{
    // req.body.id = notes.length.toString();  //// add unique id to each new note
    // const note = createNote(req.body, notes);
    const note = req.body;
    note.id = (notesArray.length).toString();  //create unique id for each note
    notesArray.push(note);

    fs.writeFileSync("db/db.json", JSON.stringify(notesArray))
    res.json(notesArray);
})


app.listen(3001, () => {
    console.log("API server now on port 3001");
  });




// const createNote = function (body, array){
//     //pass in new note with req.body and existing note array
//     //push new note to notes array => fs.WriteFile(stringify(notesarray))
// }

////one get route for the homepage
////2 api routes to get and post /api/notes 

// const pageLoad = function(){
//     //load .db to notes page on load 
// }


////TODO: finish app.get? does it need an fs.ReadFile? 
//// app.get(*) to cover all other cases
//// add a delete api call 