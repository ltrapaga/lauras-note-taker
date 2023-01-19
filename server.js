// Import express package
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("./helpers/fsUtils.js");

const PORT = process.env.PORT || 3000;
// Initialize app variable by setting it to the value of express()
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add a static middleware for serving assets in the public folder
app.use(express.static("public"));

// GET HTML route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET HTML route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET API route for notes page
app.get("/api/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  readAndAppend(newNote, "./db/db.json");
  res.json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  readAndDelete(req.params.id, "./db/db.json");
  res.json({ ok: true });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listen for connections
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
