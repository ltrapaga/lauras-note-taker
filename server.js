// Import express package
const express = require('express');
const fs = require('fs');
const path = require('path');
const dataBase = require('./db/db.json');

const PORT = process.env.PORT || 3000;
// Initialize app variable by setting it to the value of express()
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Add a static middleware for serving assets in the public folder
app.use(express.static('public'));

// GET HTML route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET HTML route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET API route for notes page
app.get('/api/notes', (req, res) => {
    res.json(dataBase.slice(1));
});

app.post('/api/notes', (req, res) => {
    const newNote = createNote(req.body, dataBase);
    res.json(newNote);
})

function createNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray) && (notesArray.length === 0)) {
        notesArray = [];
        notesArray.push(0);
    }
        body.id = notesArray.length;
        notesArray[0]++;
        notesArray.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 1)
    );
    return newNote;
};

// Listen for connections
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});