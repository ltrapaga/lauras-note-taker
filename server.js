// Import express package
const express = require('express');
const fs = require('fs');
const path = require('path');
const dataBase = require('./db/db.json');

const PORT = process.env.PORT || 3001;
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
    res.json();
});

// Listen for connections
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});