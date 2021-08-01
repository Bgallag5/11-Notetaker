const express = require("express");
const { notes } = require("./db/db.json");
const app = express();
const fs = require("fs");
const path = require("path");

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));

var notesArray = [];

//homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
//notespage
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//api get
app.get("/api/notes", (req, res) => {
  return res.json(notesArray); //returns notesArray as json
});

//api post
app.post("/api/notes", (req, res) => {

  const note = req.body;
  note.id = notesArray.length.toString(); //create unique id for each note
  notesArray.push(note);

  fs.writeFile("db/db.json", JSON.stringify(notesArray), (err) => {
    //write notesArray as json data
    if (err) console.log(err);
  });
  res.json(notesArray);
});

//api delete 
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    let notes = JSON.parse(data);
    console.log(notes);
    let id = req.params.id;
    console.log(notes[id]);

    notesArray = notesArray.filter((notes) => {
      return notes.id !== id;
    });
    console.log(notesArray);

    //nest a writeFileSync inside the readFile to write new array
    fs.writeFileSync("db/db.json", JSON.stringify(notesArray), (err) => {
      if (err) throw err;
    });
    res.json(notesArray);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(3001, () => {
  console.log("API server listening on port 3001");
});

